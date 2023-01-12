import Item from "../models/Items.js";
import User from "../models/User.js";

function borrowItem(data, reqId) {
	const { id, items, issuedTo } = data;
	items.map((item) => {
		Item.findById(item.id).then((itemToUpdate) => {
			// update item
			itemToUpdate.stock -= item.quantity;
			itemToUpdate.issued.push({ id, quantity: item.quantity });
			itemToUpdate.save();

			// update users
		});
	});
	User.findById(issuedTo)
		.then((user) => {
			if (!user) throw "User not found!";
			console.log(user.requests);
			// const indexOfReq = user.requests.findIndex((req) => req);
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
}

function returnItem(items) {
	items.map((item) => {
		Item.findById(item.id).then((item) => {
			item.stock += item.quantity;
			item.save();
		});
	});
}

export default { borrowItem, returnItem };
