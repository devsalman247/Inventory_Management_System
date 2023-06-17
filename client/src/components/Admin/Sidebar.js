import React, { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context_store";
export const Sidebar = () => {
	const navigate = useNavigate();
	const { isSidebarOpen, setIsSidebarOpen } = useContext(AuthContext);

	return (
		<>
			{/* Sidebar */}
			<div
				className={`md:flex absolute md:relative h-full sm:h-auto sm:flex-shrink-0 text-white justify-center pl-6 w-64 z-50 top-0 bg-[#34444C] ${
					isSidebarOpen ? "block" : "md:block hidden"
				}
				`}>
				<div className="pt-4 sm:hidden" onClick={() => setIsSidebarOpen(false)}>
					<RxCross1 className="w-5 h-5" />
				</div>
				<ul>
					<li
						className="mt-10 cursor-pointer"
						onClick={() => {
							navigate("/admin/dashboard");
							if (isSidebarOpen) setIsSidebarOpen(false);
						}}>
						{/* show all employees */}
						<i className="fas fa-users mr-4"></i>
						<span> All Users</span>
					</li>

					{/* Add employee */}
					<li
						className="mt-10 cursor-pointer"
						onClick={() => {
							navigate("/admin/add-employee");
							if (isSidebarOpen) setIsSidebarOpen(false);
						}}>
						<i className="fas fa-user-plus mr-4"></i>
						<span> Add User</span>
					</li>

					{/* Update User */}
					<li
						className="mt-10 cursor-pointer"
						onClick={() => {
							navigate("/admin/update-employee");
							if (isSidebarOpen) setIsSidebarOpen(false);
						}}>
						<i className="fas fa-user-edit mr-4"></i>
						<span> Update User</span>
					</li>

					{/* Delete User */}
					<li
						className="mt-10 cursor-pointer"
						onClick={() => {
							navigate("/admin/delete-employee");
							if (isSidebarOpen) setIsSidebarOpen(false);
						}}>
						<i className="fas fa-user-minus mr-4"></i>
						<span> Delete User</span>
					</li>

					{/* Store keeper */}
					<li
						className="mt-10 cursor-pointer"
						onClick={() => {
							navigate("/admin/store-keeper");
							if (isSidebarOpen) setIsSidebarOpen(false);
						}}>
						<i className="fas fa-user mr-4"></i>
						<span> Store Keeper</span>
					</li>
				</ul>
			</div>
		</>
	);
};
