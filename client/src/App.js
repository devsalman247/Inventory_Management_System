import Login from "./components/Login";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		// main container
		<div className=" bg-[#F7F7F7] main_container  w-screen h-screen">
			<Router>
				<Routes>
					<Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to={"/"} />} />
					<Route path="*" element={<Navigate to={"/admin"} />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
