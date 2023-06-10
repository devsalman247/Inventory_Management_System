import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
	const navigate = useNavigate();
	return (
		<div>
			<div className="sidebar flex text-white justify-center w-64 h-[590px] bg-[#34444C]">
				<ul>
					<li
						className="mt-10 cursor-pointer"
						onClick={() => {
							navigate("/user/dashboard");
						}}>
						<i className="fas fa-boxes mr-4"></i>
						<span> Dashboard </span>
					</li>

					<li
						className="mt-10 cursor-pointer "
						onClick={() => {
							navigate("/user/request");
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