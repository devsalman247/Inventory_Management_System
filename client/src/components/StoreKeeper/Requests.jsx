import React, { useEffect, useState } from "react";
import { Navbar } from "../Admin/Navbar";
import Sidebar from "./Sidebar";
import ReactPaginate from "react-paginate";
import http from "../../api";
import Swal from "sweetalert2";

const Requests = () => {
	const [userRequests, setUserRequests] = useState({
		pending: [],
		approved: [],
		rejected: [],
		pendingApproval: [],
		requests: [],
	});
	const [selectedFilter, setSelectedFilter] = useState("pending");
	const [selectedRequests, setSelectedRequests] = useState([]);

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

	const handleSelectedRequests = (event, reqId) => {
		console.log(selectedRequests);
		if (event.target.checked) {
			setSelectedRequests([...selectedRequests, reqId]);
		} else {
			setSelectedRequests(selectedRequests.filter((id) => id !== reqId));
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

	const handleReject = (rejectAll) => {
		if (!rejectAll && selectedRequests.length === 0) {
			Swal.fire({
				title: "Error!",
				text: "Please select at least one request",
				icon: "error",
				confirmButtonText: "OK",
			});
			return;
		}
		http
			.put(`/item/requests/reject`, { ids: rejectAll ? userRequests.pending : selectedRequests })
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
		<div className="flex flex-col flex-grow">
			<Navbar />
			<div className="flex flex-grow">
				<Sidebar />
				<div className="w-full pl-12 pr-4 sm:pl-20 sm:pr-20">
					<div className="flex mt-8">
						<div className="flex flex-wrap mb-5 sm:w-4/5">
							<div className="w-full flex gap-2">
								<div
									className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer ${
										selectedFilter === "pending" ? "border-2 border-blue-600" : ""
									}`}
									onClick={() => setSelectedFilter("pending")}>
									<div className="flex flex-col">
										<span className="text-sm text-gray-500">Pending Approval</span>
										<span className="text-2xl font-semibold">{userRequests.pending.length}</span>
									</div>
								</div>
								<div
									className={`bg-white rounded shadow p-4 w-[10rem] cursor-pointer ${
										selectedFilter === "pendingApproval" ? "border-2 border-blue-600" : ""
									}`}
									onClick={() => setSelectedFilter("pendingApproval")}>
									<div className="flex flex-col">
										<span className="text-sm text-gray-500">Pending Return</span>
										<span className="text-2xl font-semibold">{userRequests.pendingApproval.length}</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="flex justify-end py-4">
						{selectedRequests.length > 0 && (
							<button
								className="px-2 sm:px-4 py-2 w-32  sm:w-auto mr-2 bg-red-500 hover:bg-red-700 text-white rounded-md"
								onClick={() => handleReject(false)}>
								Reject Requests
							</button>
						)}
						<button
							className="px-2 sm:px-4 py-2 w-32 sm:w-auto bg-red-500 hover:bg-red-700 text-white rounded-md"
							onClick={() => handleReject(true)}>
							Reject All Requests
						</button>
					</div>

					<div className="w-full overflow-x-auto">
						<table className="w-full bg-white border border-gray-300 text-left">
							<thead>
								<tr className="bg-blue-500 text-white">
									<th className="py-2 px-4 border-b text-center"></th>
									<th className="py-2 px-4 border-b text-center">Item ID</th>
									<th className="py-2 px-4 border-b text-left">Item Name</th>
									<th className="py-2 px-4 border-b text-left">Item Quantity</th>
									<th className="py-2 px-4 border-b text-left">Requester</th>
									<th className="py-2 px-4 border-b text-left">Requested Date</th>
									<th className="py-2 px-4 border-b text-left">Allocated Date</th>
									<th className="py-2 px-4 border-b text-left">Return Date</th>
									<th className="py-2 px-4 border-b text-left pl-20">Action</th>
								</tr>
							</thead>
							<tbody>
								{userRequests &&
									userRequests[selectedFilter].map((request) => (
										<tr key={request._id}>
											<td className="py-4 px-4 border-b text-center">
												<input
													id="default-checkbox"
													type="checkbox"
													value=""
													onChange={(e) => handleSelectedRequests(e, request._id)}
													className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
												/>
											</td>
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
												) : (
													<div className="pl-16">
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

export default Requests;
