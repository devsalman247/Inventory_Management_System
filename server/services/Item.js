import Item from "../models/Item.js";
import IssuedItem from "../models/IssuedItem.js";

// Items Service
const createItem = (item) => {
	try {
		const newItem = new Item({ ...item });
		return newItem
			.save()
			.then((data) => {
				if (!data) {
					throw "Failed to create item";
				}
				return data;
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	} catch (err) {
		console.log(err);
		throw err;
	}
};

const getAllItems = () => {
	return Item.find()
		.then((items) => {
			if (!items) return [];
			return items;
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const getItemById = (id) => {
	return Item.findById(id)
		.then((item) => {
			if (!item) throw "Item not found";
			return item;
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

// Issued Items Service
const issueItem = (item) => {
	try {
		const newItem = new IssuedItem({ ...item });
		return newItem
			.save()
			.then((data) => {
				if (!data) {
					throw "Failed to create item";
				}
				return data;
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	} catch (err) {
		console.log(err);
		throw err;
	}
};

const getAllIssuedItems = () => {
	return IssuedItem.find()
		.then((items) => {
			if (!items) return [];
			return items;
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const getIssuedItemById = (id) => {
	return IssuedItem.findById(id)
		.then((item) => {
			if (!item) throw "Item not found";
			return item;
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const updateIssuedItem = (id, item) => {
	return IssuedItem.findByIdAndUpdate(id, item, { new: true })
		.then((item) => {
			if (!item) throw "Item not found";
			return item;
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const ItemService = {
	createItem,
	getAllItems,
	getItemById,
	issueItem,
	getAllIssuedItems,
	getIssuedItemById,
	updateIssuedItem,
};

export default ItemService;
