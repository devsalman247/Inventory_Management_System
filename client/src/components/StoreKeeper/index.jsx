import React, { useEffect, useState } from "react";
import { Navbar } from "../Admin/Navbar";
import Sidebar from "./Sidebar";
import userData from "./data.json";
import ReactPaginate from "react-paginate";
import http from "../../api";
import Swal from "sweetalert2";

const Dashboard = () => {
	const [userRequests, setUserRequests] = useState({
		pending: [],
		approved: [],
		rejected: [],
		requests: [],
	});
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
		http
			.post(`/item/request/approve/${requestId}`)
			.then((res) => {
				Swal.fire({
					title: "Success!",
					text: "Request approved successfully",
					icon: "success",
					confirmButtonText: "OK",
				});
				getUserRequests();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleReject = (requestId) => {
		http
			.post(`/item/request/reject/${requestId}`)
			.then((res) => {
				Swal.fire({
					title: "Success!",
					text: "Request rejected successfully",
					icon: "success",
					confirmButtonText: "OK",
				});
				getUserRequests();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const itemsPerPage = 5;
	const totalPages = Math.ceil(userRequests[selectedFilter].length / itemsPerPage);
	const [currentPage, setCurrentPage] = useState(0);
	const offset = currentPage * itemsPerPage;
	const currentItems = userRequests[selectedFilter].slice(offset, offset + itemsPerPage);

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};

	const getUserRequests = () => {
		http
			.get("/user/requests")
			.then((res) => {
				console.log(res.data.data);
				setUserRequests(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getUserRequests();
	}, []);

	return (
		<div>
			<Navbar />
			<div className="flex">
				<Sidebar />
				<div>
					<div className="flex mt-8 ml-20">
						<div className="flex flex-wrap mb-5 w-4/5">
							<div className="w-full flex gap-2">
								<div
									className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer ${
										selectedFilter === "requests" ? "border-2 border-blue-600" : ""
									}`}
									onClick={() => setSelectedFilter("requests")}>
									<div className="flex flex-col">
										<span className="text-sm text-gray-500">Requested</span>
										<span className="text-2xl font-semibold">
											{userRequests.approved.length + userRequests.pending.length + userRequests.rejected.length}
										</span>
									</div>
								</div>
								<div
									className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer ${
										selectedFilter === "approved" ? "border-2 border-blue-600" : ""
									}`}
									onClick={() => setSelectedFilter("approved")}>
									<div className="flex flex-col">
										<span className="text-sm text-gray-500">Approved</span>
										<span className="text-2xl font-semibold">{userRequests.approved.length}</span>
									</div>
								</div>
								<div
									className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer ${
										selectedFilter === "pending" ? "border-2 border-blue-600" : ""
									}`}
									onClick={() => setSelectedFilter("pending")}>
									<div className="flex flex-col">
										<span className="text-sm text-gray-500">Pending</span>
										<span className="text-2xl font-semibold">{userRequests.pending.length}</span>
									</div>
								</div>
								<div
									className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer ${
										selectedFilter === "rejected" ? "border-2 border-blue-600" : ""
									}`}
									onClick={() => setSelectedFilter("rejected")}>
									<div className="flex flex-col">
										<span className="text-sm text-gray-500">Rejected</span>
										<span className="text-2xl font-semibold">{userRequests.rejected.length}</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<table className="w-[1120px] bg-white border border-gray-300 ml-20 text-left">
						<thead>
							<tr className="bg-blue-500 text-white">
								<th className="py-2 px-4 border-b text-center">Item ID</th>
								<th className="py-2 px-4 border-b text-left">Item Name</th>
								<th className="py-2 px-4 border-b text-left">Item Quantity</th>
								<th className="py-2 px-4 border-b text-left">Requester</th>
								<th className="py-2 px-4 border-b text-left">Requested Date</th>
								<th className="py-2 px-4 border-b text-left">Allocated Date</th>
								<th className="py-2 px-4 border-b text-left">Return Date</th>
								<th className="py-2 px-4 border-b text-left pl-20">Actions</th>
							</tr>
						</thead>
						<tbody>
							{currentItems.map((request) => (
								<tr key={request._id}>
									<td className="py-4 px-4 border-b text-left">{request.reqItem.itemId}</td>
									<td className="py-4 px-2 border-b text-left pl-6">{request.reqItem.name}</td>
									<td className="py-4 px-2 border-b text-left pl-12">{request.quantity}</td>
									<td className="py-4 px-2 border-b  pl-4">{request.requestedBy.name}</td>
									<td className="py-4 px-4 border-b text-left pl-6">
										{new Date(request.requestDate).toISOString().substring(0, 10)}
									</td>
									<td className="py-4 px-4 border-b text-left pl-10">
										{request.approvedDate ? new Date(request.approvedDate).toISOString().substring(0, 10) : "N/A"}
									</td>
									<td className="py-4 px-4 border-b text-left pl-10">
										{request.return.returnedDate
											? new Date(request.return.returnedDate).toISOString().substring(0, 10)
											: "N/A"}
									</td>
									<td className="py-4 px-4 border-b text-left">
										{request.return.status === "pending-approval" ? (
											<div className="ml-4">Pending Return Approval</div>
										) : request.status === "pending" ? (
											<div>
												<button
													className="bg-green-500 hover:bg-green-600 text-white py-2 px-2 ml-2 rounded inline-block"
													onClick={() => handleApprove(request._id)}>
													Approve
												</button>
												<button
													className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 ml-2 rounded inline-block"
													onClick={() => handleReject(request._id)}>
													Reject
												</button>
											</div>
										) : (
											<div className="pl-16">{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</div>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
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
