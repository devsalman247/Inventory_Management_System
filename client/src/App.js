import Login from "./components/Login";
import Signup from "./components/Signup";
import { Admin } from "./components/Admin";
import { AddEmployee } from "./components/AddEmployee";
import { UpdateEmployee } from "./components/UpdateEmployee";
import { AddItem } from "./components/AddItem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  
  return (
    // main container
    <div className=" bg-[#F7F7F7] main_container  w-screen h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add_employee" element={<AddEmployee />} />
          <Route path="/update_employee" element={<UpdateEmployee />} />
          <Route path="/add_item" element = {<AddItem />} />
        </Routes>
      </Router>
    </div>      
  );
}

export default App;
