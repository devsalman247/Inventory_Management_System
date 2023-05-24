import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from "../config/env/index.js";

const { secret } = env;

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "is required."],
		},
		email: {
			type: String,
			required: [true, "is required"],
			unique: true,
			match: [/\S+@\S+\.\S+/, "is invalid"],
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
		designation: {
			type: String,
		},
		requests: [
			{
				items: [
					{
						id: { type: mongoose.Schema.Types.ObjectId },
						count: { type: Number },
						status: {
							type: Number,
							enum: [
								0, //pending
								1, //approved
							],
						},
					},
				],
				filled: {
					type: Number,
					enum: [
						0, // Not filled
						1, // Filled
					],
				},
				requestDate: { type: Date },
			},
		],
		hash: {
			type: String,
		},
		salt: {
			type: String,
		},
	},
	{ timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.methods.setPassword = function () {
	this.salt = bcrypt.genSaltSync();
	this.hash = bcrypt.hashSync(this.hash, this.salt);
};

UserSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.hash);
};

UserSchema.methods.generateJWT = function () {
	return jwt.sign(
		{
			id: this.id,
			name: this.name,
			designation: this.designation,
			role: this.role,
			email: this.email,
		},
		secret,
		{ expiresIn: "4h" }
	);
};

UserSchema.methods.toAuthJSON = function () {
	return {
		id: this.id,
		name: this.name,
		email: this.email,
		role: this.role,
		designation: this.designation,
		token: this.generateJWT(),
	};
};

export default mongoose.model("User", UserSchema);
