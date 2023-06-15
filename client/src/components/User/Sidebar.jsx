import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Sidebar = () => {
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className="w-64 h-full">
			{/* Menu icon */}
			<div className="sm:hidden">
				<button className="text-white p-4 focus:outline-none" onClick={handleMenuToggle}>
					<FiMenu size={24} />
				</button>
			</div>

			{/* Sidebar */}
			<div
				className={`sidebar flex text-white justify-center w-full h-full bg-[#34444C] ${isMenuOpen ? "sm:w-64" : ""}`}>
				<ul className={`${isMenuOpen ? "block" : "hidden"} sm:block flex flex-col justify-center`}>
					<li
						className="mt-10 cursor-pointer"
						onClick={() => {
							navigate("/user/dashboard");
						}}>
						<i className="fas fa-boxes mr-4"></i>
						<span>Dashboard</span>
					</li>

					<li
						className="mt-10 cursor-pointer"
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
