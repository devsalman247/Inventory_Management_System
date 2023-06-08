import UserService from "../services/User.js";
import { OkResponse, BadRequestResponse, UnauthorizedResponse } from "express-http-response";

const { addUser, authenticateUser, fetchUsers, getUserRequests, updateUser, deleteUser } = UserService;

const UserSignUp = (req, res, next) => {
	const { name, email, password, designation } = req.body;
	if (!email || !password || !name || !designation) {
		return next(new BadRequestResponse("Please provide all input fields!"));
	}
	addUser(name, email, password, designation)
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
	authenticateUser(email, password)
		.then((user) => {
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

const UserAdd = (req, res, next) => {
	const { name, email, password, designation } = req.body;
	if (!email || !password || !name || !designation) {
		return next(new BadRequestResponse("Please provide all input fields!"));
	}
	addUser(name, email, password, designation)
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

const UserProfile = (req, res, next) => {
	if (req.user) {
		return next(new OkResponse(req.user.toAuthJSON()));
	} else {
		return next(new UnauthorizedResponse("User not authorized!"));
	}
};

const UserFetchAll = (req, res, next) => {
	fetchUsers()
		.then((users) => {
			return next(new OkResponse(users));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const UserRequests = (req, res, next) => {
	getUserRequests(req.user)
		.then((requests) => {
			return next(new OkResponse(requests));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const UserUpdate = (req, res, next) => {
	const { id } = req.params;
	const user = req.body;
	updateUser(id, user)
		.then((user) => {
			if (user) {
				return next(new OkResponse(user));
			} else {
				return next(new BadRequestResponse("User not found!"));
			}
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const UserDelete = (req, res, next) => {
	const { id } = req.params;
	deleteUser(id)
		.then((user) => {
			if (user) {
				return next(new OkResponse(user));
			} else {
				return next(new BadRequestResponse("User not found!"));
			}
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const UserController = {
	UserSignUp,
	UserLogin,
	UserAdd,
	UserProfile,
	UserFetchAll,
	UserRequests,
	UserUpdate,
	UserDelete,
};

export default UserController;
