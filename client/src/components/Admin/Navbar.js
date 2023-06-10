import React, { useContext } from "react";
import logo from "../../logo.png";
import admin from "../../images/admin.jpeg";
import { AuthContext, purgeAuth } from "../../context_store";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export const Navbar = () => {
	let navigate = useNavigate();
	const { setIsLoggedIn, loggedInUser, setLoggedInUser } = useContext(AuthContext);

	const logout = () => {
		purgeAuth({ setIsLoggedIn, setLoggedInUser });
		navigate("/");
	};

	return (
		<>
			{/* Navbar */}
			<div className="navbar flex items-center w-screen h-16 bg-[#00B4F4] shadow-md relative">
				{/* left */}
				<div className="w-1/4 h-full flex items-center justify-center ml-12">
					<img src={logo} className="w-12 App-logo" alt="logo" />
					<h4 className="ml-8 hidden sm:block">
						<span className="text-white text-xl">FCIT Inventory System</span>
					</h4>
				</div>

				{/* right */}
				<div className="right flex items-center justify-center absolute right-6">
					<div className="flex items-center py-1 px-3 rounded hover:cursor-pointer bg-sky-600">
						<img src={admin} className="w-11 h-11 rounded-full" alt="admin" />
						<div className="flex flex-col">
							<span className="text-white text-md ml-2 hidden sm:block">
								{loggedInUser?.name}
							</span>
							<span className="text-white text-md ml-2">
								{loggedInUser?.email}
							</span>
						</div>
					</div>
					<button
						className="text-3xl text-white ml-12"
						onClick={logout}
						title="Logout"
					>
						<FiLogOut />
					</button>
				</div>
			</div>
		</>
	);
};
