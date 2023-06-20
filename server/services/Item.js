import Item from "../models/Items.js";
import User from "../models/User.js";
import Request from "../models/Request.js";
import IssuedItem from "../models/IssuedItem.js";
import updateItems from "../utils/updateItems.js";

// Items Service
const createItem = async (item) => {
	try {
		// get the last item in the database and increment the itemId
		let { itemId } = await Item.findOne().sort({ _id: -1 }).select("itemId");
		itemId = (parseInt(itemId.slice(4)) + 1).toString().padStart(4, "0");

		const newItem = new Item({ ...item });
		newItem.stockIn = [
			{
				type: "added",
				quantity: item.stock,
			},
		];
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
	return Item.findById(id)
		.then((existingItem) => {
			if (!existingItem) throw "Item not found";

			const stockDifference = item.stock - existingItem.stock;
			const stockInQuantity = stockDifference > 0 ? stockDifference : 0;
			const stockOutQuantity = stockDifference < 0 ? Math.abs(stockDifference) : 0;

			const updatedItem = {
				stock: item.stock,
				name: item.name,
				isReturnAble: item.isReturnAble,
				$push: {
					stockIn: {
						$each: stockInQuantity > 0 ? [{ type: "added", quantity: stockInQuantity, date: Date.now() }] : [],
					},
					stockOut: {
						$each: stockOutQuantity > 0 ? [{ type: "removed", quantity: stockOutQuantity, date: Date.now() }] : [],
					},
				},
			};

			return Item.findByIdAndUpdate(id, updatedItem, { new: true });
		})
		.then((updatedItem) => {
			if (!updatedItem) throw "Item not found";
			return updatedItem;
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
			const newItems = items.map((item) => {
				const stockIn = item.stockIn.reduce((acc, curr) => {
					return acc + curr.quantity;
				}, 0);
				const stockOut = item.stockOut.reduce((acc, curr) => {
					return acc + curr.quantity;
				}, 0);
				return { ...item._doc, stockIn, stockOut };
			});
			return newItems;
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

const requestItem = (id, item) => {
	return Item.findOne({ _id: item._id }).then((reqItem) => {
		if (!reqItem) throw "Item not found";
		if (reqItem.stock < item.quantity) throw "Not enough stock";
		const newRequest = new Request({ reqItem: item._id, requestedBy: id, quantity: item.quantity });
		return newRequest
			.save()
			.then((reqId) => {
				User.findByIdAndUpdate(id, { $push: { requests: reqId._id } }, { new: true }).then((user) => {
					if (!user) throw "User not found";
				});
				return reqId;
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	});
};

const cancelRequest = (id) => {
	return Request.findById(id).then((request) => {
		if (!request) throw "Request not found";
		request.status = "cancelled";
		return request
			.save()
			.then((req) => {
				if (!req) throw "Failed to cancel request";
				return req;
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	});
};

// const approveRequest = (id) => {
// 	return Request.findById(id).then((request) => {
// 		if (!request) throw "Request not found";
// 		if (request.reqItem.stock < request.quantity) throw "Not enough stock";
// 		request.status = "approved";
// 		request.approvedDate = Date.now();
// 		return Item.findById(request.reqItem._id)
// 			.then(async (item) => {
// 				if (!item) throw "Item not found";
// 				item.stockOut.push({ quantity: request.quantity, date: Date.now(), type: "assigned" });
// 				item.stock -= request.quantity;
// 				if (item.isReturnAble) request.return.status = "pending";
// 				await item.save();
// 				await request.save();
// 				return request;
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 				throw err;
// 			});
// 	});
// };

const returnItemRequest = (id) => {
	return Request.findById(id).then((request) => {
		if (!request) throw "Request not found";
		request.return.status = "pending-approval";
		request.return.requests.push({ requestedDate: Date.now() });
		return request
			.save()
			.then((req) => {
				if (!req) throw "Failed to return request";
				return req;
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	});
};

// const rejectRequest = (id) => {
// 	return Request.findById(id).then((request) => {
// 		if (!request) throw "Request not found";
// 		request.status = "rejected";
// 		return request
// 			.save()
// 			.then((req) => {
// 				if (!req) throw "Failed to reject request";
// 				return req;
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 				throw err;
// 			});
// 	});
// };

const rejectRequests = (ids) => {
	return Request.updateMany({ _id: { $in: ids } }, { $set: { status: "rejected" } });
};

const approveRequests = async (ids) => {
	try {
		await Request.updateMany({ _id: { $in: ids } }, { $set: { status: "approved", approvedDate: Date.now() } });

		const approvedRequests = await Request.find({ _id: { $in: ids } });

		// Update the stockOut history for each item
		await Promise.all(
			approvedRequests.map(async (request) => {
				const { reqItem, quantity } = request;
				await Item.updateOne(
					{ _id: reqItem._id },
					{
						$set: { stock: reqItem.stock - quantity },
						$push: {
							stockOut: {
								type: "assigned",
								quantity,
								date: Date.now(),
							},
						},
					}
				);
			})
		);
		return true;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// Issued Items Service
// const issueItem = async (item, reqId) => {
// 	try {
// 		// get the last item in the database and increment the issuedId
// 		let { issuedId } = await IssuedItem.findOne().sort({ _id: -1 }).select("issuedId");

// 		const newItem = new IssuedItem({ ...item, issuedId: ++issuedId, issueDate: Date.now(), lastReturn: null });
// 		return newItem
// 			.save()
// 			.then(async (data) => {
// 				if (!data) {
// 					throw "Failed to create item";
// 				}
// 				// update the items in the database
// 				await updateItems.borrowItem(data, reqId);
// 				return data;
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 				throw err;
// 			});
// 	} catch (err) {
// 		console.log(err);
// 		throw err;
// 	}
// };

// const getAllIssuedItems = () => {
// 	return IssuedItem.find()
// 		.populate("items.id")
// 		.then((items) => {
// 			if (!items) return [];
// 			return items;
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			throw err;
// 		});
// };

// const getIssuedItemById = (id) => {
// 	return IssuedItem.findById(id)
// 		.populate("items.id")
// 		.then((item) => {
// 			if (!item) throw "Item not found";
// 			return item;
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			throw err;
// 		});
// };

// const updateIssuedItem = (id, item) => {
// 	return IssuedItem.findByIdAndUpdate(id, item, { new: true })
// 		.then((item) => {
// 			if (!item) throw "Item not found";
// 			return item;
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			throw err;
// 		});
// };

const ItemService = {
	// Items Service
	createItem,
	updateItem,
	deleteItem,
	getAllItems,
	getItemById,
	requestItem,
	cancelRequest,
	// approveRequest,
	// rejectRequest,
	rejectRequests,
	approveRequests,
	returnItemRequest,
	// Issued Items Service
	// issueItem,
	// getAllIssuedItems,
	// getIssuedItemById,
	// updateIssuedItem,
};

export default ItemService;
