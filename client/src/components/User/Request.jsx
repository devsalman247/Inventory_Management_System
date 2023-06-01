import React, { useState } from "react";
import { Navbar } from "../Admin/Navbar";
import Sidebar from "./Sidebar";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

const Request = () => {
	const [selectedItem, setSelectedItem] = useState("");
	const [selectedQuantity, setSelectedQuantity] = useState("");
	const [requestItems, setRequestItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

	const itemsPerPage = 2;
	const allocatedItems = [
		{
			id: 1,
			name: "Chair",
			quantity: 5,
		},
		{
			id: 2,
			name: "Board Marker",
			quantity: 10,
		},
		{
			id: 3,
			name: "Pen",
			quantity: 3,
		},
		{
			id: 4,
			name: "Computer",
			quantity: 2,
		},
		{
			id: 5,
			name: "Pointer",
			quantity: 7,
		},
	];

	const handleItemChange = (event) => {
		setSelectedItem(event.target.value);
	};

	const handleQuantityChange = (event) => {
		setSelectedQuantity(event.target.value);
	};


	const handleRequest = () => {
		if (!selectedItem || !selectedQuantity) {
			Swal.fire({
				title: "Error!",
				text: "Please select an item and quantity",
				icon: "error",
				confirmButtonText: "OK",
			});
			return;
		}

		const currentDate = new Date().toLocaleDateString(); // Get the current date
		const selectedItemData = allocatedItems.find((item) => item.id === parseInt(selectedItem));
		const requestedItem = {
			id: selectedItemData.id,
			name: selectedItemData.name,
			quantity: parseInt(selectedQuantity),
			date: currentDate,
			status: "Pending",
		};
		setRequestItems([...requestItems, requestedItem]);
		setSelectedItem("");
		setSelectedQuantity("");
		Swal.fire({
			title: "Success!",
			text: "Request sent successfully",
			icon: "success",
			confirmButtonText: "OK",
		});
	};

	const handleCancel = (itemId) => {
		const updatedRequestItems = requestItems.filter((item) => item.id !== itemId);
		setRequestItems(updatedRequestItems);
		Swal.fire({
			title: "Success!",
			text: "Request cancelled successfully",
			icon: "success",
			confirmButtonText: "OK",
		});
	};

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};

	const offset = currentPage * itemsPerPage;
	const paginatedItems = requestItems.slice(offset, offset + itemsPerPage);

	return (
		<div className="flex flex-col w-full h-full">
			<Navbar />
			<div className="flex">
				<Sidebar />
				<div className="w-full px-10 mt-10">
					<div className="mb-4">
						<h2 className="text-lg font-semibold mb-4">Select Items</h2>
						<div className="bg-white border border-gray-300 rounded-md shadow-md p-4">
							<table className="w-full">
								<thead>
									<tr>
										<th className="py-2 px-4 border-b">Item</th>
										<th className="py-2 px-4 border-b">Quantity</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="py-2 px-4 border-b text-center">
											<select
												value={selectedItem}
												onChange={handleItemChange}
												className="py-2 px-4 border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
											>
												<option value="">Select Item</option>
												{allocatedItems.map((item) => (
													<option key={item.id} value={item.id}>
														{item.id} - {item.name}
													</option>
												))}
											</select>
										</td>
										<td className="py-2 px-4 border-b text-center">
											<select
												value={selectedQuantity}
												onChange={handleQuantityChange}
												className="py-2 px-4 text-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
											>
												<option value="">Select Quantity</option>
												{selectedItem &&
													Array.from(
														{ length: allocatedItems.find((item) => item.id === parseInt(selectedItem)).quantity },
														(_, i) => (
															<option key={i + 1} value={i + 1}>
																{i + 1}
															</option>
														)
													)}
											</select>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-2 mb-2 relative left-3/4 transform -translate-x-1/2 ml-48"
						onClick={handleRequest}
					>
						Send Request
					</button>

					{/* Second Table */}
					<div>
						<h2 className="text-lg font-semibold mb-4">Requested Items</h2>
						<div className="bg-white border border-gray-300 rounded-md shadow-md p-4">
							{requestItems.length > 0 ? (
								<table className="w-full">
									<thead>
										<tr>
											<th className="py-2 px-4 border-b">Item ID</th>
											<th className="py-2 px-4 border-b">Item Name</th>
											<th className="py-2 px-4 border-b">Quantity</th>
											<th className="py-2 px-4 border-b">Requested Date</th>
											<th className="py-2 px-4 border-b">Status</th>
											<th className="py-2 px-4 border-b">Action</th>
										</tr>
									</thead>
									<tbody>
										{paginatedItems.map((item) => (
											<tr key={item.id}>
												<td className="py-2 px-4 border-b text-center">{item.id}</td>
												<td className="py-2 px-4 border-b text-center">{item.name}</td>
												<td className="py-2 px-4 border-b text-center">{item.quantity}</td>
												<td className="py-2 px-4 border-b text-center">{item.date}</td>
												<td className="py-2 px-4 border-b text-center">{item.status}</td>
												<td className="py-2 px-4 border-b text-center">
													<button
														className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
														onClick={() => handleCancel(item.id)}
													>
														Cancel
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<p>No items requested.</p>
							)}
						</div>
					</div>

					<div className="mt-20 fixed bottom-4 left-20 right-0 flex justify-center">
						<ReactPaginate
							previousLabel={"Previous"}
							nextLabel={"Next"}
							breakLabel={"..."}
							breakClassName="text-gray-500 px-2 cursor-pointer"
							containerClassName="flex justify-center"
							pageClassName="mx-4"
							pageCount={Math.ceil(requestItems.length / itemsPerPage)}
							marginPagesDisplayed={2}
							pageRangeDisplayed={5}
							onPageChange={handlePageChange}
							activeClassName="bg-blue-500 text-white px-2 py-1 rounded"
							activeLinkClassName="cursor-pointer"
							previousClassName="mx-1"
							nextClassName="mx-1"
							disabledClassName="opacity-50 cursor-not-allowed"

						/>
					</div>

				</div>
			</div>
		</div>
	);
};

export default Request;
