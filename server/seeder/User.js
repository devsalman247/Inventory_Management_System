import User from "../models/User.js";

async function seedUsers() {
	const admin = new User({
		name: "Admin",
		email: "admin@gmail.com",
		password: "admin",
		role: 1,
		designation: "Administrator",
	});
	const salman = new User({
		name: "Salman",
		email: "salman@gmail.com",
		password: "salman",
		role: 0,
		designation: "Professor",
	});
	const ahmad = new User({
		name: "Ahmad",
		email: "ahmad@gmail.com",
		password: "ahmad",
		role: 0,
		designation: "Professor",
	});
	const mansoor = new User({
		name: "Mansoor",
		email: "mansoor@gmail.com",
		password: "mansoor",
		role: 0,
		designation: "Professor",
	});
	await admin.save().then(async (user) => {
		if (user) {
			await salman.save();
			await ahmad.save();
			await mansoor.save();
		}
	});
}

export default seedUsers;
