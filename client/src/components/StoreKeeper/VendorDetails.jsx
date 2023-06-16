import React, { useState } from 'react';
import { Navbar } from '../Admin/Navbar';
import Sidebar from './Sidebar';

const VendorDetails = () => {
    // Sample vendor details data
    const [vendorDetailsData, setVendorDetailsData] = useState([
        {
            id: 1,
            vendorName: 'Vendor A',
            itemName: 'Item 1',
            itemQuantity: 5,
            totalPrice: 100,
            issuedDate: '2023-06-15',
            returnDate: '2023-06-20',
        },
        {
            id: 2,
            vendorName: 'Vendor B',
            itemName: 'Item 2',
            itemQuantity: 3,
            totalPrice: 75,
            issuedDate: '2023-06-12',
            returnDate: '2023-06-18',
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

    return (
        <div className="w-full h-full">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="flex flex-col flex-grow p-8">
                    <h2 className="text-2xl font-bold mb-4">Vendor Details</h2>
                    <table className="min-w-full bg-white border border-gray-300">
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
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            className="px-2 py-1 bg-blue-500 text-white rounded-md"
                                            onClick={() => openEditModal(vendorDetail)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
                                            onClick={() => deleteVendorDetail(vendorDetail.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                                    onClick={() => handleEditVendorDetail(selectedVendorDetail)}
                                >
                                    Save
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md"
                                    onClick={closeEditModal}
                                >
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
