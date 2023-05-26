import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import Swal from "sweetalert2";
import http from "../../api";

const DeleteEmployee = () => {
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [designation, setDesignation] = useState("");
	const [users, setUsers] = useState([]);

	// get Checked filters
	const filterUsers = () => {
		const checkedFilters = [];
		const filters = document.querySelectorAll('input[type="checkbox"]');
		filters.forEach((filter) => {
			if (filter.checked) {
				checkedFilters.push(filter.value);
			}
		});
		// Now filter the data and set accordng to the checked boxes
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
			if (user.name.toLowerCase() === searchItem.toLowerCase() && user.designation === designation) {
				return user;
			}
		});
		filteredData.length > 0 ? setFilteredUsers(filteredData) : setFilteredUsers([]);
	};

	const fetchUsers = () => {
		http
			.get(`/user`)
			.then((res) => {
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

	return (
		<div className="w-full h-full bg-[#F7F7F7]">
			<Navbar />
			<div className="super_section flex ">
				<Sidebar />
				{/* Main Content */}
				<div className="main_content flex flex-col items-center ">
					<div className="main_top relative top-4 right-[385px] ">
						<h1 className=" mt-8  font-semibold text-xl">Delete Employee</h1>
						<p className="">Dashboard</p>
					</div>

					<div className="main_search flex relative top-4 right-[90px] mb-8 ">
						<input
							type="text"
							placeholder="Employee Name"
							className="py-4 p-2 outline-none mt-8"
							onChange={(e) => {
								setSearchItem(e.target.value);
							}}
						/>

						<select
							name="designation"
							id="designation"
							className="py-4 p-2 outline-none mt-8 ml-4 bg-white"
							onChange={(e) => {
								setDesignation(e.target.value);
							}}>
							<option value="Select">Designation</option>
							<option value="Professor">Professor</option>
							<option value="Assistant Professor">Assistant Professor</option>
							<option value="Lecturer">Lecturer</option>
						</select>

						<button className="bg-[#00B4F4] text-white py-4 px-32 mt-8 ml-4 rounded-lg" onClick={searchUser}>
							Search
						</button>
					</div>

					{/* Filters */}
					<div className="main_filter flex mt-8 relative mr-[520px] ">
						{/* Add Filters font awesome icon */}
						<i className="fas fa-filter text-[#00B4F4] text-2xl ml-12"></i>
						<div className="filter1 flex items-center">
							<input type="checkbox" className="ml-4" value={"Professor"} />
							<p className="ml-2">Professor</p>
						</div>

						<div className="filter2 flex items-center ml-8">
							<input type="checkbox" className="ml-4" value={"Assistant Professor"} />
							<p className="ml-2">Assistant Professor</p>
						</div>

						<div className="filter3 flex items-center ml-8">
							<input type="checkbox" className="ml-4" value={"Lecturer"} />
							<p className="ml-2">Lecturer</p>
						</div>
					</div>

					{/* button to get checked filters */}
					<button
						className="bg-[#00B4F4] absolute top-[265px] right-[460px] text-white py-2 px-4 mt-8 ml-12 rounded-lg"
						onClick={() => {
							filterUsers();
						}}>
						Apply
					</button>

					{/* Display data in the form of table*/}
					<div className="main_table flex flex-col  mt-8">
						<table className="w-[780px] bg-white shadow-md rounded-lg mr-40 ">
							<thead className="bg-[#00B4F4] w-[240px] text-white text-center ">
								<tr className="text-left">
									<th className="px-4 py-3">Name</th>
									<th className="px-4 py-3">Designation</th>
									<th className="px-4 py-3">Action</th>
								</tr>
							</thead>
							<tbody>
								{users.length > 0 &&
									(filteredUsers.length === 0
										? users.map((user) => {
												return (
													<tr className="text-left">
														<td className="px-4 py-3">{user.name}</td>
														<td className="px-4 py-3">{user.designation}</td>
														<td className="px-4 py-3">
															<button
																className="bg-[#00B4F4] text-white py-1 px-4 rounded-lg"
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
													<tr className="text-left">
														<td className="px-4 py-3">{user.name}</td>
														<td className="px-4 py-3">{user.designation}</td>
														<td className="px-4 py-3">
															<button
																className="bg-[#00B4F4] text-white py-1 px-4 rounded-lg"
																onClick={() => {
																	deleteUser(user._id);
																}}>
																Delete
															</button>
														</td>
													</tr>
												);
										  }))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteEmployee;
