import React from 'react'

export const Sidebar = () => {
  return (
      <>

          {/* Sidebar */}
          <div className='sidebar flex text-white justify-center w-56 h-[590px] bg-[#34444C]'>
              <ul>
                  <li className='mt-10 cursor-pointer'>
                      {/* show all employees */}
                      <i className="fas fa-users mr-4"></i>
                      <span>All Employees</span>
                  </li>
                  <li className='mt-10 cursor-pointer '>
                      {/* Add New Employee */}
                      <i className="fas fa-user-plus mr-4"></i>
                      <span>Add New Employee</span>
                  </li>
                  <li className='mt-10 cursor-pointer '>
                      {/* Update Employee */}
                      <i className="fas fa-user-edit mr-4"></i>
                      <span>Update Employee</span>
                  </li>

                  <li className='mt-10 cursor-pointer '>
                      {/* Delete Employee */}
                      <i className="fas fa-user-minus mr-4"></i>
                      <span>Delete Employee</span>
                  </li>

                  {/* Add Item */}
                  <li className='mt-10 cursor-pointer '>
                      <i className="fas fa-plus mr-4"></i>
                      <span>Add Item</span>
                  </li>

                  {/* Update Item */}
                  <li className='mt-10 cursor-pointer '>
                      <i className="fas fa-edit mr-4"></i>
                      <span>Update Item</span>
                  </li>

                  {/* Delete Item */}
                  <li className='mt-10 cursor-pointer '>
                      <i className="fas fa-minus mr-4"></i>
                      <span>Delete Item</span>
                  </li>
              </ul>
          </div>
      </>
  )
}
