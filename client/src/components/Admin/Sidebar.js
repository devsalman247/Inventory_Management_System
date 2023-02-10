import React from 'react'
import { useNavigate } from 'react-router-dom'
export const Sidebar = () => {
    const navigate = useNavigate()
    return (
        <>
            {/* Sidebar */}
            <div className='sidebar flex text-white justify-center w-64 h-[590px] bg-[#34444C]'>
                <ul>
                    <li className='mt-10 cursor-pointer'
                    onClick={() => navigate('/admin')}
                    >
                        {/* show all employees */}
                        <i className="fas fa-users mr-4"></i>
                        <span> All Employees</span>
                    </li>

                    <li className='mt-10 cursor-pointer '
                        onClick={() => navigate('/add_employee')}
                    >
                        {/* Add New Employee */}
                        <i className="fas fa-user-plus mr-4 cursor-pointer"></i>
                        <span>Add New Employee</span>

                    </li>

                    <li className='mt-10 cursor-pointer '
                    onClick={() => navigate('/update_employee')}
                    >
                        {/* Update Employee */}
                        <i className="fas fa-user-edit mr-4"></i>
                        <span>Update Employee</span>
                    </li>

                    <li className='mt-10 cursor-pointer '
                    onClick={() => navigate('/delete_employee')}
                    >
                        {/* Delete Employee */}
                        <i className="fas fa-user-minus mr-4"></i>
                        <span>Delete Employee</span>
                    </li>

                    {/* Available Stock */}
                    <li className='mt-10 cursor-pointer '
                    onClick={() => navigate('/available_stock')}
                    >
                        <i className="fas fa-box-open mr-4"></i>
                        <span>Available Stock</span>
                    </li>

                    {/* Available Stock */}
                    <li className='mt-10 cursor-pointer '
                        onClick={() => navigate('/add_item')}
                    >
                        {/* class for available stock */}
                        <i className="fas fa-plus mr-4"></i>
                        <span> Add Item</span>
                    </li>

                    {/* Update Item */}
                    <li className='mt-10 cursor-pointer'
                    onClick={() => navigate('/update_item')}
                    >
                        <i className="fas fa-edit mr-4"></i>
                        <span>Update Item</span>
                    </li>

                    {/* Delete Item */}
                    <li className='mt-10 cursor-pointer '
                    onClick={() => navigate('/delete_item')}
                    >
                        <i className="fas fa-minus mr-4"></i>
                        <span>Delete Item</span>
                    </li>
                </ul>
            </div>
        </>
    )
}
