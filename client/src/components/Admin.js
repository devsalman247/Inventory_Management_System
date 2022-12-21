import React from "react";
import logo from "../logo.png";
import admin from "..//images/admin.jpg";

const Admin = () => {
	return (
		<div className="w-full h-full bg-[#F7F7F7]">
			{/* Navbar */}
			<div className="navbar flex items-center   w-full h-16 bg-[#00B4F4] shadow-md">
				{/* left */}
				<div className="w-1/4 h-full flex items-center justify-center ml-20">
					<img src={logo} className="w-12 App-logo" alt="logo" />
					<h4 className=" ml-8">
						<span className="text-white text-xl">FCIT Inventory System</span>
					</h4>
				</div>
				{/* center */}
				<div className="center ml-56">
					{/* search Icon */}
					<div className="search w-[400px] h-10 bg-slate-500 rounded-lg ">
						<input
							type="text"
							className="w-full h-full rounded-lg px-4 outline-none
                        text-slate-700 "
							placeholder="Search here"
						/>
						<i className="fas fa-search relative bottom-8 left-[360px] cursor-pointer text-slate-500 "></i>
					</div>
				</div>

				{/* right */}
				<div className="right flex items-center justify-center ml-8">
					<img src={admin} className="w-10 h-10 rounded-full ml-16" alt="admin" />
					<h4 className=" ml-3">
						<span className="text-white text-md">Admin</span>

						<select
							name="admin_options"
							id="admin_options"
							className="ml-4 text-white text-md outline-none bg-[#00B4F4]">
							<option value="Select">Select</option>
							<option value="profile">Profile</option>
							<option value="setting">Setting</option>
							<option value="logout">Logout</option>
						</select>
					</h4>
				</div>
			</div>

			<div className="super_section flex ">
				{/* Sidebar */}
				<div className="sidebar flex text-white justify-center w-56 h-[590px] bg-[#34444C]">
					<ul>
						<li className="mt-10 cursor-pointer">
							{/* show all employees */}
							<i className="fas fa-users mr-4"></i>
							<span>All Employees</span>
						</li>
						<li className="mt-10 cursor-pointer ">
							{/* Add New Employee */}
							<i className="fas fa-user-plus mr-4"></i>
							<span>Add New Employee</span>
						</li>
						<li className="mt-10 cursor-pointer ">
							{/* Update Employee */}
							<i className="fas fa-user-edit mr-4"></i>
							<span>Update Employee</span>
						</li>

						<li className="mt-10 cursor-pointer ">
							{/* Delete Employee */}
							<i className="fas fa-user-minus mr-4"></i>
							<span>Delete Employee</span>
						</li>

						{/* Add Item */}
						<li className="mt-10 cursor-pointer ">
							<i className="fas fa-plus mr-4"></i>
							<span>Add Item</span>
						</li>

						{/* Update Item */}
						<li className="mt-10 cursor-pointer ">
							<i className="fas fa-edit mr-4"></i>
							<span>Update Item</span>
						</li>

						{/* Delete Item */}
						<li className="mt-10 cursor-pointer ">
							<i className="fas fa-minus mr-4"></i>
							<span>Delete Item</span>
						</li>
					</ul>
				</div>

				{/* Main Content */}
				<div className="main_content flex flex-col items-center ">
					<div className="main_top relative right-80 ml-6">
						<h1 className=" mt-8  font-semibold text-xl">Employees</h1>
						<p className="">Dashboard</p>
					</div>

					<div className="main_search flex ml-12">
						<input type="text" placeholder="Employee Name" className="py-4 p-2 outline-none mt-8" />

						<select name="designation" id="designation" className="py-4 p-2 outline-none mt-8 ml-4">
							<option value="Select">Designation</option>
							<option value="Admin">Professor</option>
							<option value="Manager">Assistant Professor</option>
							<option value="Employee">Lecturer</option>
						</select>

						<button className="bg-[#00B4F4] text-white py-4 px-32 mt-8 ml-4 rounded-lg">Search</button>
					</div>

					{/* Display data in the form of table*/}
					<div className="main_table flex flex-col items-center mt-8 ml-4 ">
						<table className="w-[1000px] h-[30px] bg-white shadow-md rounded-lg">
							<thead className="bg-[#00B4F4] text-white text-center ">
								<tr className="text-left">
									<th className="p-4">Name</th>
									<th className="p-4">Designation</th>
									<th className="p-4">Email</th>
								</tr>
							</thead>
							<tbody>
								<tr className="text-left">
									<td className="p-4">Ahmad Shakeel</td>
									<td className="p-4">Professor</td>
									<td className="p-4">ahmad123@gmail.com</td>
								</tr>

								<tr className="text-left">
									<td className="p-4">Muhammad Salman</td>
									<td className="p-4">Lecturer</td>
									<td className="p-4">salman247@gmail.com</td>
								</tr>

								<tr className="text-left">
									<td className="p-4">Mansoor Ahmad</td>
									<td className="p-4">Assistant Professor</td>
									<td className="p-4">mansoor123@gmail.com</td>
								</tr>
								<tr className="text-left">
									<td className="p-4">Muhammad Idrees</td>
									<td className="p-4">Professor</td>
									<td className="p-4">idrees@pucit.edu.pk</td>
								</tr>
								<tr className="text-left">
									<td className="p-4">Ejaz Ashraf</td>
									<td className="p-4">Assistant Professor</td>
									<td className="p-4">ejaz@pucit.edu.com</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Admin;
