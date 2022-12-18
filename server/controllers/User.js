import UserService from "../services/User.js";
import { OkResponse, BadRequestResponse, UnauthorizedResponse } from "express-http-response";

const { newUser, authenticateUser } = UserService;

const UserSignUp = (req, res, next) => {
	const { name, email, password } = req.body;
	if (!email || !password || !name) {
		return next(new BadRequestResponse("Please provide all input fields!"));
	}
	try {
		const user = newUser(name, email, password);
		if (user) {
			return next(new OkResponse(user));
		} else {
			return next(new BadRequestResponse("Something went wrong.Try again!!"));
		}
	} catch (err) {
		return next(new BadRequestResponse(err));
	}
};

const UserLogin = (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new BadRequestResponse("Please provide all input fields!"));
	}
	try {
		const authenticatedUser = authenticateUser();
		if (authenticatedUser) {
			return next(new OkResponse(authenticatedUser));
		} else {
			return next(new UnauthorizedResponse("User not found!"));
		}
	} catch (error) {
		return next(new BadRequestResponse(error));
	}
};

const UserController = {
	UserSignUp,
	UserLogin,
};

export default UserController;
