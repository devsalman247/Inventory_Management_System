import React from "react";
import { Navbar } from "../Admin/Navbar";
import { Sidebar } from "../Admin/Sidebar";

const AssignItem = () => {
    return (
        <div className="flex flex-col">
            <Navbar />
            {/* Div for sidebar and main content */}
            <div className="flex">
                <Sidebar />

                {/* Div for main content */}
                <div className="flex flex-wrap items-stretch w-[1100px]" >
                    <div
                        className="
                          flex
                          flex-col
                          items-center
                          justify-center
                          ml-10
                          mt-4
                          w-[300px]
                          h-55
                          bg-blue-400
                          border-2
                          border-gray-300
                          rounded-md
                          shadow-md
                          pt-4
                          pb-4
                         
                          "
                    >
                        <h1
                            className="
                            text-white text-xl font-bold
                            "
                        >
                            Ahmad Shakeel
                        </h1>
                        <h3
                            className="
                            text-white text-base
                            "
                        >
                            Assistant Professor
                        </h3>
                        {/* Chair Icon */}
                        <i class="fas fa-chair fa-3x text-center text-white mt-4 mb-4 "></i>
                        <p
                            className="
                            text-blue-400 text-sm
                            bg-white
                            px-2
                            py-1
                            "
                        >
                            Quantity: 1
                        </p>
                        <p
                            className="
                            text-white text-sm"
                        >
                            Location: 1st Floor
                        </p>
                        <p className="text-white text-sm">
                            Department: Computer Science
                        </p>
                        <span className="flex">
                            <button
                                className=" bg-white text-blue-400 px-2 py-1 rounded-md
                                mr-2 hover:bg-blue-400 hover:text-white
                                "
                            >
                                Allow
                            </button>


                            <button
                                className=" bg-white text-blue-400 px-2 py-1 rounded-md
                                mr-2 hover:bg-blue-400 hover:text-white
                                "
                            >
                                Deny
                            </button>

                        </span>
                    </div>

                    <div
                        className="
                          flex
                          flex-col
                          items-center
                          justify-center
                          ml-10
                          mt-4
                          w-[300px]
                          h-55
                          bg-blue-400
                          border-2
                          border-gray-300
                          rounded-md
                          shadow-md
                          pt-4
                          pb-4
                          "                  
                    >
                        <h1
                            className="
                            text-white text-xl font-bold
                            "
                        >
                            Mansoor Ahmad
                        </h1>
                        <h3
                            className="
                            text-white text-base
                            "
                        >
                            Professor
                        </h3>
                        {/* Board Marker Icon */}
                        <i class="fas fa-marker fa-3x text-center text-white mt-4 mb-4 "></i>
                        <p
                            className="
                            text-blue-400 text-sm
                            bg-white
                            px-2
                            py-1
                            "
                        >
                            Quantity: 2
                        </p>
                        <p
                            className="
                            text-white text-sm"
                        >
                            Location: 2nd Floor
                        </p>
                        <p className="text-white text-sm">
                            Department: Software Engineering
                        </p>
                        <span className="flex">
                            <button
                                className=" bg-white text-blue-400 px-2 py-1 rounded-md
                                mr-2 hover:bg-blue-400 hover:text-white
                                "
                            >
                                Allow
                            </button>


                            <button
                                className=" bg-white text-blue-400 px-2 py-1 rounded-md
                                mr-2 hover:bg-blue-400 hover:text-white
                                "
                            >
                                Deny
                            </button>

                        </span>
                    </div>

                    <div
                        className="
                          flex
                          flex-col
                          items-center
                          justify-center
                          ml-10
                          mt-4
                          w-[300px]
                          h-55
                          bg-blue-400
                          border-2
                          border-gray-300
                          rounded-md
                          shadow-md
                          pt-4
                          pb-4
                          "                  
                    >
                        <h1
                            className="
                            text-white text-xl font-bold
                            "
                        >
                            Muhammad Idrees
                        </h1>
                        <h3
                            className="
                            text-white text-base
                            "
                        >
                            Assistant Professor
                        </h3>
                        {/* Chair Icon */}
                        <i class="fas fa-chair fa-3x text-center text-white mt-4 mb-4 "></i>
                        <p
                            className="
                            text-blue-400 text-sm
                            bg-white
                            px-2
                            py-1
                            "
                        >
                            Quantity: 1
                        </p>
                        <p
                            className="
                            text-white text-sm"
                        >
                            Location: 1st Floor
                        </p>
                        <p className="text-white text-sm">
                            Department: Computer Science
                        </p>
                        <span className="flex">
                            <button
                                className=" bg-white text-blue-400 px-2 py-1 rounded-md
                                mr-2 hover:bg-blue-400 hover:text-white
                                "
                            >
                                Allow
                            </button>


                            <button
                                className=" bg-white text-blue-400 px-2 py-1 rounded-md
                                mr-2 hover:bg-blue-400 hover:text-white
                                "
                            >
                                Deny
                            </button>

                        </span>
                    </div>



                    <div
                        className="
                          flex
                          flex-col
                          items-center
                          justify-center
                          ml-10
                          mt-4
                          w-[300px]
                          h-55
                          bg-blue-400
                          border-2
                          border-gray-300
                          rounded-md
                          shadow-md
                          pt-4
                          pb-4
                          "                  
                    >
                        <h1
                            className="
                            text-white text-xl font-bold
                            "
                        >
                            Muhammad Salman
                        </h1>
                        <h3
                            className="
                            text-white text-base
                            "
                        >
                            Lecturer
                        </h3>
                        {/* Table Icon */}
                        <i class="fas fa-table fa-3x text-center text-white mt-4 mb-4 "></i>
                        <p
                            className="
                            text-blue-400 text-sm
                            bg-white
                            px-2
                            py-1
                            "
                        >
                            Quantity: 1
                        </p>
                        <p
                            className="
                            text-white text-sm"
                        >
                            Location: 1st Floor
                        </p>
                        <p className="text-white text-sm">
                            Department: Software Engineering
                        </p>
                        <span className="flex">
                            <button
                                className=" bg-white text-blue-400 px-2 py-1 rounded-md
                                mr-2 hover:bg-blue-400 hover:text-white
                                "
                            >
                                Allow
                            </button>


                            <button
                                className=" bg-white text-blue-400 px-2 py-1 rounded-md
                                mr-2 hover:bg-blue-400 hover:text-white
                                "
                            >
                                Deny
                            </button>

                        </span>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default AssignItem;
