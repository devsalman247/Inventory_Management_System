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
		approvedDate: {
			type: Date,
			default: null,
		},
		return: {
			status: {
				type: String,
				enum: ["pending", "not-applicable", "returned", "pending-approval"],
				default: "not-applicable",
			},
			returnedDate: {
				type: Date,
				default: null,
			},
			requests: [
				{
					requestedDate: {
						type: Date,
						default: Date.now,
					},
					approvedDate: {
						type: Date,
						default: null,
					},
					rejectedDate: {
						type: Date,
						default: null,
					},
				},
			],
		},
		status: {
			type: String,
			enum: ["pending", "approved", "rejected", "cancelled"],
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
