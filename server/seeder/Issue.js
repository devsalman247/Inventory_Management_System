import User from "../models/User.js";
import Item from "../models/Items.js";
import Issue from "../models/IssuedItem.js";

async function seedIssuedItems() {
	// count the number of items in issuedItem collection of database
	const count = await Issue.countDocuments();

	// get all the itemIds from the database
	const itemIds = await Item.find({})
		.select("id")
		.then((items, err) => {
			if (err) {
				console.log(err);
			} else {
				const filteredIds = items.map((item) => item.id);
				return filteredIds;
			}
		});

	// get all users from the database
	const userIds = await User.find({})
		.select("id")
		.then((users, err) => {
			if (err) {
				console.log(err);
			} else {
				const filteredIds = users.map((user) => user.id);
				return filteredIds;
			}
		});

	const issuedItem1 = new Issue({
		issuedId: count + 1,
		issuedTo: userIds[0],
		items: [
			{
				id: itemIds[0],
				quantity: 2,
				returned: [],
			},
		],
		issueDate: Date.now(),
		lastReturn: null,
	});

	const issuedItem2 = new Issue({
		issuedId: count + 2,
		issuedTo: userIds[1],
		items: [
			{
				id: itemIds[1],
				quantity: 2,
				returned: [],
			},
		],
		issueDate: Date.now(),
		lastReturn: null,
	});

	const issuedItem3 = new Issue({
		issuedId: count + 3,
		issuedTo: userIds[2],
		items: [
			{
				id: itemIds[1],
				quantity: 1,
				returned: [],
			},
		],
		issueDate: Date.now(),
		lastReturn: null,
	});

	const issuedItem4 = new Issue({
		issuedId: count + 4,
		issuedTo: userIds[3],
		items: [
			{
				id: itemIds[0],
				quantity: 4,
				returned: [],
			},
		],
		issueDate: Date.now(),
		lastReturn: null,
	});

	const issuedItem5 = new Issue({
		issuedId: count + 5,
		issuedTo: userIds[4],
		items: [
			{
				id: itemIds[4],
				quantity: 2,
				returned: [],
			},
			{
				id: itemIds[1],
				quantity: 1,
				returned: [],
			},
			{
				id: itemIds[2],
				quantity: 3,
				returned: [],
			},
		],
		issueDate: Date.now(),
		lastReturn: null,
	});

	await issuedItem1.save().then(async (item, err) => {
		if (err) {
			console.log(err);
		} else {
			await issuedItem2.save();
			await issuedItem3.save();
			await issuedItem4.save();
			await issuedItem5.save();
		}
	});
}

export default seedIssuedItems;
