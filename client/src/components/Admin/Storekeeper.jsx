import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import http from "../../api";
import { environment } from "../../constants";
import Swal from "sweetalert2";

// import usericon from react icons
import { FaUserCircle } from "react-icons/fa";


const Storekeeper = () => {
	const [profile, setProfile] = useState({
		id: "",
		name: "",
		email: "",
		password: "",
		profileImage: "",
	});

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

	const handleProfileImageChange = (e) => {
		let file = e.target.files[0];
		let formData = new FormData();
		formData.append("file", file);

		http
			.post(environment.api_url + "/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((res) => {
				setProfile({ ...profile, profileImage: res.data.url });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleProfileUpdate = (e) => {
		e.preventDefault();
		http
			.put(`/user/${profile.id}`, profile)
			.then((res) => {
				showMessage("Profile updated successfully!", "success");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getStorekeeperProfile = () => {
		http
			.get(`/user?role=store-keeper`)
			.then((res) => {
				const { name, email, profileImage, _id } = res.data.data[0];
				setProfile({ ...profile, name, email, profileImage, id: _id });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getStorekeeperProfile();
	}, []);

	return (
		<div className="flex flex-col flex-grow">
			<Navbar />
			<div className="flex flex-grow">
				<Sidebar />
				<div className="flex flex-col items-center flex-grow mt-4">
					{/* Edit Storekeeper Profile */}
					<h2 className="text-2xl font-semibold mb-4">Edit Storekeeper Profile</h2>
					<form onSubmit={handleProfileUpdate}>
						<div className="mb-4">
							<label htmlFor="name" className="block text-sm font-medium text-gray-700">
								Name:
							</label>
							<input
								type="text"
								id="name"
								value={profile.name}
								onChange={(e) => setProfile({ ...profile, name: e.target.value })}
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email:
							</label>
							<input
								type="email"
								id="email"
								value={profile.email}
								onChange={(e) => setProfile({ ...profile, email: e.target.value })}
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password:
							</label>
							<input
								type="password"
								id="password"
								value={profile.password}
								onChange={(e) => setProfile({ ...profile, password: e.target.value })}
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
						<div className="mb-4">
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
								{profile.profileImage ? (
									<img src={profile.profileImage} alt="Profile Preview" className="rounded-full w-8 h-8 object-cover" />
								) : (
										<FaUserCircle className="rounded-full w-8 h-8 object-cover" />
								)}
							</div>
						</div>
						<button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
							Update Profile
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Storekeeper;
