import UserService from "../services/User.js";
import { OkResponse, BadRequestResponse, UnauthorizedResponse } from "express-http-response";

const { addUser, authenticateUser } = UserService;

const UserSignUp = (req, res, next) => {
	const { name, email, password } = req.body;
	if (!email || !password || !name) {
		return next(new BadRequestResponse("Please provide all input fields!"));
	}
	addUser(name, email, password)
		.then((user) => {
			if (user) {
				return next(new OkResponse(user));
			} else {
				return next(new BadRequestResponse("Something went wrong.Try again!!"));
			}
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const UserLogin = (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new BadRequestResponse("Please provide all input fields!"));
	}
	authenticateUser(req, res, next)
		.then((user) => {
			console.log("login successful");
			if (user) {
				return next(new OkResponse(user));
			} else {
				return next(new UnauthorizedResponse("User not found!"));
			}
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const UserController = {
	UserSignUp,
	UserLogin,
};

export default UserController;
