import User from "../models/User.js";
import passport from "passport";
import strategy from "../config/passport.js";

passport.use(strategy);

const addUser = (name, email, password) => {
	try {
		const user = new User({
			name,
			email,
			password,
			requests: [],
		});
		user.hash = password;
		user.setPassword();
		return user
			.save()
			.then((data) => {
				if (!data) {
					return new Error("Failed to create user");
				}
				return user.toAuthJSON();
			})
			.catch((err) => {
				console.log(err);
				return new Error(err);
			});
	} catch (err) {
		console.log(err);
		return new Error(err);
	}
};

const authenticateUser = (req, res, next) => {
	return passport.authenticate("local", { session: false }, (err, user, info) => {
		if (err) {
			console.log(err);
			return new Error(err);
		} else if (user) {
			console.log(user);
			return user;
		}
	})(req, res, next);
};

const UserService = { addUser, authenticateUser };

export default UserService;
