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
      <div className="flex w-full h-full">
        <Sidebar />
        {/* <h1 className=' mt-4 ml-16 font-bold text-lg' >
          <i className="fas fa-box-open"></i>
          <span className='ml-2' >
            Available Stock
          </span>
        </h1> */}

        {/* Show thw Stock Items in the table form */}
        <div className='mt-4 bg-white ml-4  '>
          <table className='w-[500px] h-[500px] border-collapse'>
            <thead>
              <tr>
                <th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>Item ID</th>
                <th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>Item Name</th>
                <th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>Item Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className='p-3 text-gray-600 text-center border border-b block lg:table-cell relative lg:static'>{item.id}</td>
                    <td className='p-3 text-gray-600 text-center border border-b block lg:table-cell relative lg:static'>{item.name}</td>
                    <td className='p-3 text-gray-600 text-center border border-b block lg:table-cell relative lg:static'>{item.quantity}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}
