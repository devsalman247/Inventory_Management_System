import React, { useEffect, useState } from "react";
import { Navbar } from "../Admin/Navbar";
import Sidebar from "./Sidebar";
import jsPDF from "jspdf";
import ReactPaginate from "react-paginate";
import http from "../../api";
import Swal from "sweetalert2";

const Dashboard = () => {
	const [userRequests, setUserRequests] = useState({
		pending: [],
		approved: [],
		rejected: [],
		cancelled: [],
		requests: [],
	});
	const [selectedFilter, setSelectedFilter] = useState("requests");

	const getStatusColorClass = (status) => {
		switch (status) {
			case "Approved":
				return "text-green-600";
			case "Rejected":
				return "text-red-600";
			default:
				return "text-gray-600";
		}
	};

	const handleDownloadPDF = () => {
		const doc = new jsPDF();
		doc.setFontSize(18);
		doc.text("Inventory Report", 20, 20);

		let y = 50;
		userRequests.requests.forEach((item) => {
			const { id, name, quantity, status, allocatedDate, returnDate } = item;
			doc.setFontSize(8);
			doc.text(`Item ID: ${id}`, 30, y);
			doc.text(`Item Name: ${name}`, 60, y);
			doc.text(`Quantity: ${quantity}`, 90, y);
			doc.text(`Status: ${status}`, 120, y);
			doc.text(`Allocated Date: ${allocatedDate}`, 150, y);
			doc.text(`Return Date: ${returnDate}`, 180, y);
			y += 10;
		});

		doc.save("inventory_report.pdf");
	};

	const itemsPerPage = 5;
	const totalPages = Math.ceil(userRequests.requests.length / itemsPerPage);
	const [currentPage, setCurrentPage] = useState(0);
	const offset = currentPage * itemsPerPage;

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

	const returnItem = (reqId) => {
		http
			.post(`/item/return/${reqId}`)
			.then((res) => {
				Swal.fire({
					title: "Success!",
					text: "Successfully requested for return",
					icon: "success",
					confirmButtonText: "OK",
				});
				getUserRequests();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getUserRequests();
	}, []);

	return (
		<div className="flex flex-col h-full">
			<Navbar />
			<div className="flex h-full">
				<Sidebar />
				<div className="p-8 flex-grow">
					{/* <div> */}
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
										{userRequests.approved.length +
											userRequests.pending.length +
											userRequests.rejected.length +
											userRequests.cancelled.length}
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
							<div
								className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer ${
									selectedFilter === "cancelled" ? "border-2 border-blue-600" : ""
								}`}
								onClick={() => setSelectedFilter("cancelled")}>
								<div className="flex flex-col">
									<span className="text-sm text-gray-500">Cancelled</span>
									<span className="text-2xl font-semibold">{userRequests.cancelled.length}</span>
								</div>
							</div>
						</div>
					</div>
					{/* </div> */}
					<div className="flex justify-between mb-4">
						<h2 className="text-2xl font-semibold">All Items</h2>
						<div className="flex justify-end w-2/5">
							<button
								className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-block"
								onClick={handleDownloadPDF}>
								Download PDF
							</button>
						</div>
					</div>
					<table className="w-full bg-white border border-gray-300">
						{/* Table content... */}
						<thead>
							<tr className="bg-blue-500 text-white">
								<th className="py-2 px-4 border-b text-center">Item ID</th>
								<th className="py-2 px-4 border-b text-center">Item Name</th>
								<th className="py-2 px-4 border-b text-center">Item Quantity</th>
								<th className="py-2 px-4 border-b text-center">Requested Date</th>
								<th className="py-2 px-4 border-b text-center">Allocated Date</th>
								<th className="py-2 px-4 border-b text-center">Return Date</th>
								<th className="py-2 px-4 border-b text-center">Status</th>
							</tr>
						</thead>
						<tbody>
							{userRequests[selectedFilter].map((request) => (
								<tr key={request._id}>
									<td className="py-4 px-4 border-b text-center">{request.reqItem.itemId}</td>
									<td className="py-4 px-2 border-b text-center">{request.reqItem.name}</td>
									<td className="py-4 px-2 border-b text-center">{request.quantity}</td>
									<td className="py-4 px-4 border-b text-center">
										{new Date(request.requestDate).toISOString().substring(0, 10)}
									</td>
									<td className="py-4 px-4 border-b text-center">
										{request.approvedDate ? new Date(request.approvedDate).toISOString().substring(0, 10) : "N/A"}
									</td>
									<td className="py-4 px-4 border-b text-center">
										{request.return.returnedDate
											? new Date(request.return.returnedDate).toISOString().substring(0, 10)
											: "N/A"}
									</td>
									<td className={`py-4 px-2 border-b text-center ${getStatusColorClass(request.status)}`}>
										{request.return.status === "pending-approval" ? (
											<div className="ml-4">Pending Return Approval</div>
										) : (
											<div className="text-center">
												{request.status.charAt(0).toUpperCase() + request.status.slice(1)}
											</div>
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
