import React, { useState } from "react";
import { Navbar } from "../Admin/Navbar";
import Sidebar from "./Sidebar";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const VendorDetails = () => {
	const [vendorName, setVendorName] = useState("");
	// Sample vendor details data
	const [vendorDetailsData, setVendorDetailsData] = useState([
		{
			id: 1,
			vendorName: "Vendor A",
			itemName: "Item 1",
			itemQuantity: 5,
			totalPrice: 100,
			issuedDate: "2023-06-15",
			returnDate: "2023-06-20",
		},
		{
			id: 2,
			vendorName: "Vendor B",
			itemName: "Item 2",
			itemQuantity: 3,
			totalPrice: 75,
			issuedDate: "2023-06-12",
			returnDate: "2023-06-18",
		},
		// Add more vendor details objects as needed
	]);

	// State for controlling the edit modal
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedVendorDetail, setSelectedVendorDetail] = useState(null);

	// Function to open the edit modal
	const openEditModal = (vendorDetail) => {
		setSelectedVendorDetail(vendorDetail);
		setIsEditModalOpen(true);
	};

	// Function to close the edit modal
	const closeEditModal = () => {
		setSelectedVendorDetail(null);
		setIsEditModalOpen(false);
	};

	// Function to handle editing a vendor detail
	const handleEditVendorDetail = (updatedVendorDetail) => {
		const updatedVendorDetails = vendorDetailsData.map((vendorDetail) => {
			if (vendorDetail.id === updatedVendorDetail.id) {
				return {
					...vendorDetail,
					...updatedVendorDetail,
				};
			}
			return vendorDetail;
		});
		setVendorDetailsData(updatedVendorDetails);
		closeEditModal();
	};

	// Function to delete a vendor detail
	const deleteVendorDetail = (id) => {
		const updatedVendorDetails = vendorDetailsData.filter((vendorDetail) => vendorDetail.id !== id);
		setVendorDetailsData(updatedVendorDetails);
	};

	const vendor = {
		"items": [
			{
				"Vendor": "John Doe",
				"itemName": "Item 1",
				"itemQuantity": 5,
				"totalPrice": 50,
				"issuedDate": "2023-06-01",
				"returnDate": "2023-06-10"
			},
			{
				"Vendor": "Jane Smith",
				"itemName": "Item 2",
				"itemQuantity": 3,
				"totalPrice": 30,
				"issuedDate": "2023-06-02",
				"returnDate": "2023-06-09"
			},
			{
				"Vendor": "Michael Johnson",
				"itemName": "Item 3",
				"itemQuantity": 2,
				"totalPrice": 20,
				"issuedDate": "2023-06-03",
				"returnDate": "2023-06-08"
			},
			{
				"Vendor": "Emily Brown",
				"itemName": "Item 4",
				"itemQuantity": 4,
				"totalPrice": 40,
				"issuedDate": "2023-06-04",
				"returnDate": "2023-06-07"
			},
			{
				"Vendor": "Daniel Wilson",
				"itemName": "Item 5",
				"itemQuantity": 6,
				"totalPrice": 60,
				"issuedDate": "2023-06-05",
				"returnDate": "2023-06-06"
			},
			{
				"Vendor": "Olivia Anderson",
				"itemName": "Item 6",
				"itemQuantity": 3,
				"totalPrice": 30,
				"issuedDate": "2023-06-06",
				"returnDate": "2023-06-05"
			},
			{
				"Vendor": "James Taylor",
				"itemName": "Item 7",
				"itemQuantity": 2,
				"totalPrice": 20,
				"issuedDate": "2023-06-07",
				"returnDate": "2023-06-04"
			},
			{
				"Vendor": "Sophia Martinez",
				"itemName": "Item 8",
				"itemQuantity": 3,
				"totalPrice": 30,
				"issuedDate": "2023-06-08",
				"returnDate": "2023-06-03"
			},
			{
				"Vendor": "David Johnson",
				"itemName": "Item 9",
				"itemQuantity": 4,
				"totalPrice": 40,
				"issuedDate": "2023-06-09",
				"returnDate": "2023-06-02"
			},
			{
				"Vendor": "Ava Thompson",
				"itemName": "Item 10",
				"itemQuantity": 5,
				"totalPrice": 50,
				"issuedDate": "2023-06-10",
				"returnDate": "2023-06-01"
			}
		]
	};

	const generatePDF = () => {
		// Create a new jsPDF instance
		const doc = new jsPDF();

		// Set the document title
		doc.setProperties({
			title: 'Vendors Log History',
		});

		// Add the "Inventory Management System" title
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(16);
		doc.text('Inventory Management System', 15, 15);

		// Define the table headers
		const headers = [
			'Vendor',
			'Item Name',
			'Item Quantity',
			'Total Price',
			'Issued Date',
			'Return Date',
		];

		// Get the items data
		const items = [
			{
				"Vendor": "John Doe",
				"itemName": "Item 1",
				"itemQuantity": 5,
				"totalPrice": 50,
				"issuedDate": "2023-06-01",
				"returnDate": "2023-06-10"
			},
			{
				"Vendor": "Jane Smith",
				"itemName": "Item 2",
				"itemQuantity": 3,
				"totalPrice": 30,
				"issuedDate": "2023-06-02",
				"returnDate": "2023-06-09"
			},
			{
				"Vendor": "Michael Johnson",
				"itemName": "Item 3",
				"itemQuantity": 2,
				"totalPrice": 20,
				"issuedDate": "2023-06-03",
				"returnDate": "2023-06-08"
			},
			{
				"Vendor": "Emily Brown",
				"itemName": "Item 4",
				"itemQuantity": 4,
				"totalPrice": 40,
				"issuedDate": "2023-06-04",
				"returnDate": "2023-06-07"
			},
			{
				"Vendor": "Daniel Wilson",
				"itemName": "Item 5",
				"itemQuantity": 6,
				"totalPrice": 60,
				"issuedDate": "2023-06-05",
				"returnDate": "2023-06-06"
			},
			{
				"Vendor": "Olivia Anderson",
				"itemName": "Item 6",
				"itemQuantity": 3,
				"totalPrice": 30,
				"issuedDate": "2023-06-06",
				"returnDate": "2023-06-05"
			},
			{
				"Vendor": "James Taylor",
				"itemName": "Item 7",
				"itemQuantity": 2,
				"totalPrice": 20,
				"issuedDate": "2023-06-07",
				"returnDate": "2023-06-04"
			},
			{
				"Vendor": "Sophia Martinez",
				"itemName": "Item 8",
				"itemQuantity": 3,
				"totalPrice": 30,
				"issuedDate": "2023-06-08",
				"returnDate": "2023-06-03"
			},
			{
				"Vendor": "David Johnson",
				"itemName": "Item 9",
				"itemQuantity": 4,
				"totalPrice": 40,
				"issuedDate": "2023-06-09",
				"returnDate": "2023-06-02"
			},
			{
				"Vendor": "Ava Thompson",
				"itemName": "Item 10",
				"itemQuantity": 5,
				"totalPrice": 50,
				"issuedDate": "2023-06-10",
				"returnDate": "2023-06-01"
			}
		];

		// Verify items has valid data
		if (items && items.length > 0) {
			// Define the table rows
			const rows = items.map((item) => [
				item.Vendor || '', // Vendor Name (fallback to empty string if undefined)
				item.itemName || '', // Item Name (fallback to empty string if undefined)
				item.itemQuantity.toString() || '', // Item Quantity (fallback to empty string if undefined)
				item.totalPrice.toString() || '', // Total Price (fallback to empty string if undefined)
				item.issuedDate || '', // Issued Date (fallback to empty string if undefined)
				item.returnDate || '', // Return Date (fallback to empty string if undefined)
			]);

			// Set the table column styles
			const columnStyles = {
				0: { cellWidth: 35 },
				1: { cellWidth: 35 },
				2: { cellWidth: 25 },
				3: { cellWidth: 30 },
				4: { cellWidth: 35 },
				5: { cellWidth: 35 },
			};

			// Add the table using AutoTable plugin
			autoTable(doc, {
				startY: 25, // Adjust the starting Y position for the table
				head: [headers],
				body: rows,
				theme: 'grid',
				headStyles: { fillColor: [52, 152, 219], textColor: 255 },
				alternateRowStyles: { fillColor: [220, 237, 200] },
				columnStyles: columnStyles,
				tableLineColor: [75, 179, 106], // Green border color
			});

			// Add the "Report Generated Date" at the top right corner
			const currentDate = new Date();
			const formattedDate = `Date: ${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
			const topMargin = 14;
			const rightMargin = 10;
			doc.setFont('helvetica', 'normal');
			doc.setFontSize(10);
			doc.text(formattedDate, doc.internal.pageSize.getWidth() - rightMargin, topMargin, {
				align: 'right',
			});
		}

		// Save the PDF document
		doc.save('vendors-log-history.pdf');
	};





	return (
		<div className="flex flex-col flex-grow">
			<Navbar />
			<div className="flex flex-grow">
				<Sidebar />
				<div className="flex flex-col w-full p-8">

					{/* Search Component */}
					<div
					className="mb-8"
					>
						<div className="flex flex-col sm:flex-row sm:justify-between mb-4">
							<div className="flex items-center">
								<input
									type="text"
									className="px-4 py-2 border border-gray-300 rounded-md mr-4"
									placeholder="Search by vendor name"
									value={vendorName}
									onChange={(e) => setVendorName(e.target.value)}
								/>
								<button
									className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
								>
									Search
								</button>
							</div>
						</div>
					</div>
					<h2 className="text-2xl font-bold mb-4">Vendor Details</h2>
					<button
						className="
						absolute
						right-8
						px-2 sm:px-4 py-2 w-32 ml-2 sm:w-auto bg-blue-500 hover:bg-blue-700 text-white rounded-md"
						onClick={generatePDF}
					>
						Download PDF
					</button>
					<div className="overflow-x-auto w-full">
						<table className="bg-white border w-full border-gray-300">
							<thead>
								<tr>
									<th className="py-2 px-4 border-b">Vendor Name</th>
									<th className="py-2 px-4 border-b">Item Name</th>
									<th className="py-2 px-4 border-b">Item Quantity</th>
									<th className="py-2 px-4 border-b">Total Price</th>
									<th className="py-2 px-4 border-b">Issued Date</th>
									<th className="py-2 px-4 border-b">Return Date</th>
									<th className="py-2 px-4 border-b">Actions</th>
								</tr>
							</thead>
							<tbody>
								{vendorDetailsData.map((vendorDetail) => (
									<tr key={vendorDetail.id}>
										<td className="py-2 px-4 border-b text-center ">{vendorDetail.vendorName}</td>
										<td className="py-2 px-4 border-b text-center">{vendorDetail.itemName}</td>
										<td className="py-2 px-4 border-b text-center">{vendorDetail.itemQuantity}</td>
										<td className="py-2 px-4 border-b text-center">{vendorDetail.totalPrice}</td>
										<td className="py-2 px-4 border-b text-center">{vendorDetail.issuedDate}</td>
										<td className="py-2 px-4 border-b text-center">{vendorDetail.returnDate}</td>
										<td className="py-2 px-4 border-b flex sm:justify-center">
											<button
												className="px-2 py-1 bg-blue-500 text-white rounded-md"
												onClick={() => openEditModal(vendorDetail)}>
												Edit
											</button>
											<button
												className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
												onClick={() => deleteVendorDetail(vendorDetail.id)}>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			{isEditModalOpen && (
				<div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
					<div className="bg-white p-8 rounded-md">
						<h2 className="text-xl font-bold mb-4">Edit Vendor Detail</h2>
						{/* Render the edit form inside the modal */}
						<form onSubmit={(e) => e.preventDefault()}>
							<label className="block mb-4">
								Vendor Name:
								<input
									type="text"
									value={selectedVendorDetail?.vendorName}
									onChange={(e) =>
										setSelectedVendorDetail((prevDetail) => ({
											...prevDetail,
											vendorName: e.target.value,
										}))
									}
									className="block w-full mt-1 border-gray-300 rounded-md"
								/>
							</label>
							{/* Include other fields for editing */}
							<label className="block mb-4">
								Item Name:
								<input
									type="text"
									value={selectedVendorDetail?.itemName}
									onChange={(e) =>
										setSelectedVendorDetail((prevDetail) => ({
											...prevDetail,
											itemName: e.target.value,
										}))
									}
									className="block w-full mt-1 border-gray-300 rounded-md"
								/>
							</label>

							<label className="block mb-4">
								Item Quantity:
								<input
									type="number"
									value={selectedVendorDetail?.itemQuantity}
									onChange={(e) =>
										setSelectedVendorDetail((prevDetail) => ({
											...prevDetail,
											itemQuantity: e.target.value,
										}))
									}
									className="block w-full mt-1 border-gray-300 rounded-md"
								/>
							</label>

							<div className="flex justify-end">
								<button
									className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md"
									onClick={() => handleEditVendorDetail(selectedVendorDetail)}>
									Save
								</button>
								<button className="px-4 py-2 bg-gray-400 text-white rounded-md" onClick={closeEditModal}>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default VendorDetails;
