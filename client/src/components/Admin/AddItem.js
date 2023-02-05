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
                      Add Items
                  </h4>
                  
                  {/* Create Card for each item in the store */}
                  <div className='flex ml-8 mt-4 absolute top-32 w-[1050px]' >
                      
                      {/* Div for each item */} 
                      <div className='w-64 h-64 mr-4 flex flex-col px-10 py-4 justify-center hover:bg-white 
                      hover:rounded-lg shadow-lg'>
                          {/* Add font awesome class for pencil */}
                          <span>
                                <i className="fas fa-pencil-alt text-blue-500 text-2xl "></i>
                          </span>

                          <h4 className='text-lg mt-2' >
                              Board Marker 
                          </h4>
                          <p className='text-sm mt-2' >
                              1000
                          </p>

                          {/* Plus button to add item in the right side of the div */}
                          <div className='flex justify-end mt-4' >
                              <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' >
                                  +
                              </button>
                          </div>
                      </div>

                      {/* Div for each item */}
                      <div className='w-64 h-64 mr-4 flex flex-col px-10 py-4 justify-center hover:bg-white 
                      hover:rounded-lg shadow-lg'>
                          {/* Add font awesome class for Chair */}
                          <span>
                                <i className="fas fa-chair text-blue-500 text-2xl "></i>
                          </span>

                          <h4 className='text-lg mt-2' >
                              Chair
                          </h4>
                          <p className='text-sm mt-2' >
                              20
                          </p>

                          {/* Plus button to add item in the right side of the div */}
                          <div className='flex justify-end mt-4' >
                              <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' >
                                  +
                              </button>
                          </div>
                      </div>


                      {/* Div for each item */}
                      <div className='w-64 h-64 mr-4 flex flex-col px-10 py-4 justify-center hover:bg-white 
                      hover:rounded-lg shadow-lg'>
                          {/* Add font awesome class for Chair */}
                          <span>
                                <i className="fas fa-chair text-blue-500 text-2xl "></i>
                          </span>

                          <h4 className='text-lg mt-2' >
                              Chair
                          </h4>
                          <p className='text-sm mt-2' >
                              20
                          </p>

                          {/* Plus button to add item in the right side of the div */}
                          <div className='flex justify-end mt-4' >
                              <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' >
                                  +
                              </button>
                          </div>
                      </div>


                      
                  </div>
              </div>
              
              
          </div>
          
          
    </div>
  )
}
