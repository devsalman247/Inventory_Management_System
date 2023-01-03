import Item from "../models/Items.js";

function borrowItem(id, items) {
	items.map((item) => {
		Item.findById(item.id).then((itemToUpdate) => {
			itemToUpdate.stock -= item.quantity;
			itemToUpdate.issued.push({ id, quantity: item.quantity });
			itemToUpdate.save();
		});
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
