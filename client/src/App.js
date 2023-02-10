import { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
// <<<<<<< HEAD
// import { Admin } from "./components/Admin";
// import { AddEmployee } from "./components/AddEmployee";
// import { UpdateEmployee } from "./components/UpdateEmployee";
// import { DeleteEmployee } from "./components/DeleteEmployee";
// import { AddItem } from "./components/AddItem";
// import { AvailableStock } from "./components/AvailableStock";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// =======
import { Admin } from "./components/Admin/Admin";
import { AddEmployee } from "./components/Admin/AddEmployee";
import { UpdateEmployee } from "./components/Admin/UpdateEmployee";
import { DeleteEmployee } from "./components/Admin/DeleteEmployee";
import { AddItem } from "./components/Admin/AddItem";
import { AvailableStock } from "./components/Admin/AvailableStock";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// >>>>>>> ca28007e35a5d5fa36d494e212a234573ad65c95
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
        /*if setting null does not remove `Authorization` header then try     
				delete axios.defaults.headers.common['Authorization'];
				*/
      }
    })();
  }, []);

// <<<<<<< HEAD
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
						<Route path="/add_employee" element={<AddEmployee />} />
						<Route path="/update_employee" element={<UpdateEmployee />} />
						<Route path="/delete_employee" element={<DeleteEmployee />} />
						<Route path="/add_item" element={<AddItem />} />
						<Route path="/available_stock" element={<AvailableStock />} />
					</Routes>
				</Router>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
