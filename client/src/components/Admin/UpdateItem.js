import React from 'react'
import { Sidebar } from './Sidebar'
import { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import  ItemModal  from './ItemModal'
import axios from "axios";
const REACT_APP_SERVER_URL = "http://localhost:5000";

export const UpdateItem = () => {
  const [stock, setStock] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [showModal, setShowModal] = useState(false);

  const getItems = () => {
    axios
			.get(`${REACT_APP_SERVER_URL}/item`)
			.then((res) => {
				if (res.status === 200) {
          // console.log(res.data.data)
          setStock(res.data.data)
        };
			})
			.catch((err) => console.log(err));
  }

  function updateItem(item) {
    setShowModal(true);
    setSelectedItem(item)
  }

  useEffect(() => {
    getItems()
  }, [])

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
              {stock.map((item) => {
                return (
                  <tr className="text-left">
                    <td className="px-4 py-3" id="name" >{parseInt(item.itemId.split("-")[1])}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.stock}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => updateItem(item)}
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

          {showModal && <ItemModal setShowModal={setShowModal} item={selectedItem} getItems={getItems}/>}
        </div>
      </div>
    </div>
  )
}
