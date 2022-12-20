import User from "../models/User.js";

async function seedUsers() {
	const admin = new User({
		name: "Admin",
		email: "admin@gmail.com",
		hash: "admin",
		role: 1,
		designation: "Administrator",
	});
	admin.setPassword();

	const salman = new User({
		name: "Salman",
		email: "salman@gmail.com",
		hash: "salman",
		role: 0,
		designation: "Professor",
	});
	salman.setPassword();

	const ahmad = new User({
		name: "Ahmad",
		email: "ahmad@gmail.com",
		hash: "ahmad",
		role: 0,
		designation: "Professor",
	});
	ahmad.setPassword();

	const mansoor = new User({
		name: "Mansoor",
		email: "mansoor@gmail.com",
		hash: "mansoor",
		role: 0,
		designation: "Professor",
	});
	mansoor.setPassword();

	await admin.save().then(async (user) => {
		if (user) {
			await salman.save();
			await ahmad.save();
			await mansoor.save();
		}
	});
}

export default seedUsers;
