import React, { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import axios from "axios";
import Swal from "sweetalert2";
const REACT_APP_SERVER_URL = "http://localhost:5000";

export const AddItem = () => {
    const [itemName, setItemName] = useState("")
    const [itemQuantity, setItemQuantity] = useState(0)

    const handleChange = (value) => {
        // const newValue = value.replace(/[^0-9]/g, '');
        const newValue = Math.abs(parseInt(value))
        setItemQuantity(newValue);
    }
    
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

    const addItem = (e) => {
        e.preventDefault();
		if (!itemName || itemQuantity === null || itemQuantity === undefined) {
			showMessage("Please fill all required fields", "error");
			return;
		} else {
			axios
				.post(`${REACT_APP_SERVER_URL}/item`, {name: itemName,stock: parseInt(itemQuantity), issued: []})
				.then((res) => {
					if (res.status === 200) {
						console.log(res.data.data);
						showMessage("Item has been added successfully!", "success");
					}
				})
				.catch((err) => {
					// if (err.response?.data?.message === "ValidationError: email: is already taken.") {
					// 	showMessage("User already exists with same email address!", "error");
					// } else {
						showMessage("Failed to add item!", "error");
					// }
					console.log(err);
				});
		}
    }

    return (
        <div className="flex flex-col ">
            <Navbar />

            <div className="flex">
                <div>
                    <Sidebar />
                </div>

                

                {/* Add Item */}
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="main_top relative left-[-430px] mb-1  ">
                        <h1 className=" mt-8  font-semibold text-xl">Avaiable Stock</h1>
                        <p className="">Dashboard</p>
                    </div>

                    <form className=" flex flex-col mt-8 w-[1000px] h-[330px] bg-slate-200 rounded-md shadow-md">
                        {/* item id */}
                        {/* <label htmlFor="itemID" className="w-full px-4 py-2 font-semibold ">
                            Item ID
                        </label>

                        <input
                            type="number"
                            placeholder="Enter item ID"
                            className="px-2 py-2 mx-4 mb-4 outline-none rounded-lg
							focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
							"
                        /> */}


                        {/* item name */}
                        <label htmlFor="itemName" className="w-full px-4 py-2 font-semibold ">
                            Item Name
                        </label>

                        <input
                            type="type"
                            placeholder="Enter item name"
                            onChange={(e) => setItemName(e.target.value)}
                            className="px-2 py-2 mx-4 outline-none rounded-lg
							focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 mb-4
							"
                        />

                        {/* item quantity */}
                        <label htmlFor="itemQuantity" className="w-full px-4 py-2 font-semibold ">
                            Item Quantity
                        </label>

                        <input
                            type="number"
                            min="0"
                            value={itemQuantity}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder="Enter item Quantity"
                            className="px-2 py-2 mx-4 outline-none rounded-lg
							focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                            mb-4
							"
                        />


                        {/* Submit Button */}
                        <button
                            onClick={(e) => addItem(e)}
                            className="w-1/4 px-4 py-2 mx-auto mt-12 text-white bg-slate-500 rounded-md shadow-md hover:bg-blue-600">
                            Add Item
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

}
