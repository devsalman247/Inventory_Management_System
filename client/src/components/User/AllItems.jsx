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
                <div className='flex flex-wrap items-stretch '>
                    <div class=" flex flex-col items-center justify-center  ml-10 mt-4 w-[300px] h-50 bg-blue-400 border-2 border-gray-300 rounded-md shadow-md">

                        {/* add Chair icon */}
                        <i class="fas fa-chair fa-3x text-center text-white mt-4 "></i>
                        <div class="px-6 py-4">
                            <p class="text-white text-base">
                                Chair
                            </p>
                            <p>
                                <span class="font-bold text-white">Quantity: 15</span>
                            </p>
                        </div>
                    </div>
                    <div class=" flex flex-col items-center justify-center  ml-10 mt-4 w-[300px] h-50 bg-blue-400 border-2 border-gray-300 rounded-md shadow-md">

                        {/* add Printer icon */}
                        <i class="fas fa-print fa-3x text-center text-white mt-4 "></i>
                        <div class="px-6 py-4">
                            <p class="text-white text-base">
                                Printer
                            </p>
                            <p>
                                <span class="font-bold text-white">Quantity: 15</span>

                            </p>
                        </div>
                    </div>
                    <div class=" flex flex-col items-center justify-center  ml-10 mt-4 w-[300px] h-50 bg-blue-400 border-2 border-gray-300 rounded-md shadow-md">

                        {/* add Table icon */}
                        <i class="fas fa-table fa-3x text-center text-white mt-4 "></i>
                        <div class="px-6 py-4">
                            <p class="text-white text-base">
                                Table
                            </p>
                            <p>
                                <span class="font-bold text-white">Quantity: 15</span>

                            </p>
                        </div>
                    </div>
                    <div class=" flex flex-col items-center justify-center  ml-10 mt-4 w-[300px] h-50 bg-blue-400 border-2 border-gray-300 rounded-md shadow-md">

                        {/* add Computer icon */}
                        <i class="fas fa-desktop fa-3x text-center text-white mt-4 "></i>
                        <div class="px-6 py-4">
                            <p class="text-white text-base">
                                Computer
                            </p>
                            <p>
                                <span class="font-bold text-white">Quantity: 15</span>

                            </p>
                        </div>
                    </div>
                    <div class=" flex flex-col items-center justify-center  ml-10 mt-4 w-[300px] h-50 bg-blue-400 border-2 border-gray-300 rounded-md shadow-md">

                        {/* add Sofa icon */}
                        <i class="fas fa-couch fa-3x text-center text-white mt-4 "></i>
                        <div class="px-6 py-4">
                            <p class="text-white text-base">
                                Sofa
                            </p>
                            <p>
                                <span class="font-bold text-white">Quantity: 15</span>

                            </p>
                        </div>
                    </div>


                    <div class=" flex flex-col items-center justify-center  ml-10 mt-4 w-[300px] h-50 bg-blue-400 border-2 border-gray-300 rounded-md shadow-md">

                        {/* add Board Marker icon */}
                        <i class="fas fa-marker fa-3x text-center text-white mt-4 "></i>
                        <div class="px-6 py-4">
                            <p class="text-white text-base">
                                Board Marker
                            </p>
                            <p>
                                <span class="font-bold text-white">Quantity: 15</span>

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AllItems