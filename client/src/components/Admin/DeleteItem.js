import React from "react";
import { Sidebar } from "./Sidebar";
import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import Swal from "sweetalert2";
import http from "../../api";

const DeleteItem = () => {
	const [stock, setStock] = useState([]);

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

	const getItems = () => {
		http
			.get(`/item`)
			.then((res) => {
				if (res.status === 200) {
					// console.log(res.data.data)
					setStock(res.data.data);
				}
			})
			.catch((err) => console.log(err));
	};

	const deleteItem = (id) => {
		Swal.fire({
			title: `Are you sure to delete this item?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
		}).then((result) => {
			if (result.isConfirmed) {
				http
					.delete(`/item/${id}`)
					.then((res) => {
						if (res.status === 200) {
							showMessage("Item has been deleted successfully!", "success");
							getItems();
						}
					})
					.catch((err) => {
						showMessage("Failed to delete item!", "error");
						console.log(err);
					});
			}
		});
	};

	useEffect(() => {
		getItems();
	}, []);

	return (
		<div className="flex flex-col">
			<Navbar />
			<div className="flex flex-row">
				<Sidebar />

				{/* Display data in the form of table*/}
				<div className="main_table flex flex-col  mt-4 ml-12 ">
					<div className="main_top relative  mb-10 ">
						<h1 className=" mt-8  font-semibold text-xl">Delete Items</h1>
						<p className="">Dashboard</p>
					</div>

					<table className="w-[780px] bg-white shadow-md rounded-lg mr-40 ">
						<thead className="bg-[#00B4F4] w-[240px] text-white text-center ">
							<tr className="text-left">
								<th className="px-4 py-3">Item ID</th>
								<th className="px-4 py-3">Item Name</th>
								<th className="px-4 py-3">Item Quantity</th>
								<th className="px-4 py-3">Action</th>
							</tr>
						</thead>

						<tbody>
							{stock.map((item) => {
								return (
									<tr className="text-left">
										<td className="px-4 py-3" id="name">
											{parseInt(item.itemId.split("-")[1])}
										</td>
										<td className="px-4 py-3">
											{item.name === "Chair" ? <i className="fas fa-chair mr-4 text-2xl "></i> : null}
											{item.name === "Table" ? <i className="fas fa-table mr-4 text-2xl "></i> : null}
											{item.name === "PC" ? <i className="fas fa-desktop mr-4 text-2xl "></i> : null}
											{item.name === "Printer" ? <i className="fas fa-print mr-4 text-2xl "></i> : null}
											{item.name === "Sofa" ? <i className="fas fa-couch mr-4 text-2xl "></i> : null}
											{item.name}
										</td>
										<td className="px-4 py-3">{item.stock}</td>
										<td className="px-4 py-3">
											<button onClick={() => deleteItem(item._id)} className="hover:text-[#00B4F4]">
												Delete
												<i class=" pl-3 fa fa-solid fa-trash"></i>
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default DeleteItem;
