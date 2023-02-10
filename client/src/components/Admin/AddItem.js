import React from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
export const AddItem = () => {
    return (
        <div className="flex flex-col ">
            <Navbar />

            <div className="flex">
                <div>
                    <Sidebar />
                </div>

                {/* Add Item */}
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <form className=" flex flex-col mt-8 w-[1000px] h-[400px] bg-slate-200 rounded-md shadow-md">
                        {/* item id */}
                        <label htmlFor="itemID" className="w-full px-4 py-2 font-semibold ">
                            Item ID
                        </label>

                        <input
                            type="number"
                            placeholder="Enter item ID"
                            className="px-2 py-2 mx-4 mb-4 outline-none rounded-lg
							focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
							"
                        />


                        {/* item name */}
                        <label htmlFor="itemName" className="w-full px-4 py-2 font-semibold ">
                            Item Name
                        </label>

                        <input
                            type="type"
                            placeholder="Enter item name"
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
                            placeholder="Enter item Quantity"
                            className="px-2 py-2 mx-4 outline-none rounded-lg
							focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                            mb-4
							"
                        />


                        {/* Submit Button */}
                        <button
                            className="w-1/4 px-4 py-2 mx-auto mt-12 text-white bg-slate-500 rounded-md shadow-md hover:bg-blue-600">
                            Add Item
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

}
