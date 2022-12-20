import User from "../models/User.js";

async function seedUsers() {
	const admin = new User({
		name: "Admin",
		email: "admin@gmail.com",
		password: "admin",
		role: 1,
		designation: "Administrator",
	});
	admin.hash = password;
	admin.setPassword();

	const salman = new User({
		name: "Salman",
		email: "salman@gmail.com",
		password: "salman",
		role: 0,
		designation: "Professor",
	});
	salman.hash = password;
	salman.setPassword();

	const ahmad = new User({
		name: "Ahmad",
		email: "ahmad@gmail.com",
		password: "ahmad",
		role: 0,
		designation: "Professor",
	});
	ahmad.hash = password;
	ahmad.setPassword();

	const mansoor = new User({
		name: "Mansoor",
		email: "mansoor@gmail.com",
		password: "mansoor",
		role: 0,
		designation: "Professor",
	});
	mansoor.hash = password;
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
