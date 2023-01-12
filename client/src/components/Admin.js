import React from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export const Admin = () => {
    return (
        <div className='w-full h-full bg-[#F7F7F7]'>
            <Navbar />
            <div className="super_section flex ">
                <Sidebar />
                {/* Main Content */}
                <div className='main_content flex flex-col items-center '>
                    <div className="main_top relative right-80 ml-6">
                            <h1 className=' mt-8  font-semibold text-xl'>Employees</h1>
                            <p className='' >Dashboard</p>
                    </div>

                    <div className="main_search flex ml-12">
                        <input type="text" placeholder='Employee Name' className='py-4 p-2 outline-none mt-8' />
                        
                        <select name="designation" id="designation" className='py-4 p-2 outline-none mt-8 ml-4 bg-white '>
                            <option value="Select">Designation</option>
                            <option value="Admin">Professor</option>
                            <option value="Manager">Assistant Professor</option>
                            <option value="Employee">Lecturer</option>
                        </select>

                        <button className='bg-[#00B4F4] text-white py-4 px-32 mt-8 ml-4 rounded-lg'>Search</button>
                    </div>

                    {/* Display data in the form of table*/}
                    <div className="main_table flex flex-col items-center mt-8 ml-4 ">
                        <table className='w-[1000px] h-[30px] bg-white shadow-md rounded-lg'>
                            <thead className='bg-[#00B4F4] text-white text-center '>
                                <tr className='text-left' >
                                    <th className='p-4'>Name</th>
                                    <th className='p-4'>Designation</th>
                                    <th className='p-4'>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-left'>
                                    <td className='p-4'>Ahmad Shakeel</td>
                                    <td className='p-4'>Professor</td>
                                    <td className='p-4'>ahmad123@gmail.com</td>
                                </tr>

                                <tr className='text-left'>
                                    <td className='p-4'>Muhammad Salman</td>
                                    <td className='p-4'>Lecturer</td>
                                    <td className='p-4'>salman247@gmail.com</td>
                                </tr>

                                <tr className='text-left' >
                                    <td className='p-4'>Mansoor Ahmad</td>
                                    <td className='p-4'>Assistant Professor</td>
                                    <td className='p-4'>mansoor123@gmail.com</td>
                                </tr>
                                <tr className='text-left' >
                                    <td className='p-4'>Muhammad Idrees</td>
                                    <td className='p-4'>Professor</td>
                                    <td className='p-4'>idrees@pucit.edu.pk</td>
                                </tr>
                                <tr className='text-left' >
                                    <td className='p-4'>Ejaz Ashraf</td>
                                    <td className='p-4'>Assistant Professor</td>
                                    <td className='p-4'>ejaz@pucit.edu.com</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                </div>
            </div>
            </div>
        )
}