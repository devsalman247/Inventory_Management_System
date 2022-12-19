import mongoose from "mongoose";
import userSeeder from "./seeder/User.js";
import dotenv from "dotenv";
dotenv.config();

mongoose
	.connect(`${process.env.MONGO_URI_LOCAL}`)
	.then(() => {
		console.log("connected to db in development environment");
		init();
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});

async function init() {
	console.log("dropping DB");
	await mongoose.connection.db.dropDatabase();
	await userSeeder();
	exit();
}
function exit() {
	console.log("exiting");
	process.exit(1);
}
