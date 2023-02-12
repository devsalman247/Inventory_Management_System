import User from "../models/User.js";

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
	return User.find({ role: 0 })
		.then((users) => {
			return users;
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
			if(user.name) userToUpdate.name = user.name
			if(user.email) userToUpdate.email = user.email
			if(user.designation) userToUpdate.designation = user.designation
			if(user.password) {
				userToUpdate.hash = user.password
				userToUpdate.setPassword() 
			}
			return userToUpdate.save().then(user => {
				if(!user) throw "User cannot be updated!!"
				return user
			}).catch((err) => {
				console.log(err);
				throw err;
			}) 
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

const UserService = { addUser, authenticateUser, fetchUsers, updateUser, deleteUser };

export default UserService;
