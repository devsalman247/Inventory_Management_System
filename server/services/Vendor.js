import Vendor from "../models/Vendor.js";

const createVendor = async (name, email, address, contact) => {
	try {
		const vendor = new Vendor({
			name,
			email,
			address,
			contact,
		});
		const newVendor = await vendor.save();
		return newVendor;
	} catch (err) {
		console.log(err);
		throw new Error(err);
	}
};

const fetchVendors = async () => {
	try {
		const vendors = await Vendor.find();
		return vendors;
	} catch (err) {
		console.log(err);
		throw new Error(err);
	}
};

const updateVendor = async (id, vendor) => {
	try {
		const vendorToUpdate = await Vendor.findById(id);
		if (!vendorToUpdate) {
			return null;
		}
		if (vendor.name) vendorToUpdate.name = vendor.name;
		if (vendor.email) vendorToUpdate.email = vendor.email;
		if (vendor.address) vendorToUpdate.address = vendor.address;
		if (vendor.contact) vendorToUpdate.contact = vendor.contact;
		const updatedVendor = await vendorToUpdate.save();
		return updatedVendor;
	} catch (err) {
		console.log(err);
		throw new Error(err);
	}
};

const deleteVendor = async (id) => {
	try {
		const vendorToDelete = await Vendor.findById(id);
		if (!vendorToDelete) {
			return null;
		}
		const deletedVendor = await vendorToDelete.remove();
		return deletedVendor;
	} catch (err) {
		console.log(err);
		throw new Error(err);
	}
};

const VendorService = {
	createVendor,
	fetchVendors,
	updateVendor,
	deleteVendor,
};

export default VendorService;
