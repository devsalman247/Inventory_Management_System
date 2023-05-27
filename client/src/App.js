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
} from "./components";

import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext, purgeAuth, setAuth } from "./context_store";
import http from "./api";

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loggedInUser, setLoggedInUser] = useState(null);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			http
				.get("/user/context")
				.then((res) => {
					setAuth(res.data.data, { setIsLoggedIn, setLoggedInUser });
					if (res.data.data?.role === "admin") {
						if (location.pathname === "/") {
							navigate("/admin");
						} else {
							navigate(location.pathname);
						}
					}
				})
				.catch((err) => purgeAuth({ setIsLoggedIn, setLoggedInUser }));
		}
	}, []);

	return (
		// main container
		<div className=" bg-[#F7F7F7] main_container  w-screen h-screen">
			<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser }}>
				<Routes>
					<Route path="/" element={<Login />} />

					{/* Admin Routes */}
					{loggedInUser && loggedInUser.role === "admin" && (
						<>
							<Route path="/admin/dashboard" element={<AdminDashboard />} />
							<Route path="/admin/manage_users" element={<ManageUsers />} />
							<Route path="/admin/requests" element={<Requests />} />
							<Route path="/admin/settings" element={<Settings />} />
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
						</>
					)}

					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
