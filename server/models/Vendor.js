import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const VendorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "is required."],
		},
		email: {
			type: String,
			required: [true, "is required."],
			unique: true,
		},
		address: {
			type: String,
			required: [true, "is required."],
		},
		contact: {
			type: String,
			required: [true, "is required."],
		},
	},
	{ timestamps: true }
);

VendorSchema.plugin(uniqueValidator, { message: "is already taken." });

export default mongoose.model("Vendor", VendorSchema);
