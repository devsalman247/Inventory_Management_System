import Issue from "../models/IssuedItem.js";
import Item from "../models/Items.js";

async function seedIssuedItems() {
	// count the number of items in issuedItem collection of database
	const count = await Issue.countDocuments();

	const issuedItem1 = new Issue({
		issuedId: count,
		issuedTo: "60f2b7f0d6e1a92f1c8b9c9a",
		items: [
			{
				id: "60f2b7f0d6e1a92f1c8b9c9a",
				quantity: 2,
				returned: [
					{
						quantity: 1,
						returnDate: Date.now(),
					},
				],
			},
		],
		issueDate: Date.now(),
		lastReturn: Date.now(),
	});
	await issue.save();
}

export default seedIssuedItems;
