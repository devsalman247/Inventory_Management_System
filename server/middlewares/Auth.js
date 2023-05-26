import jwt from "jsonwebtoken";
import env from "../config/env/index.js";
import { OkResponse, BadRequestResponse, UnauthorizedResponse } from "express-http-response";
import User from "../models/User.js";

const verifyToken = function (req, res, next) {
	const { authorization } = req.headers;
	if (
		(authorization && authorization.split(" ")[0] === "Token") ||
		(authorization && authorization.split(" ")[0] === "Bearer")
	) {
		const token = authorization.split(" ")[1];
		jwt.verify(token, env.secret, (error, data) => {
			if (error) {
				next(new UnauthorizedResponse("Invalid Token"));
			} else {
				User.findById(data.id)
					.then((user) => {
						req.user = user;
						next();
					})
					.catch((err) => next(new UnauthorizedResponse("Something went wrong while authenticating user!")));
			}
		});
	} else {
		next(new BadRequestResponse("Token not found!"));
	}
};

const isAdmin = function (req, res, next) {
	if (req.user.role === "admin") {
		next();
	} else {
		res.status(400).send({ error: { message: "Only admin has this permission." } });
	}
};

const auth = {
	verifyToken,
	isAdmin,
};

export default auth;
