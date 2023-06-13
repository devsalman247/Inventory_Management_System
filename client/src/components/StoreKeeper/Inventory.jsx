import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Navbar } from "../Admin/Navbar";
import Sidebar from "./Sidebar";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const Inventory = () => {
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

	return (
		<div className="bg-gray-100 min-h-screen">
			<Navbar />
			<div className="flex">
				<Sidebar />
				<div className="flex flex-1 p-4">
					<div className="bg-white p-4 rounded-lg shadow-md flex-grow-0 flex-shrink-0 w-1/2 mr-4">
						<div className="mb-4">
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
								className="text-white bg-blue-400 hover:bg-blue-600  font-bold py-1 px-4 ml-2  rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
						<div className="flex justify-center">
							<BarChart width={500} height={430} data={filteredChartData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="quantity" fill={chartType === "stockIn" ? "#8884d8" : "#ff4d4f"} />
							</BarChart>
						</div>
					</div>
					
					<div className="bg-white p-4 rounded-lg shadow-md flex-grow-0 flex-shrink-0 w-1/2">
						<h3 className="text-lg font-bold mb-2">Add New Inventory Item</h3>
						<form onSubmit={handleFormSubmit}>
							<div className="mb-8">
								<label htmlFor="itemName" className="font-bold mb-2">
									Item Name:
								</label>
								<input
									type="text"
									id="itemName"
									name="itemName"
									value={itemName}
									onChange={handleInputChange}
									className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
									placeholder="Enter item name"
								/>
							</div>
							<div className="mb-8">
								<label htmlFor="itemId" className="font-bold mb-2">
									Item ID:
								</label>
								<input
									type="text"
									id="itemId"
									name="itemId"
									value={itemId}
									onChange={handleInputChange}
									className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
									placeholder="Enter item ID"
								/>
							</div>
							<div className="mb-8">
								<label htmlFor="itemQuantity" className="font-bold mb-4">
									Item Quantity:
								</label>
								<input
									type="number"
									id="itemQuantity"
									name="itemQuantity"
									value={itemQuantity}
									onChange={handleInputChange}
									className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
									placeholder="Enter item quantity"
								/>
							</div>
							<button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
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
			</div>
		</div>
	);
};

export default Inventory;
