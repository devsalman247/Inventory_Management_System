import React from 'react'
import { Navbar } from '../Admin/Navbar'
import Sidebar from './Sidebar'
const AllItems = () => {
    return (
        <div className='flex flex-col'>
            <Navbar />
            {/* Div for sidebar and main content */}
            <div className='flex w-full h-full '>
                <Sidebar />
                {/* Div for main content */}
                <div class=" flex flex-col justify-center items-center ml-20 mt-20 w-[400px] bg-blue-400 border-2 border-gray-300 rounded-md shadow-md">

                    {/* add Chair icon */}
                    <i class="fas fa-chair fa-3x text-center"></i>
                    <div class="px-6 py-4">
                        <p class="text-gray-700 text-base">
                            Chair
                        </p>
                        <p>
                            <span class="font-bold text-gray-900">Quantity: </span>
                            10
                        </p>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default AllItems