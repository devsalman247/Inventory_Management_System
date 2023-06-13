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
			<div className="navbar flex items-center justify-between w-screen h-16 bg-[#00B4F4] shadow-md px-16">
				{/* left */}
				<div className="w-1/4 h-full flex items-center justify-center">
					<img src={logo} className="w-12 App-logo" alt="logo" />
					<h4 className=" ml-8">
						<span className="text-white text-xl">FCIT Inventory System</span>
					</h4>
				</div>
				{/* center */}
				{/* <div className="center ml-56"> */}
				{/* search Icon */}
				{/* <div className="search w-[400px] h-10 bg-slate-500 rounded-lg ">
						<input
							type="text"
							className="w-full h-full rounded-lg px-4 outline-none
                        text-slate-700 "
							placeholder="Search here"
						/>
						<i className="fas fa-search relative bottom-8 left-[360px] cursor-pointer text-slate-500 "></i>
					</div>
				</div> */}

				{/* right */}
				<div className="right flex items-center justify-center gap-4">
					<div className="flex items-center py-1 px-3 rounded hover:cursor-pointer">
						<img src={admin} className="w-11 h-11 rounded-full" alt="admin" />
						<div className="flex flex-col">
							<span className="text-white text-md ml-2">{loggedInUser?.name}</span>
							<span className="text-white text-md ml-2">{loggedInUser?.email}</span>
						</div>
					</div>
					<button className="text-2xl text-white" onClick={logout}>
						<IoLogOutOutline className="w-8 h-8" />
					</button>
				</div>
			</div>
		</>
	);
};
