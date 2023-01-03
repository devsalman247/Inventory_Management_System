import Item from "../models/Items.js";
import IssuedItem from "../models/IssuedItem.js";
import updateItems from "../utils/updateItems.js";

// Items Service
const createItem = async (item) => {
	try {
		// get the last item in the database and increment the itemId
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
const issueItem = async (item) => {
	try {
		// get the last item in the database and increment the issuedId
		let { issuedId } = await IssuedItem.findOne().sort({ _id: -1 }).select("issuedId");

		const newItem = new IssuedItem({ ...item, issuedId: ++issuedId, issueDate: Date.now(), lastReturn: null });
		return newItem
			.save()
			.then(async (data) => {
				if (!data) {
					throw "Failed to create item";
				}
				// update the items in the database
				await updateItems.borrowItem(data.id, data.items);
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
		.populate("items.id")
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
		.populate("items.id")
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
