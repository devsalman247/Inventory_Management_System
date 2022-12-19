import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const ItemSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "is required."],
		},
		itemId: {
			type: Number,
			required: [true, "is required"],
			unique: true,
		},
		quantity: {
			type: Number,
			default: 0,
		},
		issued: [
			{
				issuedId: {
					type: Number,
					required: [true, "is required."],
				},
				quantity: {
					type: Number,
				},
				issuedTo: {
					type: mongoose.Schema.Types.ObjectId,
				},
				issuedDate: {
					type: String,
				},
			},
		],
		requests: [
			{
				requestedBy: {
					type: mongoose.Schema.Types.ObjectId,
				},
				quantity: {
					type: Number,
				},
			},
		],
	},
	{ timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

export default mongoose.model("Item", ItemSchema);
