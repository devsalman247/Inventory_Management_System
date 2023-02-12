import React from 'react'
import { Navbar } from '../Admin/Navbar'
import Sidebar from './Sidebar'
const SendRequest = () => {
  return (
      <div className='flex flex-col w-full h-full ' >
          <Navbar />
          {/* Div for sidebar and main content */}
          <div className='flex'>
              <Sidebar />
              <div className='w-[700px]' >
                  <form
                      className=' ml-10 mt-10 flex flex-col w-[1000px] h-[480px] border-2 border-gray-300 rounded-md shadow-md'
                  >
                      <label htmlFor="itemId"
                          className='
                            text-gray-700 text-sm font-bold
                            mt-4 ml-4'
                      >Item ID</label>
                      <input type="number" name="itemId" id="itemId" placeholder="Item ID"
                          className='
                            px-4 py-2 mt-2 
                            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                          '
                      />
                      <label htmlFor="itemName"
                          className='
                            text-gray-700 text-sm font-bold
                            mt-4 ml-4'
                      >Item Name</label>
                      <input type="text" name="itemName" id="itemName" placeholder="Item Name"
                          className='
                            px-4 py-2 mt-2
                            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                          '
                      />
                      <label htmlFor="quantity"
                          className='
                            text-gray-700 text-sm font-bold
                            mt-4 ml-4'
                      >Item Quantity</label>
                      <input type="number" name="quantity" id="quantity" placeholder="Quantity"
                          className='
                            px-4 py-2 mt-2
                            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                          '
                      />
                      <label htmlFor="date"
                          className='
                            text-gray-700 text-sm font-bold
                            mt-4 ml-4'
                      >Date</label>
                      <input type="date" name="date" id="date" placeholder="Date"
                          className='
                            px-4 py-2 mt-2
                            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                          '
                      />
                      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-40 rounded-md  mt-12'
                      mx-20
                      >
                          Send Request
                      </button>

                  </form>
              </div> 
     
          </div>
          
      </div>
  )
}

export default SendRequest