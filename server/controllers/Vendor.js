import VendorService from "../services/Vendor.js";
import { OkResponse, BadRequestResponse, UnauthorizedResponse } from "express-http-response";

const { createVendor, fetchVendors, updateVendor, deleteVendor } = VendorService;

const VendorAdd = async (req, res, next) => {
	const { name, email, address, contact } = req.body;
	try {
		const newVendor = await createVendor(name, email, address, contact);
		if (!newVendor) {
			return next(new BadRequestResponse("Failed to create vendor"));
		}
		return next(new OkResponse(newVendor));
	} catch (err) {
		console.log(err);
		return next(new BadRequestResponse("Failed to create vendor"));
	}
};

const VendorFetchAll = async (req, res, next) => {
	try {
		const vendors = await fetchVendors();
		return next(new OkResponse(vendors));
	} catch (err) {
		console.log(err);
		return next(new BadRequestResponse("Failed to fetch vendors"));
	}
};

const VendorUpdate = async (req, res, next) => {
	const { id } = req.params;
	const vendor = req.body;
	try {
		const updatedVendor = await updateVendor(id, vendor);
		if (!updatedVendor) {
			return next(new BadRequestResponse("Vendor does not exist"));
		}
		return next(new OkResponse(updatedVendor));
	} catch (err) {
		console.log(err);
		return next(new BadRequestResponse("Failed to update vendor"));
	}
};

const VendorDelete = async (req, res, next) => {
	const { id } = req.params;
	try {
		const deletedVendor = await deleteVendor(id);
		if (!deletedVendor) {
			return next(new BadRequestResponse("Vendor does not exist"));
		}
		return next(new OkResponse(deletedVendor));
	} catch (err) {
		console.log(err);
		return next(new BadRequestResponse("Failed to delete vendor"));
	}
};

const VendorController = {
	VendorAdd,
	VendorFetchAll,
	VendorUpdate,
	VendorDelete,
};

export default VendorController;
