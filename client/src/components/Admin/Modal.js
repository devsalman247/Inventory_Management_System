import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import http from "../../api";
import noImage from "../../images/noImage.png";

function Modal({ setShowModal, users, userId }) {
	const [inputValue, setInputValue] = useState("");
	const [emailValue, setEmailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [designationValue, setDesignationValue] = useState("");
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

	const onCancle = () => {
		setShowModal(false);
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

	const updateEmployee = (e) => {
		e.preventDefault();
		http
			.put(`/user/${userId}`, {
				name: inputValue,
				email: emailValue,
				password: passwordValue,
				designation: designationValue,
			})
			.then((res) => {
				if (res.status === 200) {
					console.log(res.data.data);
					showMessage("User has been updated successfully!", "success");
				}
			})
			.catch((err) => {
				// if (err.response?.data?.message === "ValidationError: email: is already taken.") {
				//     showMessage("User already exists with same email address!", "error");
				// } else {
				showMessage("Failed to update user!", "error");
				// }
				console.log(err);
			});
	};

	useEffect(() => {
		const user = users.find((user) => user._id === userId);
		setInputValue(user.name);
		setEmailValue(user.email);
		setPasswordValue(user.password);
		setDesignationValue(user.designation);
		setSelectedImage(user.profileImage);
	}, [userId, users]);

	return (
		<div
			className="modal-overlay bg-slate-300 rounded-md w-[90%] sm:w-1/2 absolute left-5 sm:left-1/4 top-[82px] shadow-lg
        border-2 border-gray-300 transition-all duration-800 ease-in-out">
			<div className="modal-content">
				<form className="flex flex-col py-4">
					{/* Full Name */}
					<input
						type="text"
						placeholder="Enter Full Name"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						autoComplete="off"
						className="py-4 p-2 outline-none mt-12
                        focus:outline-slate-200
                        rounded-md
                        bg-white
                        ml-8
                        mr-8
                        "
					/>

					{/* Email */}
					<input
						type="email"
						placeholder="Enter Email"
						value={emailValue}
						onChange={(e) => setEmailValue(e.target.value)}
						autoComplete="off"
						className="py-4 p-2 outline-none mt-12
                        focus:outline-slate-200
                        rounded-md
                        bg-white
                        ml-8
                        mr-8"
					/>

					{/* Password */}
					<input
						type="password"
						placeholder="Enter Password"
						value={passwordValue}
						onChange={(e) => setPasswordValue(e.target.value)}
						autoComplete="off"
						className="py-4 p-2 outline-none mt-12
                        focus:outline-slate-200
                        rounded-md
                        bg-white
                        ml-8
                        mr-8
                        "
					/>

					{/* Designation */}
					<select
						name="designation"
						id="designation"
						value={designationValue}
						onChange={(e) => setDesignationValue(e.target.value)}
						className="py-4 p-2 outline-none mt-12
                        focus:outline-slate-200
                        rounded-md
                        bg-white
                        ml-8
                        mr-8">
						<option value="Professor">Professor</option>
						<option value="Assistant Professor">Assistant Professor</option>
						<option value="Lecturer">Lecturer</option>
					</select>
					<div className="px-8 py-2 pt-4">
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
					<button
						onClick={(e) => updateEmployee(e)}
						type="submit"
						className="py-4 p-2 outline-none mt-12 
                        rounded-md
                        ml-8
                        mr-8
                        bg-blue-400
                        transition-all duration-300 ease-in-out
                        text-white
						hover:opacity-75
                        ">
						Update
					</button>

					<div className="absolute top-0 right-0 mt-2 mr-4 cursor-pointer " onClick={onCancle}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Modal;
