import Item from "../models/Items.js";

async function seedItems() {
	// count the number of items in item collection of database
	const count = await Item.countDocuments();

	const item1 = new Item({
		name: "Chair",
		itemId: `ITM-000${count + 1}`,
		stock: 15,
		issued: [],
	});

	const item2 = new Item({
		name: "Table",
		itemId: `ITM-000${count + 2}`,
		stock: 15,
		issued: [],
	});

	const item3 = new Item({
		name: "PC",
		itemId: `ITM-000${count + 3}`,
		stock: 15,
		issued: [],
	});

	const item4 = new Item({
		name: "Sofa",
		itemId: `ITM-000${count + 4}`,
		stock: 15,
		issued: [],
	});

	const item5 = new Item({
		name: "Printer",
		itemId: `ITM-000${count + 5}`,
		stock: 15,
		issued: [],
	});

	await item1.save().then(async (item) => {
		if (item) {
			await item2.save();
			await item3.save();
			await item4.save();
			await item5.save();
		}
	});
}

export default seedItems;
