import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineManageHistory } from "react-icons/md";
import { AuthContext } from "../../context_store";
import { RxCross1 } from "react-icons/rx";

const Sidebar = () => {
	const navigate = useNavigate();
	const { isSidebarOpen, setIsSidebarOpen } = useContext(AuthContext);

	return (
		<div
			className={`w-64 absolute md:relative h-full sm:flex-grow sm:h-auto sm:flex-shrink-0 z-50 top-0 ${
				isSidebarOpen ? "block" : "md:block hidden"
			}`}>
			<div className="sidebar flex flex-col text-white items-start pl-4 h-full bg-[#34444C]">
				<div className="pt-4 md:hidden" onClick={() => setIsSidebarOpen(false)}>
					<RxCross1 className="w-5 h-5" />
				</div>
				<ul className={`sm:block flex flex-col`}>
					<li
						className="mt-10 cursor-pointer"
						onClick={() => {
							navigate("/store");
							if (isSidebarOpen) setIsSidebarOpen(false);
						}}>
						<i className="fas fa-boxes mr-4"></i>
						<span> Dashboard </span>
					</li>

					<li
						className="mt-10 cursor-pointer"
						onClick={() => {
							navigate("/store/Inventory");
							if (isSidebarOpen) setIsSidebarOpen(false);
						}}>
						<i className="fas fa-box-open mr-4"></i>
						<span>Inventory</span>
					</li>

					<li
						className="mt-10 cursor-pointer"
						onClick={() => {
							navigate("/store/Requests");
							if (isSidebarOpen) setIsSidebarOpen(false);
						}}>
						<MdOutlineManageHistory className="inline-block w-6 h-6 mr-2" />
						<span>Manage Requests</span>
					</li>

					<li
						className="mt-10 cursor-pointer"
						onClick={() => {
							navigate("/store/vendorDetails");
							if (isSidebarOpen) setIsSidebarOpen(false);
						}}>
						<i className="fas fa-box-open mr-4"></i>
						<span>Vendor Details</span>
					</li>

					{/* New Vendor*/}
					<li
						className="mt-10 cursor-pointer"
						onClick={() => {
							navigate("/store/createVendor");
							if (isSidebarOpen) setIsSidebarOpen(false);
						}}>
						<i className="fas fa-box-open mr-4"></i>
						<span>Create New Vendor</span>
					</li>

				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
