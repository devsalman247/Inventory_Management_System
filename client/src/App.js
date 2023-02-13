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

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context_store";
import axios from "axios";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const token = JSON.parse(localStorage.getItem("user"))?.token;

	useEffect(() => {
		(function () {
			const token = JSON.parse(localStorage.getItem("user"))?.token;
			if (token) {
				axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			} else {
				axios.defaults.headers.common["Authorization"] = null;
			}
		})();
	}, []);

	return (
		// main container
		<div className=" bg-[#F7F7F7] main_container  w-screen h-screen">
			<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
				<Router>
					<Routes>
						<Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} token={token} />} />
						<Route path="/signup" element={<Signup />} />
						<Route
							path="/admin"
							element={isLoggedIn ? <Admin setIsLoggedIn={setIsLoggedIn} token={token} /> : <Navigate to={"/"} />}
						/>
						<Route
							path="/add_employee"
							element={isLoggedIn ? <AddEmployee setIsLoggedIn={setIsLoggedIn} token={token} /> : <Navigate to={"/"} />}
						/>
						<Route
							path="/update_employee"
							element={
								isLoggedIn ? <UpdateEmployee setIsLoggedIn={setIsLoggedIn} token={token} /> : <Navigate to={"/"} />
							}
						/>
						<Route
							path="/delete_employee"
							element={
								isLoggedIn ? <DeleteEmployee setIsLoggedIn={setIsLoggedIn} token={token} /> : <Navigate to={"/"} />
							}
						/>
						<Route
							path="/add_item"
							element={isLoggedIn ? <AddItem setIsLoggedIn={setIsLoggedIn} token={token} /> : <Navigate to={"/"} />}
						/>
						<Route
							path="/available_stock"
							element={
								isLoggedIn ? <AvailableStock setIsLoggedIn={setIsLoggedIn} token={token} /> : <Navigate to={"/"} />
							}
						/>
						<Route
							path="/update_item"
							element={isLoggedIn ? <UpdateItem setIsLoggedIn={setIsLoggedIn} token={token} /> : <Navigate to={"/"} />}
						/>
						<Route
							path="/delete_item"
							element={isLoggedIn ? <DeleteItem setIsLoggedIn={setIsLoggedIn} token={token} /> : <Navigate to={"/"} />}
						/>
						<Route
							path="/profile"
							element={isLoggedIn ? <Profile setIsLoggedIn={setIsLoggedIn} token={token} /> : <Navigate to={"/"} />}
						/>
						<Route
							path="/user"
							element={isLoggedIn ? <User setIsLoggedIn={setIsLoggedIn} token={token} /> : <Navigate to={"/"} />}
						/>
						<Route
							path="/all_items"
							element={isLoggedIn ? <AllItems setIsLoggedIn={setIsLoggedIn} token={token} /> : <Navigate to={"/"} />}
						/>
						<Route
							path="/send_request"
							element={isLoggedIn ? <SendRequest setIsLoggedIn={setIsLoggedIn} token={token} /> : <Navigate to={"/"} />}
						/>
						<Route
							path="/print_report"
							element={isLoggedIn ? <PrintReport setIsLoggedIn={setIsLoggedIn} token={token} /> : <Navigate to={"/"} />}
						/>
						<Route
							path="/assign_item"
							element={isLoggedIn ? <AssignItem setIsLoggedIn={setIsLoggedIn} token={token} /> : <Navigate to={"/"} />}
						/>
					</Routes>
				</Router>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
