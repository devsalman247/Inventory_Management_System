import User from "../models/User.js";

async function seedUsers() {
	const admin = new User({
		name: "Admin",
		email: "admin@gmail.com",
		password: "admin",
		role: 1,
	});
	const salman = new User({
		name: "Salman",
		email: "salman@gmail.com",
		password: "salman",
		role: 0,
	});
	const ahmad = new User({
		name: "Ahmad",
		email: "ahmad@gmail.com",
		password: "ahmad",
		role: 0,
	});
	const mansoor = new User({
		name: "Mansoor",
		email: "mansoor@gmail.com",
		password: "mansoor",
		role: 0,
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
