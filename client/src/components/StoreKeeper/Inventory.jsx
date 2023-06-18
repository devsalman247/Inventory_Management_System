import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Navbar } from "../Admin/Navbar";
import Sidebar from "./Sidebar";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import http from "../../api";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const Inventory = () => {
	const [chartType, setChartType] = useState("stockIn");
	const [itemName, setItemName] = useState("");
	const [itemId, setItemId] = useState("");
	const [itemQuantity, setItemQuantity] = useState("");
	const [returnable, setReturnable] = useState(true);

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

	const tableData = [
		{
			itemName: "Chair",
			itemQuantity: 20,
		},
		{
			itemName: "Pen",
			itemQuantity: 30,
		},
		{
			itemName: "Ball Point",
			itemQuantity: 15,
		},
		{
			itemName: "Computer Table",
			itemQuantity: 10,
		},
		{
			itemName: "Laptop",
			itemQuantity: 5,
		},
		{
			itemName: "Projector",
			itemQuantity: 10,
		},
		{
			itemName: "White Board",
			itemQuantity: 10,
		},
		{
			itemName: "Marker",
			itemQuantity: 10,
		},
		{
			itemName: "Duster",
			itemQuantity: 10,
		},
	];

	const handleChartTypeChange = (event) => {
		setChartType(event.target.value);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();

		http
			.post("/item", { name: itemName, stock: itemQuantity, isReturnAble: returnable })
			.then((res) => {
				console.log(res.data);
				setItemName("");
				setItemQuantity("");
				setReturnable(true);
				Swal.fire({
					title: "Item added successfully!",
					icon: "success",
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		if (name === "itemName") {
			setItemName(value);
		} else if (name === "itemId") {
			setItemId(value);
		} else if (name === "itemQuantity") {
			setItemQuantity(value);
		}
	};

	const [searchTerm, setSearchTerm] = useState("");
	const [filteredData, setFilteredData] = useState(data);

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
		const fileData = new Blob([excelBuffer], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});
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

	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 5; // Number of items to display per page

	// Calculate the index range for the current page
	const offset = currentPage * itemsPerPage;
	const pageCount = Math.ceil(tableData.length / itemsPerPage);
	const paginatedData = tableData.slice(offset, offset + itemsPerPage);

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};

	const renderPageButtons = () => {
		const isFirstPage = currentPage === 0;
		const isLastPage = currentPage === pageCount - 1;

		return (
			<div className="flex gap-8">
				<button
					className={`border rounded py-1 px-2 ${
						isFirstPage ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-500 text-white"
					}`}
					onClick={() => !isFirstPage && handlePageChange({ selected: currentPage - 1 })}
					disabled={isFirstPage}>
					Previous
				</button>
				<button
					className={`border rounded py-1 px-2 ${
						isLastPage ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-500 text-white"
					}`}
					onClick={() => !isLastPage && handlePageChange({ selected: currentPage + 1 })}
					disabled={isLastPage}>
					Next
				</button>
			</div>
		);
	};

	return (
		<div className="flex flex-col flex-grow w-full relative">
			<Navbar />
			<div className="flex w-full sm:flex-grow h-full">
				<Sidebar />
				<div className="flex flex-col w-full sm:flex-grow pl-4 pr-4 sm:pl-10 sm:pr-10">
					<div className="flex flex-wrap sm:flex-nowrap flex-grow sm:w-auto p-4 gap-4">
						<div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2">
							<div className="flex flex-col mb-4 gap-2">
								<div className="flex justify-between items-center">
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
								</div>

								<button
									className="text-white bg-blue-400 self-end hover:bg-blue-600  font-bold py-1 px-4 ml-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
									onClick={handleReset}>
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
									className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
									<option value="stockIn">Stock In</option>
									<option value="stockOut">Stock Out</option>
								</select>
							</div>
							<div className="flex">
								<ResponsiveContainer height={400}>
									<BarChart data={filteredChartData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="name" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Bar dataKey="quantity" fill={chartType === "stockIn" ? "#8884d8" : "#ff4d4f"} />
									</BarChart>
								</ResponsiveContainer>
							</div>
						</div>

						<div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2">
							<h3 className="text-lg font-bold mb-2">Add New Inventory Item</h3>
							<form onSubmit={handleFormSubmit} className="flex flex-col px-12 sm:px-28 mt-7 sm:mt-20 gap-6">
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
							{/* <div className="flex justify-around mt-12">
							<label htmlFor="import" className="font-bold mb-2">
								Import Inventory:
							</label>
							<input
								type="file"
								id="import"
								name="import"
								accept=".xlsx"
								onChange={handleImport}
							/>
						</div>
						<button
							className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
							onClick={handleExport}
						>
							Export Inventory
						</button> */}
						</div>
					</div>
					<div className="flex flex-col p-4">
						<div className="flex justify-center">
							<table className="mt-4 w-[95%] sm:w-full border-collapse">
								<thead>
									<tr>
										<th className="py-2 px-4 border-b border-gray-300 bg-gray-200">Item Name</th>
										<th className="py-2 px-4 border-b border-gray-300 bg-gray-200">Remaining Quantity</th>
									</tr>
								</thead>
								<tbody>
									{paginatedData.map((item, index) => (
										<tr key={index} className={item.itemQuantity === 0 ? "bg-red-200" : ""}>
											<td className="py-2 px-4 border-b border-gray-300">{item.itemName}</td>
											<td className="py-2 px-4 border-b border-gray-300 text-center">{item.itemQuantity}</td>
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
