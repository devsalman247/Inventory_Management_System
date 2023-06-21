import React, { useState } from 'react';
import { Navbar } from '../Admin/Navbar';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';

const CreateVendor = () => {
    const [vendor, setVendor] = useState({
        name: '',
        id: '',
        address: '',
        phoneNumber: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendor((prevVendor) => ({
            ...prevVendor,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you can perform further actions like sending the data to the server or updating the state.
        console.log(vendor);
        // Reset the form after submission
        setVendor({
            name: '',
            id: '',
            address: '',
            phoneNumber: '',
            email: '',
        });

        // Display SweetAlert message
        Swal.fire({
            title: 'Success!',
            text: 'New Vendor created Successfully',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    };

    return (
        <div className="flex flex-col w-full h-max-screen bg-gray-100">
            <Navbar />
            <div className="flex flex-row h-screen ">
                <Sidebar/>
                <div className="flex flex-col w-full p-8">
                    <h2 className="text-2xl font-bold mb-4 ">Create Vendor</h2>
                    <form onSubmit={handleSubmit}
                    >
                        <div className="mb-4 ">
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                type="text"
                                name="name"
                                id="name"
                                value={vendor.name}
                                onChange={handleChange}
                                required
                                placeholder='Enter Vendor Name'
                            />
                        </div>
                        <div className="mb-4">
                            
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                type="text"
                                name="id"
                                id="id"
                                value={vendor.id}
                                onChange={handleChange}
                                required
                                placeholder='Enter Vendor ID'
                            />
                        </div>
                        <div className="mb-4">
                            
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                type="text"
                                name="address"
                                id="address"
                                value={vendor.address}
                                onChange={handleChange}
                                required
                                placeholder='Enter Vendor Address'
                            />
                        </div>
                        <div className="mb-4">
                            
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                value={vendor.phoneNumber}
                                onChange={handleChange}
                                required
                                placeholder='Enter Vendor Phone Number'
                            />
                        </div>
                        <div className="mb-4">
                            
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                type="email"
                                name="email"
                                id="email"
                                value={vendor.email}
                                onChange={handleChange}
                                required
                                placeholder='Enter Vendor Email'
                            />
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Create Vendor
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateVendor;
