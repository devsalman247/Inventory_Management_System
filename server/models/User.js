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
			enum: ["admin", "store-keeper", "user"],
			default: "user",
		},
		designation: {
			type: String,
		},
		profileImage: {
			type: String,
			default: null,
		},
		requests: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Request",
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

// const autoPopulate = function (next) {
// 	this.populate("requests");
// 	next();
// };

// UserSchema.pre("findOne", autoPopulate);
// UserSchema.pre("find", autoPopulate);

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
		profileImage: this.profileImage,
		token: this.generateJWT(),
	};
};

UserSchema.methods.toJSON = function () {
	return {
		_id: this._id,
		name: this.name,
		email: this.email,
		role: this.role,
		designation: this.designation,
		requests: this.requests,
		profileImage: this.profileImage,
	};
};

export default mongoose.model("User", UserSchema);
