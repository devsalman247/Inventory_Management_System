import Item from "../models/Items.js";

async function seedItems() {
	// count the number of items in item collection of database
	const count = await Item.countDocuments();

	const item1 = new Item({
		name: "Chair",
		itemId: `ITM-000${count + 1}`,
		stock: 15,
		stockIn: [
			{
				type: "added",
				quantity: 15,
			},
		],
		isReturnAble: true,
	});

	const item2 = new Item({
		name: "Table",
		itemId: `ITM-000${count + 2}`,
		stock: 15,
		stockIn: [
			{
				type: "added",
				quantity: 15,
			},
		],
		isReturnAble: true,
	});

	const item3 = new Item({
		name: "PC",
		itemId: `ITM-000${count + 3}`,
		stock: 15,
		stockIn: [
			{
				type: "added",
				quantity: 15,
			},
		],
		isReturnAble: true,
	});

	const item4 = new Item({
		name: "Sofa",
		itemId: `ITM-000${count + 4}`,
		stock: 15,
		stockIn: [
			{
				type: "added",
				quantity: 15,
			},
		],
		isReturnAble: true,
	});

	const item5 = new Item({
		name: "Printer",
		itemId: `ITM-000${count + 5}`,
		stock: 15,
		stockIn: [
			{
				type: "added",
				quantity: 15,
			},
		],
	});

	const item6 = new Item({
		name: "Marker",
		itemId: `ITM-000${count + 6}`,
		stock: 100,
		stockIn: [
			{
				type: "added",
				quantity: 100,
			},
		],
	});

	await item1.save().then(async (item) => {
		if (item) {
			await item2.save();
			await item3.save();
			await item4.save();
			await item5.save();
			await item6.save();
		}
	});
}

export default seedItems;
