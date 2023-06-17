import React, { useState, useEffect } from "react";
import { Navbar } from "../Admin/Navbar";
import Sidebar from "./Sidebar";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import http from "../../api";

const Request = () => {
	const [items, setItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedQuantity, setSelectedQuantity] = useState("");
	const [requestedItems, setRequestedItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

	const itemsPerPage = 3;

	const handleItemChange = (event) => {
		if (event.target.value === "") {
			setSelectedItem(null);
			setSelectedQuantity("");
			return;
		}
		const newSelectedItem = JSON.parse(event.target.value);
		setSelectedItem(newSelectedItem);
	};

	const handleQuantityChange = (event) => {
		setSelectedQuantity(Math.abs(parseInt(event.target.value)));
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

		http
			.post("/item/request", {
				item: {
					_id: selectedItem._id,
					quantity: selectedQuantity,
				},
			})
			.then((res) => {
				Swal.fire({
					title: "Success!",
					text: "Request sent successfully",
					icon: "success",
					confirmButtonText: "OK",
				});
				getUserRequests();
				getItems();
				setSelectedItem(null);
				setSelectedQuantity("");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const cancelRequest = (reqId) => {
		http
			.post(`/item/request/cancel/${reqId}`)
			.then((res) => {
				Swal.fire({
					title: "Success!",
					text: "Request cancelled successfully",
					icon: "success",
					confirmButtonText: "OK",
				});
				getUserRequests();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};

	const getItems = () => {
		http
			.get("/item")
			.then((res) => {
				setItems(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getUserRequests = () => {
		http
			.get("/user/requests")
			.then((res) => {
				setRequestedItems(res.data.data.pending);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const offset = currentPage * itemsPerPage;
	const paginatedItems = requestedItems.slice(offset, offset + itemsPerPage);

	useEffect(() => {
		getItems();
		getUserRequests();
	}, []);

	return (
		<div className="flex flex-col w-full">
			<Navbar />
			<div className="flex w-full">
				<Sidebar />
				<div className="px-10 mt-10 w-full">
					<div className="mb-4">
						<h2 className="text-lg font-semibold mb-4">Request New Item</h2>
						<div className="bg-white border border-gray-300 rounded-md shadow-md p-4">
							<table className="w-full flex">
								<thead>
									<tr className="flex flex-col">
										<th className="py-4 md:py-2 px-4 md;border-b">Item</th>
										<th className="py-4 md:py-2 px-4 md;border-b">Quantity</th>
										<th className="py-4 md:py-2 px-4 md;border-b">Stock Available</th>
									</tr>
								</thead>
								<tbody>
									<tr className="flex flex-col h-full">
										<td className="py-2 px-4 md:border-b text-center">
											<select
												value={JSON.stringify(selectedItem)}
												onChange={handleItemChange}
												className="py-2 px-4 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
												<option value="">Select Item</option>
												{items.map((item) => (
													<option key={item._id} value={JSON.stringify(item)}>
														{item.name}
													</option>
												))}
											</select>
										</td>
										<td className="py-2 px-4 md:border-b text-center">
											<input
												type="number"
												value={selectedQuantity}
												onChange={handleQuantityChange}
												className="py-2 px-2 text-center w-[8rem] border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
											/>
										</td>
										<td className="py-2 px-4 flex items-center justify-center flex-grow md:border-b text-center">
											{selectedItem ? selectedItem.stock : "0"}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div className="flex justify-end">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-2 mb-2 relative disabled:opacity-50"
							disabled={!selectedItem || !selectedQuantity || selectedQuantity > selectedItem?.stock}
							onClick={handleRequest}>
							Send Request
						</button>
					</div>

					{/* Second Table */}
					<div>
						<h2 className="text-lg font-semibold mb-4">Requested Items</h2>
						<div className="bg-white border border-gray-300 rounded-md shadow-md p-4">
							{requestedItems.length > 0 ? (
								<div className="w-full overflow-x-auto">
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
												<tr key={item._id}>
													<td className="py-2 px-4 border-b text-center">{item.reqItem.itemId}</td>
													<td className="py-2 px-4 border-b text-center">{item.reqItem.name}</td>
													<td className="py-2 px-4 border-b text-center">{item.quantity}</td>
													<td className="py-2 px-4 border-b text-center">
														{new Date(item.requestDate).toISOString().substring(0, 10)}
													</td>
													<td className="py-2 px-4 border-b text-center">{item.status}</td>
													<td className="py-2 px-4 border-b text-center">
														<button
															className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
															onClick={() => cancelRequest(item._id)}>
															Cancel
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<p>No pending requests to show here.</p>
							)}
						</div>
					</div>

					{Math.ceil(requestedItems.length / itemsPerPage) > 1 && (
						<div className="mt-20 fixed bottom-4 left-20 right-0 flex justify-center">
							<ReactPaginate
								previousLabel={"Previous"}
								nextLabel={"Next"}
								breakLabel={"..."}
								breakClassName="text-gray-500 px-2 cursor-pointer"
								containerClassName="flex justify-center"
								pageClassName="mx-4"
								pageCount={Math.ceil(requestedItems.length / itemsPerPage)}
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
					)}
				</div>
			</div>
		</div>
	);
};

export default Request;
