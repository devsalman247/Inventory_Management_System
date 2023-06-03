import React, { useState } from "react";
import { Navbar } from "../Admin/Navbar";
import Sidebar from "./Sidebar";
import data from "./data.json";
import ReactPaginate from "react-paginate";

const Dashboard = () => {
	const [userRequests, setUserRequests] = useState(data);
	const [selectedFilter, setSelectedFilter] = useState("requests");

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
									className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer ${selectedFilter === "requests"
										? "border-2 border-blue-600"
										: ""
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
									className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer ${selectedFilter === "approved"
										? "border-2 border-blue-600"
										: ""
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
									className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer ${selectedFilter === "pending"
										? "border-2 border-blue-600"
										: ""
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
									className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer ${selectedFilter === "rejected"
										? "border-2 border-blue-600"
										: ""
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
					</div>

					<table className="w-full bg-white border border-gray-300 ml-20 text-left">
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
									<td className="py-4 px-4 border-b text-left">{request.reqItem.itemId}</td>
									<td className="py-4 px-2 border-b text-left pl-6">{request.reqItem.name}</td>
									<td className="py-4 px-2 border-b text-left pl-12">{request.quantity}</td>
									<td className="py-4 px-2 border-b  pl-4">{request.requesterName}</td>
									{selectedFilter === "requests" && (
										<td>
											<div>
												<button
													className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 ml-2 rounded inline-block"
													onClick={() => handleApprove(request._id)}
												>
													Approve
												</button>
												<button
													className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 ml-2 rounded inline-block"
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
