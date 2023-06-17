import React from "react";
import { useNavigate } from "react-router-dom";
export const Sidebar = () => {
	const navigate = useNavigate();
	return (
		<>
			{/* Sidebar */}
			<div className="flex text-white justify-center w-64 bg-[#34444C]">
				<ul>
					<li className="mt-10 cursor-pointer" onClick={() => navigate("/admin/dashboard")}>
						{/* show all employees */}
						<i className="fas fa-users mr-4"></i>
						<span> All Users</span>
					</li>

					{/* Add employee */}
					<li className="mt-10 cursor-pointer" onClick={() => navigate("/admin/add-employee")}>
						<i className="fas fa-user-plus mr-4"></i>
						<span> Add User</span>
					</li>

					{/* Update User */}
					<li className="mt-10 cursor-pointer" onClick={() => navigate("/admin/update-employee")}>
						<i className="fas fa-user-edit mr-4"></i>
						<span> Update User</span>
					</li>

					{/* Delete User */}
					<li className="mt-10 cursor-pointer" onClick={() => navigate("/admin/delete-employee")}>
						<i className="fas fa-user-minus mr-4"></i>
						<span> Delete User</span>
					</li>

					{/* Store keeper */}
					<li className="mt-10 cursor-pointer" onClick={() => navigate("/admin/store-keeper")}>
						<i className="fas fa-user mr-4"></i>
						<span> Store Keeper</span>
					</li>
				</ul>
			</div>
		</>
	);
};
