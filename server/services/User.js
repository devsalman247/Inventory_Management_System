import User from "../models/User.js";
import Request from "../models/Request.js";

const addUser = (name, email, password, designation) => {
	try {
		const user = new User({
			name,
			email,
			password,
			designation,
			requests: [],
		});
		user.hash = password;
		user.setPassword();
		return user
			.save()
			.then((data) => {
				if (!data) {
					throw "Failed to create user";
				}
				return user.toAuthJSON();
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	} catch (err) {
		console.log(err);
		throw err;
	}
};

const authenticateUser = (email, password) => {
	return User.findOne({ email })
		.then((user) => {
			if (!user) {
				throw "User not found!";
			} else if (!user.validPassword(password)) {
				throw "Invalid password";
			}
			return user.toAuthJSON();
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const fetchUsers = () => {
	return User.find({ role: "user" })
		.then((users) => {
			return users;
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const getUserRequests = (id) => {
	// get all requests of a user and filter them by status
	return Request.find({ requestedBy: id })
		.then((requests) => {
			const pending = requests.filter((request) => request.status === "pending");
			const approved = requests.filter((request) => request.status === "approved");
			const rejected = requests.filter((request) => request.status === "rejected");
			requests.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
			return { pending, approved, rejected, requests };
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const updateUser = (id, user) => {
	return User.findById(id)
		.then((userToUpdate) => {
			if (!userToUpdate) {
				throw "User not found";
			}
			if (user.name) userToUpdate.name = user.name;
			if (user.email) userToUpdate.email = user.email;
			if (user.designation) userToUpdate.designation = user.designation;
			if (user.password) {
				userToUpdate.hash = user.password;
				userToUpdate.setPassword();
			}
			return userToUpdate
				.save()
				.then((user) => {
					if (!user) throw "User cannot be updated!!";
					return user;
				})
				.catch((err) => {
					console.log(err);
					throw err;
				});
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const deleteUser = (id) => {
	return User.findByIdAndDelete(id)
		.then((user) => {
			if (!user) {
				throw "User not found";
			}
			return user;
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const UserService = { addUser, authenticateUser, fetchUsers, getUserRequests, updateUser, deleteUser };

export default UserService;
