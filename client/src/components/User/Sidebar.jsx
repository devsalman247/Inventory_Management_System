import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AuthContext } from "../../context_store";
import { RxCross1 } from "react-icons/rx";

const Sidebar = () => {
	const navigate = useNavigate();
	const { isSidebarOpen, setIsSidebarOpen } = useContext(AuthContext);

	return (
		<div className={`w-64 absolute h-full z-50 top-0 ${isSidebarOpen ? "block" : "hidden"}`}>
			{/* Sidebar */}
			<div className={`sidebar flex flex-col text-white items-start w-full h-full pl-4 bg-[#34444C]`}>
				<div className="pt-4" onClick={() => setIsSidebarOpen(false)}>
					<RxCross1 className="w-5 h-5" />
				</div>
				<ul className={`sm:block flex flex-col`}>
					<li
						className="mt-10 cursor-pointer"
						onClick={() => {
							navigate("/user/dashboard");
							if (isSidebarOpen) setIsSidebarOpen(false);
						}}>
						<i className="fas fa-boxes mr-4"></i>
						<span>Dashboard</span>
					</li>

					<li
						className="mt-10 cursor-pointer"
						onClick={() => {
							navigate("/user/request");
							if (isSidebarOpen) setIsSidebarOpen(false);
						}}>
						<i className="fas fa-box-open mr-4"></i>
						<span>Request Item</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
