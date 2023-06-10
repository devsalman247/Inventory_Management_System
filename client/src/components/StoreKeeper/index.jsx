import React, { useState } from "react";
import { Navbar } from "../Admin/Navbar";
import Sidebar from "./Sidebar";
import userData from "./data.json";
import ReactPaginate from "react-paginate";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";


const Dashboard = () => {
	const [userRequests, setUserRequests] = useState(userData);
	const [selectedFilter, setSelectedFilter] = useState("requests");
	const [chartType, setChartType] = useState("stockIn");
	const [itemName, setItemName] = useState("");
	const [itemId, setItemId] = useState("");
	const [itemQuantity, setItemQuantity] = useState("");
	const [data, setData] = useState([
		{ name: "Chair", stockIn: 20, stockOut: 10 },
		{ name: "Pen", stockIn: 30, stockOut: 15 },
		{ name: "Ball Point", stockIn: 15, stockOut: 5 },
		{ name: "Computer Table", stockIn: 10, stockOut: 8 },
		{ name: "Laptop", stockIn: 5, stockOut: 3 },
		{ name: "Projector", stockIn: 10, stockOut: 6 },
		{ name: "White Board", stockIn: 10, stockOut: 2 },
		{ name: "Marker", stockIn: 10, stockOut: 4 },
		{ name: "Duster", stockIn: 10, stockOut: 1 },
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [filteredData, setFilteredData] = useState(data);

	const handleChartTypeChange = (event) => {
		setChartType(event.target.value);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();

		// Check if the item already exists in the data
		const existingItemIndex = data.findIndex((item) => item.name === itemName);

		if (existingItemIndex !== -1) {
			// Update the quantity of the existing item
			const updatedData = [...data];
			updatedData[existingItemIndex].stockIn += Number(itemQuantity);
			setData(updatedData);
		} else {
			// Add a new item to the data
			const newItem = {
				name: itemName,
				stockIn: Number(itemQuantity),
				stockOut: 0,
			};
			setData([...data, newItem]);
		}

		setItemName("");
		setItemId("");
		setItemQuantity("");
	};

	

	const getStatusColorClass = (status) => {
		switch (status) {
			case "approved":
				return "text-green-600";
			case "rejected":
				return "text-red-600";
			default:
				return "text-gray-600";
		}
	};

	const handleApprove = (requestId) => {
		const updatedRequests = {
			...userRequests,
			pending: userRequests.pending.filter((request) => request._id !== requestId),
			approved: [
				...userRequests.approved,
				userRequests.pending.find((request) => request._id === requestId),
			],
		};
		setUserRequests(updatedRequests);
	};

	const handleReject = (requestId) => {
		const updatedRequests = {
			...userRequests,
			pending: userRequests.pending.filter((request) => request._id !== requestId),
			rejected: [
				...userRequests.rejected,
				userRequests.pending.find((request) => request._id === requestId),
			],
		};
		setUserRequests(updatedRequests);
	};

	const itemsPerPage = 5;
	const totalPages = Math.ceil(userRequests[selectedFilter].length / itemsPerPage);
	const [currentPage, setCurrentPage] = useState(0);
	const offset = currentPage * itemsPerPage;
	const currentItems = userRequests[selectedFilter].slice(offset, offset + itemsPerPage);

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};


	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
		filterData(event.target.value);
	};

	const filterData = (searchTerm) => {
		const filtered = data.filter((item) => {
			const itemName = item.name.toLowerCase();
			const search = searchTerm.toLowerCase();
			return itemName.includes(search);
		});
		setFilteredData(filtered);
	};

	const handleReset = () => {
		setSearchTerm("");
		setFilteredData(data);
	};

	const filteredChartData =
		chartType === "stockIn"
			? filteredData.map(({ name, stockIn }) => ({ name, quantity: stockIn }))
			: filteredData.map(({ name, stockOut }) => ({ name, quantity: stockOut }));

	const handleExport = () => {
		const exportData = filteredData.map(({ name, stockIn, stockOut }) => ({
			Item: name,
			StockIn: stockIn,
			StockOut: stockOut,
		}));

		const worksheet = XLSX.utils.json_to_sheet(exportData);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");

		const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
		const fileData = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
		saveAs(fileData, "inventory.xlsx");
	};

	const handleImport = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = (e) => {
			const data = new Uint8Array(e.target.result);
			const workbook = XLSX.read(data, { type: "array" });
			const worksheet = workbook.Sheets[workbook.SheetNames[0]];
			const importedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

			const headers = importedData[0];
			const formattedData = importedData.slice(1).map((row) => {
				const item = {};
				headers.forEach((header, index) => {
					item[header] = row[index];
				});
				return item;
			});

			setData(formattedData);
			setFilteredData(formattedData);
		};

		reader.readAsArrayBuffer(file);
	};


	return (
		<div>
			<Navbar />
			<div className="flex">
				<Sidebar />
				<div className="flex flex-col flex-grow ml-20">
					<div className="flex mt-8 mb-5 w-4/5">
						<div className="w-full flex gap-2">
							<div
								className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer ${selectedFilter === "requests" ? "border-2 border-blue-600" : ""
									}`}
								onClick={() => setSelectedFilter("requests")}
							>
								<div className="flex flex-col">
									<span className="text-sm text-gray-500">Requested</span>
									<span className="text-2xl font-semibold">
										{userRequests.approved.length +
											userRequests.pending.length +
											userRequests.rejected.length +
											userRequests.cancelled.length}
									</span>
								</div>
							</div>
							<div
								className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer ${selectedFilter === "approved" ? "border-2 border-blue-600" : ""
									}`}
								onClick={() => setSelectedFilter("approved")}
							>
								<div className="flex flex-col">
									<span className="text-sm text-gray-500">Approved</span>
									<span className="text-2xl font-semibold">
										{userRequests.approved.length}
									</span>
								</div>
							</div>
							<div
								className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer ${selectedFilter === "pending" ? "border-2 border-blue-600" : ""
									}`}
								onClick={() => setSelectedFilter("pending")}
							>
								<div className="flex flex-col">
									<span className="text-sm text-gray-500">Pending</span>
									<span className="text-2xl font-semibold">
										{userRequests.pending.length}
									</span>
								</div>
							</div>
							<div
								className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer ${selectedFilter === "rejected" ? "border-2 border-blue-600" : ""
									}`}
								onClick={() => setSelectedFilter("rejected")}
							>
								<div className="flex flex-col">
									<span className="text-sm text-gray-500">Rejected</span>
									<span className="text-2xl font-semibold">
										{userRequests.rejected.length}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className="flex">
						<div className="bg-white p-4 rounded-lg shadow-md w-1/2 mr-4">
							<div className="mb-4 flex items-center">
								<label htmlFor="search" className="font-bold mr-2">
									Search Items:
								</label>
								<input
									type="text"
									id="search"
									name="search"
									value={searchTerm}
									onChange={handleSearch}
									className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Search items"
								/>

								<button
									className="text-white bg-blue-400 hover:bg-blue-600  font-bold py-1 px-4 ml-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
									onClick={handleReset}
								>
									Reset
								</button>
							</div>
							<div className="mb-4">
								<label htmlFor="chartType" className="font-bold mr-2">
									Select Chart Type:
								</label>
								<select
									id="chartType"
									name="chartType"
									value={chartType}
									onChange={handleChartTypeChange}
									className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<option value="stockIn">Stock In</option>
									<option value="stockOut">Stock Out</option>
								</select>
							</div>
							<div className="flex justify-center">
								<BarChart width={500} height={430} data={filteredChartData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Bar
										dataKey="quantity"
										fill={chartType === "stockIn" ? "#8884d8" : "#ff4d4f"}
									/>
								</BarChart>
							</div>
						</div>

						<table className="w-1/2 bg-white border border-gray-300 ml-4
						h-16 rounded-lg shadow-md">
						
							<thead>
								<tr className="bg-blue-500 text-white">
									<th className="py-2 px-4 border-b text-center">Item ID</th>
									<th className="py-2 px-4 border-b text-left">Item Name</th>
									<th className="py-2 px-4 border-b text-left">Item Quantity</th>
									<th className="py-2 px-4 border-b text-left">Requester</th>
									{selectedFilter === "requests" && (
										<th className="py-2 px-4 border-b text-left">Actions</th>
									)}
								</tr>
							</thead>
							<tbody>
								{currentItems.map((request) => (
									<tr key={request._id}>
										<td className="py-4 px-4 border-b align-middle text-center">{request.reqItem.itemId}</td>
										<td className="py-4 px-2 border-b align-middle text-left">{request.reqItem.name}</td>
										<td className="py-4 px-2 border-b align-middle text-left">{request.quantity}</td>
										<td className="py-4 px-2 border-b align-middle text-left">{request.requesterName}</td>
										{selectedFilter === "requests" && (
											<td className="py-4 px-2 border-b align-middle text-left">
												<div className="flex items-center justify-center">
													<button
														className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 ml-2 rounded"
														onClick={() => handleApprove(request._id)}
													>
														Approve
													</button>
													<button
														className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 ml-2 rounded"
														onClick={() => handleReject(request._id)}
													>
														Reject
													</button>
												</div>
											</td>
										)}
									</tr>
								))}
							</tbody>
						</table>


					</div>

					{totalPages > 1 && (
						<div className="mt-20 fixed bottom-4 left-20 right-0 flex justify-center">
							<ReactPaginate
								previousLabel="Previous"
								nextLabel="Next"
								breakLabel="..."
								breakClassName="text-gray-500 px-2 cursor-pointer"
								pageCount={totalPages}
								marginPagesDisplayed={2}
								pageRangeDisplayed={5}
								onPageChange={handlePageChange}
								containerClassName="flex justify-center"
								pageClassName="mx-4"
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

export default Dashboard;
