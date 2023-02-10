import React from 'react'
import { Sidebar } from './Sidebar'
import { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import Stock from './stock.json'
import  ItemModal  from './ItemModal'


export const UpdateItem = () => {
  const [data, setData] = useState(Stock);
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);


  function updateItem() {
    setShowModal(true);
  }

  return (
    <div className='flex flex-col' >
      <Navbar />
      <div className="flex ">
        <Sidebar />


        {/* Display data in the form of table*/}
        <div className="main_table flex flex-col mt-4 ">
          <table className="w-[780px] bg-white shadow-md rounded-lg ml-12 ">
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
                        onClick={updateItem}
                        className="hover:text-[#00B4F4]"
                      >
                        Update
                        <i className=" pl-3 fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {showModal && <ItemModal setShowModal={setShowModal} />}


        </div>
      </div>
    </div>
  )
}
