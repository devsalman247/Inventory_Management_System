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

const authenticateUser = (email, password) => {
	return User.findOne({ email })
		.then((user) => {
			if (!user) {
				return new Error("User not found!");
			} else if (!user.validPassword(password)) {
				return new Error("Invalid password");
			}
			return user;
		})
		.catch((err) => {
			console.log(err);
			return new Error(err);
		});
};

const UserService = { addUser, authenticateUser };

export default UserService;
