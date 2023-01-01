import Issue from "../models/IssuedItem.js";
import Item from "../models/Items.js";

async function seedIssuedItems() {
	// count the number of items in issuedItem collection of database
	const count = await Issue.countDocuments();

	Item.find({}).then((err, items) => {
		if (err) {
			console.log(err);
		} else {
			console.log(items);
		}
	});

	// const issuedItem1 = new Issue({
	// 	issuedId: count + 1,
	// 	issuedTo: "60f2b7f0d6e1a92f1c8b9c9a",
	// 	items: [
	// 		{
	// 			id: "60f2b7f0d6e1a92f1c8b9c9a",
	// 			quantity: 2,
	// 			returned: [
	// 				{
	// 					quantity: 1,
	// 					returnDate: Date.now(),
	// 				},
	// 			],
	// 		},
	// 	],
	// 	issueDate: Date.now(),
	// 	lastReturn: Date.now(),
	// });

	// const issuedItem2 = new Issue({
	// 	issuedId: count + 2,
	// 	issuedTo: "60f2b7f0d6e1a92f1c8b9c9a",
	// 	items: [
	// 		{
	// 			id: "60f2b7f0d6e1a92f1c8b9c9a",
	// 			quantity: 2,
	// 			returned: [
	// 				{
	// 					quantity: 1,
	// 					returnDate: Date.now(),
	// 				},
	// 			],
	// 		},
	// 	],
	// 	issueDate: Date.now(),
	// 	lastReturn: Date.now(),
	// });

	// const issuedItem3 = new Issue({
	// 	issuedId: count + 3,
	// 	issuedTo: "60f2b7f0d6e1a92f1c8b9c9a",
	// 	items: [
	// 		{
	// 			id: "60f2b7f0d6e1a92f1c8b9c9a",
	// 			quantity: 2,
	// 			returned: [
	// 				{
	// 					quantity: 1,
	// 					returnDate: Date.now(),
	// 				},
	// 			],
	// 		},
	// 	],
	// 	issueDate: Date.now(),
	// 	lastReturn: Date.now(),
	// });

	// const issuedItem4 = new Issue({
	// 	issuedId: count + 4,
	// 	issuedTo: "60f2b7f0d6e1a92f1c8b9c9a",
	// 	items: [
	// 		{
	// 			id: "60f2b7f0d6e1a92f1c8b9c9a",
	// 			quantity: 2,
	// 			returned: [
	// 				{
	// 					quantity: 1,
	// 					returnDate: Date.now(),
	// 				},
	// 			],
	// 		},
	// 	],
	// 	issueDate: Date.now(),
	// 	lastReturn: Date.now(),
	// });

	// const issuedItem5 = new Issue({
	// 	issuedId: count + 5,
	// 	issuedTo: "60f2b7f0d6e1a92f1c8b9c9a",
	// 	items: [
	// 		{
	// 			id: "60f2b7f0d6e1a92f1c8b9c9a",
	// 			quantity: 2,
	// 			returned: [
	// 				{
	// 					quantity: 1,
	// 					returnDate: Date.now(),
	// 				},
	// 			],
	// 		},
	// 	],
	// 	issueDate: Date.now(),
	// 	lastReturn: Date.now(),
	// });

	// await issuedItem1.save();
}

export default seedIssuedItems;
