import User from "../models/User.js";

async function seedUsers() {
	const admin = new User({
		name: "Admin",
		email: "admin@pucit.edu.pk",
		hash: "admin",
		role: "admin",
		designation: "Administrator",
	});
	admin.setPassword();

	const salman = new User({
		name: "Salman",
		email: "salman@pucit.edu.pk",
		hash: "salman",
		designation: "Lecturer",
	});
	salman.setPassword();

	const ahmad = new User({
		name: "Ahmad",
		email: "ahmad@pucit.edu.pk",
		hash: "ahmad",
		designation: "Professor",
	});
	ahmad.setPassword();

	const mansoor = new User({
		name: "Mansoor",
		email: "mansoor@pucit.edu.pk",
		hash: "mansoor",
		designation: "Lecturer",
	});
	mansoor.setPassword();

	const idrees = new User({
		name: "Idrees",
		email: "idrees@pucit.edu.pk",
		hash: "idrees",
		designation: "Professor",
	});
	idrees.setPassword();

	await admin.save().then(async (user) => {
		if (user) {
			await salman.save();
			await ahmad.save();
			await mansoor.save();
			await idrees.save();
		}
	});
}

export default seedUsers;
