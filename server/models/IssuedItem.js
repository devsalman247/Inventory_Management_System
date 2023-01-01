import mongoose, { mongo } from "mongoose";

const IssuedItem = new mongoose.Schema(
	{
		issuedId: {
			type: Number,
			required: [true, "is required."],
			unique: true,
		},
		issuedTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		items: [
			{
				id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Item",
				},
				quantity: {
					type: Number,
				},
				returned: [
					{
						quantity: {
							type: Number,
						},
						returnDate: {
							type: Number,
						},
					},
				],
			},
		],
		issueDate: {
			type: Date,
			default: Date.now,
		},
		lastReturn: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("IssuedItem", IssuedItem);
