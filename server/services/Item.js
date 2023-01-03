import Item from "../models/Items.js";
import IssuedItem from "../models/IssuedItem.js";

// Items Service
const createItem = async (item) => {
	try {
		let { itemId } = await Item.findOne().sort({ _id: -1 }).select("itemId");
		itemId = (parseInt(itemId.slice(4)) + 1).toString().padStart(4, "0");

		const newItem = new Item({ ...item });
		newItem.itemId = `ITM-${itemId}`;
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

const updateItem = (id, item) => {
	return Item.findByIdAndUpdate(id, item, { new: true })
		.then((item) => {
			if (!item) throw "Item not found";
			return item;
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const deleteItem = (id) => {
	return Item.findByIdAndDelete(id)
		.then((item) => {
			if (!item) throw "Item not found";
			return item;
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
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
	// Items Service
	createItem,
	updateItem,
	deleteItem,
	getAllItems,
	getItemById,
	// Issued Items Service
	issueItem,
	getAllIssuedItems,
	getIssuedItemById,
	updateIssuedItem,
};

export default ItemService;
