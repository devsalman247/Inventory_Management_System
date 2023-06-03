import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="overflow-x-hidden">
            <div className="sidebar flex text-white justify-center w-64 h-[596px] bg-[#34444C]">
                <ul>
                    <li
                        className="mt-10 cursor-pointer"
                        onClick={() => {
                            navigate("/store");
                        }}
                    >
                        <i className="fas fa-boxes mr-4"></i>
                        <span> Dashboard </span>
                    </li>

                    <li
                        className="mt-10 cursor-pointer"
                        onClick={() => {
                            navigate("/store/Inventory");
                        }}
                    >
                        <i className="fas fa-box-open mr-4"></i>
                        <span>Inventory</span>
                    </li>

                    <li
                        className="mt-10 cursor-pointer"
                        onClick={() => {
                            navigate("/store/Requests");
                        }}
                    >
                        <i className="fas fa-box-open mr-4"></i>
                        <span>Requests</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
