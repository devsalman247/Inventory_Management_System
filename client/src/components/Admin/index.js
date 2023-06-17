import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import http from "../../api";
import { AuthContext } from "../../context_store";

const Dashboard = () => {
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [designation, setDesignation] = useState("");
	const [users, setUsers] = useState([]);
	const { isSidebarOpen, setIsSidebarOpen } = useContext(AuthContext);

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
		const token = JSON.parse(localStorage.getItem("user"))?.token;
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
						<table className="bg-white shadow-md rounded-lg w-[80%]">
							<thead className="bg-[#00B4F4] text-white text-center">
								<tr className="text-left">
									<th className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4">Name</th>
									<th className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4">Designation</th>
									<th className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4">Email</th>
								</tr>
							</thead>
							<tbody>
								{users.length > 0 &&
									(filteredUsers.length === 0
										? users.map((user) => {
												return (
													<tr className="text-left" key={user.id}>
														<td className="px-4 py-3">{user.name}</td>
														<td className="px-4 py-3">{user.designation}</td>
														<td className="px-4 py-3">{user.email}</td>
													</tr>
												);
										  })
										: filteredUsers.map((user) => {
												return (
													<tr className="text-left" key={user.id}>
														<td className="px-4 py-3">{user.name}</td>
														<td className="px-4 py-3">{user.designation}</td>
														<td className="px-4 py-3">{user.email}</td>
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

export default Dashboard;
