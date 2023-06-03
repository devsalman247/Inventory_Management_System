import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const ItemSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "is required."],
		},
		itemId: {
			type: String,
			required: [true, "is required"],
			unique: true,
		},
		stock: {
			type: Number,
			default: 0,
		},
		stockOut: [
			{
				quantity: {
					type: Number,
					default: 0,
				},
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
		stockIn: [
			{
				quantity: {
					type: Number,
					default: 0,
				},
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
		isReturnAble: {
			type: Boolean,
			default: false,
		},
		// issued: [
		// 	{
		// 		id: {
		// 			type: mongoose.Schema.Types.ObjectId,
		// 			ref: "IssuedItem",
		// 		},
		// 		quantity: {
		// 			type: Number,
		// 		},
		// 	},
		// ],
	},
	{ timestamps: true }
);

ItemSchema.plugin(uniqueValidator, { message: "is already taken." });

export default mongoose.model("Item", ItemSchema);
