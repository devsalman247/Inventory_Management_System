import React, { useState } from "react";
import Swal from "sweetalert2";
import http from "../../api";

const ItemModal = ({ setShowModal, item, getItems }) => {
	const [itemQuantity, setItemQuantity] = useState(0);

	const onCancle = () => {
		setShowModal(false);
	};

	const handleChange = (value) => {
		// const newValue = value.replace(/[^0-9]/g, '');
		const newValue = Math.abs(parseInt(value));
		setItemQuantity(newValue);
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

	const updateItem = (e) => {
		e.preventDefault();
		http
			.put(`/item/${item._id}`, {
				stock: itemQuantity,
			})
			.then((res) => {
				if (res.status === 200) {
					console.log(res.data.data);
					showMessage("Item has been updated successfully!", "success");
					getItems();
					setShowModal(false);
				}
			})
			.catch((err) => {
				// if (err.response?.data?.message === "ValidationError: email: is already taken.") {
				//     showMessage("User already exists with same email address!", "error");
				// } else {
				showMessage("Failed to update item!", "error");
				// }
				console.log(err);
			});
	};

	return (
		<div
			className="modal-overlay   bg-slate-300 rounded-md absolute left-72 top-[82px] shadow-lg
        border-2 border-gray-300
        transition-all duration-800 ease-in-out
        
        ">
			<div className="modal-content">
				<form className="w-[1020px] h-[550px] flex flex-col">
					{/* Item ID 
                    <input
                        type="number"
                        placeholder="Enter Item ID"
                        autoComplete="off"
                        className="py-4 p-2 outline-none mt-12
                        focus:outline-blue-400
                        rounded-md
                        bg-white
                        ml-8
                        mr-8
                        "
                    />

                    {/* Item name 
                    <input
                        type="text"
                        placeholder="Enter Item Name"
                        autoComplete="off"
                        className="py-4 p-2 outline-none mt-12
                        focus:outline-blue-400
                        rounded-md
                        bg-white
                        ml-8
                        mr-8
                        "
                    />
                    */}
					{/* Item ID */}
					<input
						type="number"
						value={itemQuantity}
						onChange={(e) => handleChange(e.target.value)}
						placeholder="Enter Item Quantity"
						autoComplete="off"
						className="py-4 p-2 outline-none mt-12
                        focus:outline-blue-400
                        rounded-md
                        bg-white
                        ml-8
                        mr-8
                        "
					/>

					<button
						type="submit"
						onClick={(e) => updateItem(e)}
						className="py-4 p-2 outline-none mt-12 
                        text-black 
                        border-2 border-blue-100
                        rounded-md
                        ml-8
                        mr-8
                        w-[200px] self-center
                        hover:bg-blue-400
                        transition-all duration-300 ease-in-out
                        hover:text-white
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
};

export default ItemModal;
