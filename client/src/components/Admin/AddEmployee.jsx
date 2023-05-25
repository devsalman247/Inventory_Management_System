import React, { useRef } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import Swal from "sweetalert2";
import http from "../../api";

export const AddEmployee = () => {
	const employee = useRef({ name: "", email: "", password: "", designation: "Professor" });

	const showMessage = (message, type) => {
		Swal.fire({
			toast: true,
			icon: type,
			title: message,
			position: "bottom",
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener("mouseenter", Swal.stopTimer);
				toast.addEventListener("mouseleave", Swal.resumeTimer);
			},
		});
	};

	const changeEmployeeInfo = (e) => {
		if (e.target.type === "text") {
			employee.current.name = e.target.value;
		} else if (e.target.type === "email") {
			employee.current.email = e.target.value;
		} else if (e.target.type === "password") {
			employee.current.password = e.target.value;
		} else if (e.target.type === "select-one") {
			employee.current.designation = e.target.value;
		}
	};

	const addEmployee = (e) => {
		e.preventDefault();
		const { name, email, password, designation } = employee.current;
		if (!name || !email || !password || !designation) {
			showMessage("Please fill all required fields", "error");
			return;
		} else {
			http
				.post(`/user/add`, employee.current)
				.then((res) => {
					if (res.status === 200) {
						console.log(res.data.data);
						showMessage("User has been added successfully!", "success");
					}
				})
				.catch((err) => {
					if (err.response?.data?.message === "ValidationError: email: is already taken.") {
						showMessage("User already exists with same email address!", "error");
					} else {
						showMessage("Failed to add user!", "error");
					}
					console.log(err);
				});
		}
	};

	return (
		<div className="flex flex-col ">
			<Navbar />

			<div className="flex">
				<div>
					<Sidebar />
				</div>

				{/* Add Employee */}
				<div className="flex flex-col items-center justify-center w-full h-full">
					<form className=" flex flex-col mt-8 w-[1000px] h-[500px] bg-slate-200 rounded-md shadow-md">
						{/* first name */}
						<label htmlFor="firstname" className="w-full px-4 py-2 font-semibold ">
							Full Name
						</label>
						<input
							type="text"
							placeholder="Enter your name"
							onChange={(e) => changeEmployeeInfo(e)}
							className="px-2 py-2 mx-4 outline-none rounded-lg
							focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
							"
						/>

						{/* email */}
						<label htmlFor="email" className="w-full mt-4 px-4 py-2 font-semibold">
							Email
						</label>
						<input
							type="email"
							placeholder="Enter your mail"
							onChange={(e) => changeEmployeeInfo(e)}
							className="px-2 py-2 mx-4 outline-none rounded-lg 
														focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50

							"
						/>

						<label htmlFor="email" className="w-full mt-4 px-4 py-2 font-semibold">
							Password
						</label>
						<input
							type="password"
							placeholder="Set password"
							onChange={(e) => changeEmployeeInfo(e)}
							className="px-2 py-2 mx-4 outline-none rounded-lg 
														focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
"
						/>

						{/* address */}
						<label htmlFor="address" className="w-full mt-4 px-4 py-2 font-semibold">
							Designation
						</label>
						<select
							name="designation"
							id="designation"
							onChange={(e) => changeEmployeeInfo(e)}
							className="px-2 py-2 mx-4 outline-none rounded-lg ">
							<option value="Professor">Professor</option>
							<option value="Assistant Professor">Assistant Professor</option>
							<option value="Lecturer">Lecturer</option>
						</select>

						{/* Submit Button */}
						<button
							onClick={(e) => addEmployee(e)}
							className="w-1/4 px-4 py-2 mx-auto mt-12 text-white bg-slate-500 rounded-md shadow-md hover:bg-blue-600">
							Add Employee
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
