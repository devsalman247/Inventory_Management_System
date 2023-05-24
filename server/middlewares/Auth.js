import jwt from "jsonwebtoken";
import env from "../config/env/index.js";
import { OkResponse, BadRequestResponse, UnauthorizedResponse } from "express-http-response";

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
				req.user = data;
				next();
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
