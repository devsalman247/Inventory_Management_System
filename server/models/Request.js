import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
	{
		reqItem: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Item",
		},
		requestedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		quantity: {
			type: Number,
			default: 1,
		},
		requestDate: {
			type: Date,
			default: Date.now,
		},
		returnDate: {
			type: Date,
			default: null,
		},
		status: {
			type: String,
			enum: ["pending", "approved", "rejected"],
			default: "pending",
		},
	},
	{
		timestamps: true,
	}
);

const autoPopulate = function (next) {
	this.populate("reqItem");
	this.populate("requestedBy");
	next();
};

RequestSchema.pre("findOne", autoPopulate);
RequestSchema.pre("find", autoPopulate);

export default mongoose.model("Request", RequestSchema);
