import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import http from "../../api";
import noImage from "../../images/noImage.png";
import Modal from "./Modal";
import Swal from "sweetalert2";

const Dashboard = () => {
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [designation, setDesignation] = useState("");
	const [users, setUsers] = useState([]);

	// code for user update
	const [userId, setUserId] = useState("");
	const [showModal, setShowModal] = useState(false);

	//code for user delete

	// get Checked filters
	const filterUsers = () => {
		const checkedFilters = [];
		const filters = document.querySelectorAll('input[type="checkbox"]');
		filters.forEach((filter) => {
			if (filter.checked) {
				checkedFilters.push(filter.value);
			}
		});
		// Now filter the data and set according to the checked boxes
		if (checkedFilters.length > 0) {
			const filteredData = users.filter((user) => checkedFilters.includes(user.designation));
			setFilteredUsers(filteredData);
		} else {
			setFilteredUsers([]);
		}
		return checkedFilters;
	};

	const searchUser = () => {
		const filteredData = users.filter((user) => {
			if (user.name.toLowerCase() === searchItem.toLowerCase() || user.designation === designation) {
				return user;
			}
		});
		filteredData.length > 0 ? setFilteredUsers(filteredData) : setFilteredUsers([]);
	};

	const fetchUsers = () => {
		http
			.get(`/user`)
			.then((res) => {
				console.log(res.data.data);
				if (res.status === 200) setUsers(res.data.data);
			})
			.catch((err) => console.log(err));
	};

	const showMessage = (message, type) => {
		Swal.fire({
			toast: true,
			icon: type,
			title: message,
			position: "bottom",
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener("mouseenter", Swal.stopTimer);
				toast.addEventListener("mouseleave", Swal.resumeTimer);
			},
		});
	};

	const deleteUser = (id) => {
		Swal.fire({
			title: `Are you sure to delete this user?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
		}).then((result) => {
			if (result.isConfirmed) {
				http
					.delete(`/user/${id}`)
					.then((res) => {
						if (res.status === 200) {
							showMessage("User has been deleted successfully!", "success");
							fetchUsers();
						}
					})
					.catch((err) => {
						showMessage("Failed to delete user!", "error");
						console.log(err);
					});
			}
		});
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const editUser = (e) => {
		e.preventDefault();
		setShowModal(true);
	};

	return (
		<div className="flex flex-col flex-grow relative">
			<Navbar />
			<div className="flex w-full sm:flex-grow h-full sm:h-auto">
				<Sidebar />
				<div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="my-8 sm:my-12 md:my-16 lg:my-12 lg:flex lg:justify-between">
						<div className="mb-2">
							<h1 className="text-xl font-semibold">Employees</h1>
							<p className="mt-2">Dashboard</p>
						</div>
						<div className="flex flex-col sm:flex-row">
							<input
								type="text"
								placeholder="Employee Name"
								className="py-4 px-6 outline-none mb-4 sm:mb-0 sm:mr-4 sm:max-w-xs md:w-64"
								onChange={(e) => {
									setSearchItem(e.target.value);
								}}
							/>

							<select
								name="designation"
								id="designation"
								className="py-4 px-6 outline-none bg-white"
								onChange={(e) => {
									setDesignation(e.target.value);
								}}>
								<option value="Select">Designation</option>
								<option value="Professor">Professor</option>
								<option value="Assistant Professor">Assistant Professor</option>
								<option value="Lecturer">Lecturer</option>
							</select>

							<button
								className="bg-[#00B4F4] text-white py-4 px-6 mt-4 sm:mt-0 sm:ml-4 rounded-lg"
								onClick={searchUser}>
								Search
							</button>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row sm:items-center mt-8 mb-4">
						{/* Add Filters font awesome icon */}
						<i className="fas fa-filter text-[#00B4F4] text-2xl ml-4"></i>
						<div className="flex items-center mt-4 sm:mt-0">
							<input type="checkbox" className="ml-4" value={"Professor"} />
							<p className="ml-2">Professor</p>
						</div>

						<div className="flex items-center mt-4 sm:mt-0 ml-0 sm:ml-8">
							<input type="checkbox" className="ml-4" value={"Assistant Professor"} />
							<p className="ml-2">Assistant Professor</p>
						</div>

						<div className="flex items-center mt-4 sm:mt-0 ml-0 sm:ml-8">
							<input type="checkbox" className="ml-4" value={"Lecturer"} />
							<p className="ml-2">Lecturer</p>
						</div>

						<button
							className="bg-[#00B4F4] text-white py-2 px-4 mb-4 mt-4 sm:ml-4
							md:ml-8
							rounded-lg self-start"
							onClick={() => {
								filterUsers();
							}}>
							Apply
						</button>
					</div>

					<div className="overflow-x-auto">
						<table className="bg-white shadow-md rounded-lg w-[80%] sm:w-[90%]">
							<thead className="bg-[#00B4F4] text-white text-center">
								<tr className="text-left">
									<th className="px-4 py-3 md:py-4">User</th>
									<th className="px-4 py-3 md:py-4">Designation</th>
									<th className="px-4 py-3 md:py-4">Email</th>
									<th className="px-4 py-3 md:py-4">Action</th>
								</tr>
							</thead>
							<tbody>
								{users.length > 0 &&
									(filteredUsers.length === 0
										? users.map((user) => {
												return (
													<tr className="text-left" key={user.id}>
														<td className="px-4 py-3 flex items-center gap-3">
															<div className="w-6 h-6 sm:w-8 sm:h-8 border border-gray-500 rounded-full overflow-hidden text-center">
																<img
																	src={user.profileImage ? user.profileImage : noImage}
																	alt=""
																	className="object-cover w-full h-full"
																/>
															</div>
															<div className="self-start">{user.name}</div>
														</td>
														<td className="px-4 py-3">{user.designation}</td>
														<td className="px-4 py-3">{user.email}</td>
														<td className="px-4 py-3">
															{/* Edit */}
															<button
																className="bg-[#00B4F4] text-white py-1 px-4 rounded-lg mr-4"
																onClick={(e) => {
																	editUser(e);
																	setUserId(user._id);
																}}>
																Update
															</button>
															<button
																className="bg-red-400 text-white py-1 px-4 rounded-lg
																hover:bg-red-700
																"
																onClick={() => {
																	deleteUser(user._id);
																}}>
																Delete
															</button>
														</td>
													</tr>
												);
										  })
										: filteredUsers.map((user) => {
												return (
													<tr className="text-left" key={user.id}>
														<td className="px-4 py-3 flex items-center gap-3">
															<div className="w-6 h-6 sm:w-8 sm:h-8 border border-gray-500 rounded-full overflow-hidden text-center">
																<img
																	src={user.profileImage ? user.profileImage : noImage}
																	alt=""
																	className="object-cover w-full h-full"
																/>
															</div>
															<div className="self-start">{user.name}</div>
														</td>
														<td className="px-4 py-3">{user.designation}</td>
														<td className="px-4 py-3">{user.email}</td>
													</tr>
												);
										  }))}
							</tbody>
						</table>
						{showModal && <Modal setShowModal={setShowModal} users={users} userId={userId} fetchUsers={fetchUsers} />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
