import React, { useEffect, useState } from "react";
import { Navbar } from "../Admin/Navbar";
import Sidebar from "./Sidebar";
import jsPDF from "jspdf";
import ReactPaginate from "react-paginate";
import http from "../../api";

const Dashboard = () => {
	const [userRequests, setUserRequests] = useState({ pending: [], approved: [], rejected: [], requests: [] });
	const allocatedItems = [
		{
			id: 1,
			name: "Table",
			quantity: 5,
			status: "Approved",
			allocatedDate: "2023-05-24",
			returnDate: "2023-06-05",
		},
		{
			id: 2,
			name: "Chair",
			quantity: 10,
			status: "Pending",
			allocatedDate: "2023-05-25",
			returnDate: "2023-06-06",
		},
		{
			id: 3,
			name: "Board Marker",
			quantity: 3,
			status: "Rejected",
			allocatedDate: "2023-05-26",
			returnDate: "2023-06-07",
		},
		{
			id: 4,
			name: "Computer",
			quantity: 2,
			status: "Approved",
			allocatedDate: "2023-05-27",
			returnDate: "2023-06-08",
		},
		{
			id: 5,
			name: "Daster",
			quantity: 7,
			status: "Pending",
			allocatedDate: "2023-05-28",
			returnDate: "2023-06-09",
		},
		{
			id: 6,
			name: "Pen",
			quantity: 20,
			status: "Approved",
			allocatedDate: "2023-05-29",
			returnDate: "2023-06-10",
		},
		{
			id: 7,
			name: "Notebook",
			quantity: 15,
			status: "Rejected",
			allocatedDate: "2023-05-30",
			returnDate: "2023-06-11",
		},
		{
			id: 8,
			name: "Laptop",
			quantity: 3,
			status: "Pending",
			allocatedDate: "2023-05-31",
			returnDate: "2023-06-12",
		},
		{
			id: 9,
			name: "Whiteboard",
			quantity: 1,
			status: "Approved",
			allocatedDate: "2023-06-01",
			returnDate: "2023-06-13",
		},
		{
			id: 10,
			name: "Desk Lamp",
			quantity: 4,
			status: "Rejected",
			allocatedDate: "2023-06-02",
			returnDate: "2023-06-14",
		},
		{
			id: 11,
			name: "Scanner",
			quantity: 2,
			status: "Pending",
			allocatedDate: "2023-06-03",
			returnDate: "2023-06-15",
		},
		{
			id: 12,
			name: "Keyboard",
			quantity: 6,
			status: "Approved",
			allocatedDate: "2023-06-04",
			returnDate: "2023-06-16",
		},
	];

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
		allocatedItems.forEach((item) => {
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
	const totalPages = Math.ceil(allocatedItems.length / itemsPerPage);
	const [currentPage, setCurrentPage] = useState(0);
	const offset = currentPage * itemsPerPage;
	const currentItems = allocatedItems.slice(offset, offset + itemsPerPage);

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};

	const getUserRequest = () => {
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
		getUserRequest();
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<div className="flex flex-grow">
				<Sidebar />
				<div className="p-8 w-full">
					<div className="flex">
						<div className="flex flex-wrap mb-5 w-3/5">
							<div className="w-full flex gap-2">
								<div className="bg-white rounded shadow p-4 w-[10rem]">
									<div className="flex flex-col">
										<span className="text-sm text-gray-500">Requested</span>
										<span className="text-2xl font-semibold">
											{userRequests.approved.length + userRequests.pending.length + userRequests.rejected.length}
										</span>
									</div>
								</div>
								<div className="bg-white rounded shadow p-4 min-w-[10rem]">
									<div className="flex flex-col">
										<span className="text-sm text-gray-500">Approved</span>
										<span className="text-2xl font-semibold">{userRequests.approved.length}</span>
									</div>
								</div>
								<div className="bg-white rounded shadow p-4 min-w-[10rem]">
									<div className="flex flex-col">
										<span className="text-sm text-gray-500">Pending</span>
										<span className="text-2xl font-semibold">{userRequests.pending.length}</span>
									</div>
								</div>
								<div className="bg-white rounded shadow p-4 min-w-[10rem]">
									<div className="flex flex-col">
										<span className="text-sm text-gray-500">Rejected</span>
										<span className="text-2xl font-semibold">{userRequests.rejected.length}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
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
								<th className="py-2 px-4 border-b text-left">Item Name</th>
								<th className="py-2 px-4 border-b text-left">Item Quantity</th>
								<th className="py-2 px-4 border-b text-left">Request Status</th>
								<th className="py-2 px-4 border-b text-left">Allocated Date</th>
								<th className="py-2 px-4 border-b text-left">Return Date</th>
							</tr>
						</thead>
						<tbody>
							{userRequests.requests.map((request) => (
								<tr key={request.reqItem._id}>
									<td className="py-4 px-4 border-b text-center">{request.reqItem._id}</td>
									<td className="py-4 px-4 border-b text-left">{request.name}</td>
									<td className="py-4 px-4 border-b text-left">{request.quantity}</td>
									<td className={`py-4 px-4 border-b text-left ${getStatusColorClass(request.status)}`}>
										{request.status}
									</td>
									<td className="py-4 px-4 border-b text-left">{request.allocatedDate}</td>
									<td className="py-4 px-4 border-b text-left">
										<button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ml-2 rounded inline-block">
											Return
										</button>
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
