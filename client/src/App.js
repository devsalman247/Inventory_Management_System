import Login from "./components/Login";
import Signup from "./components/Signup";
import { Admin } from "./components/Admin";
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
        </Routes>
      </Router>
    </div>      
  );
}

export default App;
