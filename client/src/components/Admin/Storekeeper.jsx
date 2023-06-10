import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

const Storekeeper = () => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john@example.com');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('PUCIT, Lahore');
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        // Code to update the storekeeper's profile using an API call
        console.log('Profile updated:', { name, email, password, address, profileImage });
    };

    return (
        <div>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="flex flex-col items-center ml-20 mt-2 ">
                    {/* Edit Storekeeper Profile */}
                    <h2 className="text-2xl font-semibold mb-4">Edit Storekeeper Profile</h2>
                    <form onSubmit={handleProfileUpdate} className="w-[800px]">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={handleNameChange}
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
                                value={email}
                                onChange={handleEmailChange}
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
                                value={password}
                                onChange={handlePasswordChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Address:
                            </label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={handleAddressChange}
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
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Profile Preview"
                                        className="rounded-full w-8 h-8 object-cover"
                                    />
                                ) : (
                                    <img
                                        src="default-user-icon.png" // Replace with your default user icon or any other image URL
                                        alt="Default User Icon"
                                        className="rounded-full w-8 h-8 object-cover"
                                    />
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Storekeeper;
