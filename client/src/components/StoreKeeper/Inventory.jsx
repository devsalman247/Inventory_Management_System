import React, { useEffect, useState } from "react";
import { Navbar } from "../Admin/Navbar";
import Sidebar from "./Sidebar";
import http from "../../api";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const Inventory = () => {
	const [itemName, setItemName] = useState("");
	const [itemQuantity, setItemQuantity] = useState("");
	const [returnable, setReturnable] = useState(true);
	const [data, setData] = useState([]);
	const [selectedItemName, setSelectedItemName] = useState("");
	const [selectedItemId, setSelectedItemId] = useState("");
	const [selectedItemQuantity, setSelectedItemQuantity] = useState("");
	const [selectedItemReturnable, setSelectedItemReturnable] = useState(false);

	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 5;

	const offset = currentPage * itemsPerPage;
	const pageCount = Math.ceil(data.length / itemsPerPage);
	const paginatedData = data.slice(offset, offset + itemsPerPage);

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};

	const handleUpdateItem = (event) => {
		event.preventDefault();
		http
			.put(`/item/${selectedItemId}`, { stock: selectedItemQuantity, isReturnAble: selectedItemReturnable })
			.then((res) => {
				setSelectedItemName("");
				setSelectedItemQuantity("");
				setSelectedItemReturnable(false);
				Swal.fire({
					title: "Item updated successfully!",
					icon: "success",
				});
				getAllItems();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSelect = (id) => {
		const item = data.find((item) => item._id === id);
		setSelectedItemId(id);
		setSelectedItemName(item.name);
		setSelectedItemQuantity(item.stock);
		setSelectedItemReturnable(item.isReturnAble);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();

		http
			.post("/item", { name: itemName, stock: itemQuantity, isReturnAble: returnable })
			.then((res) => {
				setItemName("");
				setItemQuantity("");
				setReturnable(true);
				Swal.fire({
					title: "Item added successfully!",
					icon: "success",
				});
				getAllItems();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getAllItems = () => {
		http
			.get("/item")
			.then((res) => {
				setData(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getAllItems();
	}, []);

	return (
		<div className="flex flex-col flex-grow w-full relative">
			<Navbar />
			<div className="flex w-full sm:flex-grow h-full">
				<Sidebar />
				<div className="flex flex-col w-full sm:flex-grow pl-4 pr-4 sm:pl-10 sm:pr-10">
					<div className="flex flex-wrap sm:flex-nowrap flex-grow gap-4 sm:w-auto p-4">
						<div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2">
							<h3 className="text-lg font-bold mb-2">Update Stock</h3>
							<form onSubmit={handleUpdateItem} className="flex flex-col px-12 sm:px-28 mt-7 sm:mt-10 gap-6">
								<div>
									<label htmlFor="itemName" className="font-bold mb-4 inline-block">
										Select Item:
									</label>
									<select
										name="itemName"
										id="itemName"
										value={selectedItemId}
										onChange={(e) => handleSelect(e.target.value)}
										className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
										<option value="" disabled selected>
											Select Item
										</option>
										{data.map((item, index) => (
											<option key={index} value={item._id}>
												{item.name}
											</option>
										))}
									</select>
								</div>
								<div>
									<label htmlFor="itemQuantity" className="font-bold mb-4 inline-block">
										Select Quantity:
									</label>
									<input
										type="number"
										id="itemQuantity"
										name="itemQuantity"
										value={selectedItemQuantity}
										onChange={(e) => setSelectedItemQuantity(Math.abs(parseInt(e.target.value)))}
										className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
										placeholder="Enter item quantity"
									/>
								</div>

								<div className="flex justify-between">
									<span className="text-base font-medium text-gray-900 dark:text-gray-300">Returnable?</span>
									<label class="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											defaultChecked={selectedItemReturnable}
											checked={selectedItemReturnable}
											class="sr-only peer"
											onChange={(e) => setSelectedItemReturnable(e.target.checked)}
										/>
										<div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
									</label>
								</div>

								<button
									type="submit"
									disabled={!selectedItemName || !selectedItemQuantity}
									className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded">
									Update Item
								</button>
							</form>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2">
							<h3 className="text-lg font-bold mb-2">Add New Inventory Item</h3>
							<form onSubmit={handleFormSubmit} className="flex flex-col px-12 sm:px-28 mt-7 sm:mt-10 gap-6">
								<div>
									<label htmlFor="itemName" className="font-bold mb-4 inline-block">
										Item Name:
									</label>
									<input
										type="text"
										id="itemName"
										name="itemName"
										value={itemName}
										onChange={(e) => setItemName(e.target.value)}
										className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
										placeholder="Enter item name"
									/>
								</div>
								<div>
									<label htmlFor="itemQuantity" className="font-bold mb-4 inline-block">
										Item Quantity:
									</label>
									<input
										type="number"
										id="itemQuantity"
										name="itemQuantity"
										value={itemQuantity}
										onChange={(e) => setItemQuantity(Math.abs(parseInt(e.target.value)))}
										className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
										placeholder="Enter item quantity"
									/>
								</div>

								<div className="flex justify-between">
									<span className="text-base font-medium text-gray-900 dark:text-gray-300">Returnable?</span>
									<label class="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											defaultChecked={returnable}
											value={returnable}
											class="sr-only peer"
											onChange={(e) => setReturnable(e.target.checked)}
										/>
										<div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
									</label>
								</div>

								<button
									type="submit"
									disabled={!itemName || !itemQuantity}
									className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded">
									Add Item
								</button>
							</form>
						</div>
					</div>
					<div className="flex flex-col p-4">
						<div className="flex justify-center">
							<table className="mt-4 w-[95%] sm:w-full border-collapse">
								<thead>
									<tr>
										<th className="py-2 px-4 border-b border-gray-300 bg-gray-200">Item Name</th>
										<th className="py-2 px-4 border-b border-gray-300 bg-gray-200">Remaining Quantity</th>
										<th className="py-2 px-4 border-b border-gray-300 bg-gray-200">Stock In</th>
										<th className="py-2 px-4 border-b border-gray-300 bg-gray-200">Stock Out</th>
									</tr>
								</thead>
								<tbody>
									{paginatedData.map((item, index) => (
										<tr key={index} className={item.stock === 0 ? "bg-red-200" : ""}>
											<td className="py-2 px-4 border-b border-gray-300">{item.name}</td>
											<td className="py-2 px-4 border-b border-gray-300 text-center">{item.stock}</td>
											<td className="py-2 px-4 border-b border-gray-300 text-center">{item.stockIn}</td>
											<td className="py-2 px-4 border-b border-gray-300 text-center">{item.stockOut}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="flex justify-center mt-4">
							<ReactPaginate
								className="flex gap-8 "
								previousLabel={"Previous"}
								nextLabel={"Next"}
								breakLabel={"..."}
								breakClassName={"break-me"}
								pageCount={pageCount}
								marginPagesDisplayed={2}
								pageRangeDisplayed={5}
								onPageChange={handlePageChange}
								containerClassName={"pagination"}
								activeClassName={"active"}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Inventory;
