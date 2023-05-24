import { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { Admin } from "./components/Admin/Admin";
import { AddEmployee } from "./components/Admin/AddEmployee";
import { UpdateEmployee } from "./components/Admin/UpdateEmployee";
import { DeleteEmployee } from "./components/Admin/DeleteEmployee";
import { AddItem } from "./components/Admin/AddItem";
import { AvailableStock } from "./components/Admin/AvailableStock";
import { UpdateItem } from "./components/Admin/UpdateItem";
import DeleteItem from "./components/Admin/DeleteItem";
import Profile from "./components/Admin/Profile";
import User from "./components/User/User";
import AllItems from "./components/User/AllItems";
import SendRequest from "./components/User/SendRequest";
import PrintReport from "./components/User/PrintReport";
import AssignItem from "./components/Admin/AssignItem";

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
					// if (res.data.data?.role === "admin") {
					// 	console.log(location.pathname);
					// 	if (location.pathname === "/") {
					// 		navigate("/admin/drops");
					// 	} else {
					// 		navigate(location.pathname);
					// 	}
					// }
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
					<Route path="/signup" element={<Signup />} />
					{/* Admin Routes */}
					{loggedInUser && loggedInUser.role === "admin" && (
						<>
							<Route path="/admin" element={<Admin />} />
							<Route path="/add_employee" element={<AddEmployee />} />
							<Route path="/update_employee" element={<UpdateEmployee />} />
							<Route path="/delete_employee" element={<DeleteEmployee />} />
						</>
					)}
					<Route path="/add_item" element={<AddItem />} />
					<Route path="/available_stock" element={<AvailableStock />} />
					<Route path="/update_item" element={<UpdateItem />} />
					<Route path="/delete_item" element={<DeleteItem />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/user" element={<User />} />
					<Route path="/all_items" element={<AllItems />} />
					<Route path="/send_request" element={<SendRequest />} />
					<Route path="/print_report" element={<PrintReport />} />
					<Route path="/assign_item" element={<AssignItem />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
