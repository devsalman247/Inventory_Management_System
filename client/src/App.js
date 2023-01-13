import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Admin } from "./components/Admin";
import { AddEmployee } from "./components/AddEmployee";
import { UpdateEmployee } from "./components/UpdateEmployee";
import { AddItem } from "./components/AddItem";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const token = JSON.parse(localStorage.getItem("user"))?.token;

	useEffect(() => {
		if (token) {
			axios
				.get("http://localhost:5000/user/authenticate", {
					headers: { Authorization: `Token ${token}` },
				})
				.then((res) => {
					if (res.status === 200) {
						setIsLoggedIn(true);
						navigateTo("/admin");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	return (
		// main container
		<div className=" bg-[#F7F7F7] main_container  w-screen h-screen">
			<Router>
				<Routes>
					<Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} token={token} />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/admin"
						element={isLoggedIn ? <Admin setIsLoggedIn={setIsLoggedIn} token={token} /> : <Navigate to={"/"} />}
					/>
					<Route path="/add_employee" element={<AddEmployee />} />
					<Route path="/update_employee" element={<UpdateEmployee />} />
					<Route path="/add_item" element={<AddItem />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
