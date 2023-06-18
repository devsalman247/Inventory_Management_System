import React, { useRef, useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import Swal from "sweetalert2";
import http from "../../api";
import noImage from "../../images/noImage.png";

const AddEmployee = () => {
	const employee = useRef({ name: "", email: "", password: "", designation: "Professor" });
	const [selectedImage, setSelectedImage] = useState(null);

	const handleProfileImageChange = (e) => {
		let file = e.target.files[0];
		let formData = new FormData();
		formData.append("file", file);

		http
			.post("/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((res) => {
				setSelectedImage(res.data.url);
			})
			.catch((err) => {
				console.log(err);
			});
	};

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
				.post(`/user/add`, { ...employee.current, profileImage: selectedImage })
				.then((res) => {
					if (res.status === 200) {
						console.log(res.data.data);
						showMessage("User has been added successfully!", "success");
					}
				})
				.catch((err) => {
					if (err.response?.data?.message === "ValidationError: email: is already taken.") {
						showMessage("User already exists with the same email address!", "error");
					} else {
						showMessage("Failed to add a user!", "error");
					}
					console.log(err);
				});
		}
	};
	return (
		<div className="flex flex-col flex-grow relative">
			<Navbar />
			<div className="flex w-full sm:flex-grow h-full sm:h-auto">
				<Sidebar />

				{/* Add Employee */}
				<div className="flex justify-center flex-grow px-4 py-4">
					<form
						className="flex flex-col self-start mt-8 px-4 py-4 lg:px-8 lg:py-6 w-full bg-slate-200 rounded-md shadow-md
        sm:w-3/4 md:w-3/4 lg:w-[750px]">
						{/* Full Name */}
						<label htmlFor="firstname" className="w-full px-4 pb-2 font-semibold">
							Full Name
						</label>
						<input
							type="text"
							placeholder="Enter your name"
							onChange={(e) => changeEmployeeInfo(e)}
							className="px-2 py-2 mx-4 my-2 outline-none rounded-lg focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
						/>

						{/* Email */}
						<label htmlFor="email" className="w-full px-4 py-2 font-semibold">
							Email
						</label>
						<input
							type="email"
							placeholder="Enter your email"
							onChange={(e) => changeEmployeeInfo(e)}
							className="px-2 py-2 mx-4 my-2 outline-none rounded-lg focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
						/>

						{/* Password */}
						<label htmlFor="password" className="w-full px-4 py-2 font-semibold">
							Password
						</label>
						<input
							type="password"
							placeholder="Set password"
							onChange={(e) => changeEmployeeInfo(e)}
							className="px-2 py-2 mx-4 my-2 outline-none rounded-lg focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
						/>

						{/* Designation */}
						<label htmlFor="designation" className="w-full px-4 py-2 font-semibold">
							Designation
						</label>
						<select
							name="designation"
							id="designation"
							onChange={(e) => changeEmployeeInfo(e)}
							className="px-2 py-2 mx-4 my-2 outline-none rounded-lg focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
							<option value="Professor">Professor</option>
							<option value="Assistant Professor">Assistant Professor</option>
							<option value="Lecturer">Lecturer</option>
						</select>

						<div className="px-4 py-2">
							<label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
								Profile Image:
							</label>
							<div className="flex items-center">
								<input
									type="file"
									id="profileImage"
									accept="image/*"
									onChange={handleProfileImageChange}
									className="mt-1 mr-2"
								/>
								{selectedImage ? (
									<img src={selectedImage} alt="Profile Preview" className="rounded-full w-12 h-12 object-cover" />
								) : (
									<img
										src={noImage} // Replace with your default user icon or any other image URL
										alt="Default User Icon"
										className="rounded-full w-12 h-12 object-cover border border-gray-500"
									/>
								)}
							</div>
						</div>

						{/* Submit Button */}
						<button
							onClick={(e) => addEmployee(e)}
							className="w-1/2 px-4 py-2 mx-auto mt-8 text-white bg-slate-500 rounded-md shadow-md hover:bg-blue-600">
							Add Employee
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddEmployee;
