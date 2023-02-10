import React from 'react'
import { Sidebar } from './Sidebar'
import { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import Stock from './stock.json'



const DeleteItem = () => {
  const [data, setData] = useState(Stock);
  return (
      <div className='flex flex-col'>
          <Navbar />
          <div className='flex flex-row'>
          <Sidebar />


        {/* Display data in the form of table*/}
        <div className="main_table flex flex-col  mt-4 ml-12 ">
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
              {data.map((item) => {
                return (
                  <tr className="text-left">
                    <td className="px-4 py-3" id="name" >{item.id}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3">
                      <button
                        // onClick={updateItem}
                        className="hover:text-[#00B4F4]"
                      >Delete
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
  )
}

export default DeleteItem