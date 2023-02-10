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
    <div>
      <Navbar />
      <div className="flex  w-full h-full">
        <Sidebar />
        {/* <h1 className=' mt-4 ml-16 font-bold text-lg ' >
          <i className="fas fa-box-open"></i>
          <span className='ml-2' >
            Available Stock
          </span>
        </h1> */}

        {/* Show thw Stock Items in the table form */}
        <div>
          <table className='mt-12 ml-40 w-[500px] ' >
            <thead className='' > 
              <tr>
                <th className='py-2 px-2' >Item ID</th>
                <th className='py-2 px-4'>Item Name</th>
                <th className='py-2 px-4'>Item Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item) => {
                return (
                  <tr className='bg-blue-400 px-4 py-8 ' >
                    <td
                    className='border border-gray-300 px-3 py-12 text-center '
                    >{item.id}</td>
                    <td
                      className='border border-gray-300 px-3 py-12 text-center'
                    >{item.name}</td>

                    <td
                      className='border border-gray-300 px-3 py-12 text-center'
                    >{item.quantity}</td>
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
