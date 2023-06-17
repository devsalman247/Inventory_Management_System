import React, { useContext } from "react";
import logo from "../../logo.png";
import admin from "../../images/admin.jpeg";
import { AuthContext, purgeAuth } from "../../context_store";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";

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
			<div className="flex items-center justify-between lg:py-2 lg:px-8 bg-[#00B4F4] shadow-md w-full">
				{/* left */}
				<div className="h-full flex items-center justify-center gap-4">
					<img src={logo} className="w-12 App-logo" alt="logo" />
					<h4>
						<span className="text-white text-xl">FCIT Inventory System</span>
					</h4>
				</div>

				<div className="flex items-center justify-center gap-4">
					<div className="flex items-center py-1 px-3 rounded hover:cursor-pointer">
						<img
							src={loggedInUser?.profileImage ? loggedInUser?.profileImage : admin}
							className="w-11 h-11 rounded-full"
							alt="admin"
						/>
						<div className="flex flex-col">
							<span className="text-white text-md ml-2">{loggedInUser?.name}</span>
							<span className="text-white text-md ml-2">{loggedInUser?.email}</span>
						</div>
					</div>
					<button className="text-2xl text-white outline-none" onClick={logout}>
						<IoLogOutOutline className="w-8 h-8" />
					</button>
				</div>
			</div>
		</>
	);
};
