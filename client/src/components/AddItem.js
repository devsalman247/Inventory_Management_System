import React from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
export const AddItem = () => {
  return (
      <div>
          <Navbar />
          <div className='flex' >
              <Sidebar />
              {/* Div for items in the store */}
              <div className='flex'>
                  <h4 className=' text-lg ml-40 mt-8 mb-4 ' >
                      Add Item
                  </h4>
              </div>
              
              
          </div>
          
          
    </div>
  )
}
