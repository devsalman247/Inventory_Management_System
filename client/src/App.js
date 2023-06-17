import { useEffect, useState } from "react";
import {
	Login,
	AdminDashboard,
	ManageUsers,
	Requests,
	Settings,
	UserDashboard,
	Request,
	Store,
	Inventory,
	RequestsStore,
	AddEmployee,
	UpdateEmployee,
	DeleteEmployee,
	VendorDetails,
} from "./components";

import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext, purgeAuth, setAuth } from "./context_store";
import http from "./api";
import Storekeeper from "./components/Admin/Storekeeper";

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			http
				.get("/user/context")
				.then((res) => {
					setAuth(res.data.data, { setIsLoggedIn, setLoggedInUser });
					if (location.pathname === "/") {
						if (res.data.data.role === "admin") {
							navigate("/admin/dashboard");
						} else if (res.data.data.role === "store-keeper") {
							navigate("/store");
						} else if (res.data.data.role === "user") {
							navigate("/user/dashboard");
						}
					} else {
						if (location.pathname.includes("admin") && res.data.data.role === "admin") {
							navigate(location.pathname);
						} else if (location.pathname.includes("store") && res.data.data.role === "store-keeper") {
							navigate(location.pathname);
						} else if (location.pathname.includes("user") && res.data.data.role === "user") {
							navigate(location.pathname);
						} else {
							navigate("/");
						}
					}
				})
				.catch((err) => purgeAuth({ setIsLoggedIn, setLoggedInUser }));
		}
	}, []);

	return (
		// main container
		<div className="bg-[#F7F7F7] main_container min-h-screen w-screen flex flex-col">
			<AuthContext.Provider
				value={{ isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser, isSidebarOpen, setIsSidebarOpen }}>
				<Routes>
					<Route path="/" element={<Login />} />

					{/* Admin Routes */}
					{loggedInUser && loggedInUser.role === "admin" && (
						<>
							<Route path="/admin/dashboard" element={<AdminDashboard />} />
							<Route path="/admin/add-employee" element={<AddEmployee />} />
							<Route path="/admin/update-employee" element={<UpdateEmployee />} />
							<Route path="/admin/delete-employee" element={<DeleteEmployee />} />
							<Route path="/admin/store-keeper" element={<Storekeeper />} />
							{/* <Route path="/admin/requests" element={<Requests />} />
							<Route path="/admin/settings" element={<Settings />} /> */}
						</>
					)}

					{/* User Routes */}
					{loggedInUser && loggedInUser.role === "user" && (
						<>
							<Route path="/user/dashboard" element={<UserDashboard />} />
							<Route path="/user/request" element={<Request />} />
						</>
					)}

					{/* Store Keeper Routes */}
					{loggedInUser && loggedInUser.role === "store-keeper" && (
						<>
							<Route path="/store" element={<Store />} />
							<Route path="/store/inventory" element={<Inventory />} />
							<Route path="/store/requests" element={<RequestsStore />} />
							<Route path="/store/vendorDetails" element={<VendorDetails />} />
						</>
					)}

					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
