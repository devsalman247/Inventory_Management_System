import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import Modal from "./Modal";
import http from "../../api";
import noImage from "../../images/noImage.png";

const UpdateEmployee = () => {
	const [userId, setUserId] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [designation, setDesignation] = useState("");
	const [users, setUsers] = useState([]);
	const [showModal, setShowModal] = useState(false);




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
		const filteredData = users.filter((user) => user.name.toLowerCase().includes(searchItem.toLowerCase()));
		setFilteredUsers(filteredData);
		return filteredData;
	};

	const fetchUsers = () => {
		http
			.get(`/user`)
			.then((res) => {
				if (res.status === 200) setUsers(res.data.data);
			})
			.catch((err) => console.log(err));
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

				<div className="flex flex-col items-center w-full">
					<div className="flex justify-start flex-col md:flex-row md:justify-between w-full max-w-screen pl-8 pr-4 md:px-12">
						<div className="w-full">
							<h1 className="mt-8 font-semibold text-xl">Update Employees</h1>
							<p className="">Dashboard</p>
						</div>

						<div className="flex flex-col justify-start md:flex-row mb-8">
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
								className="py-4 p-2 outline-none mt-8 md:ml-4 bg-white"
								onChange={(e) => {
									setDesignation(e.target.value);
								}}>
								<option value="Select">Designation</option>
								<option value="Professor">Professor</option>
								<option value="Assistant Professor">Assistant Professor</option>
								<option value="Lecturer">Lecturer</option>
							</select>

							<button className="bg-[#00B4F4] text-white py-4 px-8 mt-8 md:ml-4 rounded-lg" onClick={searchUser}>
								Search
							</button>
						</div>
					</div>

					<div className="flex flex-col gap-2 items-start md:flex-row md:items-center mt-8 w-full pl-8 md:ml-0">
						{/* Add Filters font awesome icon */}
						<i className="fas fa-filter text-[#00B4F4] text-2xl ml-2 md:ml-12"></i>
						<div className="filter1 flex items-center">
							<input type="checkbox" className="ml-4" value={"Professor"} />
							<p className="ml-2">Professor</p>
						</div>

						<div className="flex items-center md:ml-8">
							<input type="checkbox" className="ml-4" value={"Assistant Professor"} />
							<p className="ml-2">Assistant Professor</p>
						</div>

						<div className="filter3 flex items-center md:ml-8">
							<input type="checkbox" className="ml-4" value={"Lecturer"} />
							<p className="ml-2">Lecturer</p>
						</div>
						<button
							className="bg-[#00B4F4] text-white py-2 px-4 ml-2 md:ml-12 rounded-lg"
							onClick={() => {
								filterUsers();
							}}>
							Apply
						</button>
					</div>

					{/* Display data in the form of table*/}
					<div className="flex flex-col mt-8 pl-8 pr-4 overflow-x-auto w-full md:pl-12">
						<table className="bg-white shadow-md rounded-lg w-[80%]">
							<thead className="bg-[#00B4F4] md:w-[240px] text-white text-center ">
								<tr className="text-left">
									<th className="px-4 py-3">User</th>
									<th className="px-4 py-3">Designation</th>
									<th className="px-4 py-3">Email</th>
									<th className="px-4 py-3">Action</th>
								</tr>
							</thead>
							<tbody>
								{users.length > 0 &&
									(filteredUsers.length === 0
										? users.map((user) => {
												return (
													<tr className="text-left" key={user._id}>
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
														</td>
													</tr>
												);
										  })
										: filteredUsers.map((user) => {
												return (
													<tr className="text-left" key={user._id}>
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
														<td className="px-4 py-3">{user.email}</td>
														<td className="px-4 py-3">{user.designation}</td>
														<td className="px-4 py-3">
															{/* Edit */}
															<button className="bg-[#00B4F4] text-white py-1 px-4 rounded-lg mr-4" onClick={editUser}>
																Update
															</button>
														</td>
													</tr>
												);
										  }))}
							</tbody>
						</table>
						{showModal && <Modal setShowModal={setShowModal} users={users} userId={userId} />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateEmployee;
