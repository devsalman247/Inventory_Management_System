import React from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import Stock from './stock.json'
import { useState, useEffect } from 'react'

export const AvailableStock = () => {
  // console.log(Stock)
  const [stock, setStock] = useState([])
  useEffect(() => {
    setStock(Stock)
  }, [])


  return (
    <div className='flex flex-col' >
      <Navbar />
      <div className="flex">
        <Sidebar />

        {/* Display data in the form of table*/}
        <div className="main_table flex flex-col  mt-8">
          <table className="w-[780px] bg-white shadow-md rounded-lg ml-12 ">
            <thead className="bg-[#00B4F4] w-[240px] text-white text-center ">
              <tr className="text-left">
                <th className="px-4 py-3">Item ID</th>
                <th className="px-4 py-3">Item Name</th>
                <th className="px-4 py-3">Item Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item) => {
                return (
                  <tr className="text-left">
                    <td className="px-4 py-3" id="name" >{item.id}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
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
