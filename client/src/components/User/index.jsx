import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../Admin/Navbar";
import Sidebar from "./Sidebar";
import ReactPaginate from "react-paginate";
import http from "../../api";
import Swal from "sweetalert2";
import { AuthContext } from "../../context_store";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Dashboard = () => {
	const { isSidebarOpen, setIsSidebarOpen } = useContext(AuthContext);

	const [userRequests, setUserRequests] = useState({
		pending: [],
		approved: [],
		rejected: [],
		cancelled: [],
		requests: [],
	});
	const [selectedFilter, setSelectedFilter] = useState("requests");
	const [selectedPdfFilter, setSelectedPdfFilter] = useState("requests");

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

	const Requests = [
		{
			reqItem: {
				itemId: '1',
				name: 'Item 1',
			},
			quantity: 10,
			status: 'Approved',
			approvedDate: '2023-06-18',
			returnData: {
				returnedDate: '2023-06-25',
			},
		},
		{
			reqItem: {
				itemId: '2',
				name: 'Item 2',
			},
			quantity: 5,
			status: 'Pending',
			approvedDate: null,
			returnData: null,
		},
		// Add more request objects as needed
	];

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

	const generatePDF = () => {
		// Create a new jsPDF instance
		const doc = new jsPDF();

		// Set the document title
		doc.setProperties({
			title: 'Request Log History',
		});

		// Add the "Inventory Management System" title
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(16);
		doc.text('Inventory Management System', 15, 15);

		// Define the table headers
		const headers = [
			'Item Name',
			'Item Quantity',
			'Requestor Name',
			'Request Date',
			'Issued Date',
			'Status',
		];

		// Get the selected requests
		const selectedRequests = userRequests[selectedPdfFilter];

		// Verify selectedRequests has valid data
		if (selectedRequests && selectedRequests.length > 0) {
			// Define the table rows
			const rows = selectedRequests.map((request) => [
				request.reqItem.name || '', // Item Name (fallback to empty string if undefined)
				request.quantity.toString() || '', // Item Quantity (fallback to empty string if undefined)
				request.requestedBy.name || '', // Requestor Name (fallback to empty string if undefined)
				request.requestDate ? (new Date(request.requestDate).toISOString().substring(0, 10)) : 'N/A', // Request Date (fallback to empty string if undefined)
				request.approvedDate ? (new Date(request.approvedDate).toISOString().substring(0, 10)) : 'N/A', // Issued Date (fallback to empty string if undefined)
				request.status || '', // Status (fallback to empty string if undefined)
			]);

			// Set the table column styles
			const columnStyles = {
				0: { cellWidth: 35 },
				1: { cellWidth: 25 },
				2: { cellWidth: 35 },
				3: { cellWidth: 35 },
				4: { cellWidth: 35 },
				5: { cellWidth: 25 },
			};

			// Add the table using AutoTable plugin
			autoTable(doc, {
				startY: 25, // Adjust the starting Y position for the table
				head: [headers],
				body: rows,
				theme: 'grid',
				headStyles: { fillColor: [52, 152, 219], textColor: 255 },
				alternateRowStyles: { fillColor: [220, 237, 200] },
				columnStyles: columnStyles,
				tableLineColor: [75, 179, 106], // Green border color
			});

			// Add the "Report Generated Date" at the top right corner
			const currentDate = new Date();
			const formattedDate = `Date: ${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
			const topMargin = 14;
			const rightMargin = 10;
			doc.setFont('helvetica', 'normal');
			doc.setFontSize(10);
			doc.text(formattedDate, doc.internal.pageSize.getWidth() - rightMargin, topMargin, {
				align: 'right',
			});
		}

		// Save the PDF document
		doc.save('request-log-history.pdf');
	};

	const handleFilterChange = (e) => {
		setSelectedPdfFilter(e.target.value);
	};

	useEffect(() => {
		getUserRequests();
	}, []);

	return (
		<div className="flex flex-col flex-grow w-full relative">
			<Navbar />
			<div className="flex w-full sm:flex-grow h-full sm:h-auto">
				<Sidebar />
				<div className="p-8 w-full">
					{/* <div> */}
					<div className="flex w-full mb-5 md:w-4/5">
						<div className="w-full flex flex-wrap gap-2">
							<div
								className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer min-w-[150px] ${
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
								className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer min-w-[150px] ${
									selectedFilter === "approved" ? "border-2 border-blue-600" : ""
								}`}
								onClick={() => setSelectedFilter("approved")}>
								<div className="flex flex-col">
									<span className="text-sm text-gray-500">Approved</span>
									<span className="text-2xl font-semibold">{userRequests.approved.length}</span>
								</div>
							</div>
							<div
								className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer min-w-[150px] ${
									selectedFilter === "pending" ? "border-2 border-blue-600" : ""
								}`}
								onClick={() => setSelectedFilter("pending")}>
								<div className="flex flex-col">
									<span className="text-sm text-gray-500">Pending</span>
									<span className="text-2xl font-semibold">{userRequests.pending.length}</span>
								</div>
							</div>
							<div
								className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer min-w-[150px] ${
									selectedFilter === "rejected" ? "border-2 border-blue-600" : ""
								}`}
								onClick={() => setSelectedFilter("rejected")}>
								<div className="flex flex-col">
									<span className="text-sm text-gray-500">Rejected</span>
									<span className="text-2xl font-semibold">{userRequests.rejected.length}</span>
								</div>
							</div>
							<div
								className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer min-w-[150px] ${
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
					<div className="mb-4 flex justify-end">
						<select
							className="px-2 sm:px-4 py-2 w-32 ml-2 sm:w-auto bg-blue-500 hover:bg-blue-700 text-white rounded-md border-r-[10px] border-blue-500 hover:border-blue-700"
							value={selectedPdfFilter}
							onChange={handleFilterChange}
						>
							<option value="requests">All Requests</option>
							<option value="approved">Approved</option>
							<option value="pending">Pending</option>
							<option value="rejected">Rejected</option>
							<option value="cancelled">Cancelled</option>
						</select>
						<button
							className="px-2 sm:px-4 py-2 w-32 ml-2 sm:w-auto bg-blue-500 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 "

							disabled={userRequests[selectedPdfFilter].length === 0}
							onClick={generatePDF}
						>
							Download PDF
						</button>
					</div>
					<div className="w-full overflow-x-auto">
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
