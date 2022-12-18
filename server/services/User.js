import User from "../models/User.js";
import passport from "passport";
import strategy from "../config/passport.js";

passport.use(strategy);

const newUser = (name, email, password) => {
	const user = new User({
		name,
		email,
		password,
		requests: [],
	});
	user.hash = password;
	user.setPassword();
	user
		.save()
		.then((data) => {
			if (!data) {
				throw new Error("Failed to create user");
			}
			return user.toAuthJSON();
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const authenticateUser = () => {
	passport.authenticate("local", { session: false }, (err, user, info) => {
		if (err) {
			console.log(err);
			throw err;
		} else if (user) {
			return user.toAuthJSON();
		}
	})(req, res, next);
};

const UserService = { newUser, authenticateUser };

export default UserService;
