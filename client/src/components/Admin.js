import React from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import data from './Employee.json'
import { useState } from 'react'

export const Admin = () => {
    const [dataItem, setDataItem] = useState(data);
    const [searchItem, setSearchItem] = useState('');
    const [designation, setDesignation] = useState('');

    const showData = () => {
        // filter data by name and designation and display it in the table
        const filteredData = data.filter((item) => {
            if ((item.fname + ' ' + item.lname ) === searchItem && item.designation === designation) {
                return item;
            }
        }
        )
        console.log(filteredData);
        setDataItem(filteredData);
    }

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
                        <input type="text" placeholder='Employee Name' className='py-4 p-2 outline-none mt-8'
                            onChange={(e) => {
                                setSearchItem(e.target.value);
                            }
                            }
                        />

                        <select name="designation" id="designation" className='py-4 p-2 outline-none mt-8 ml-4 bg-white'
                            onChange={(e) => {
                                setDesignation(e.target.value);
                            }
                            }
                        >
                            <option value="Select">Designation</option>
                            <option value="Professor">Professor</option>
                            <option value="Assistant Professor">Assistant Professor</option>
                            <option value="Lecturer">Lecturer</option>
                        </select>

                        <button className='bg-[#00B4F4] text-white py-4 px-32 mt-8 ml-4 rounded-lg'
                            onClick={showData}
                        >Search</button>
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
                                {dataItem.length === 0 ? data.map((item) => {
                                    return (
                                        <tr className='text-left'>
                                            <td className='p-4'>{item.fname + ' ' + item.lname}</td>
                                            <td className='p-4'>{item.designation}</td>
                                            <td className='p-4'>{item.email}</td>
                                        </tr>
                                    )
                                }) : dataItem.map((item) => {
                                    return (
                                        <tr className='text-left'>
                                            <td className='p-4'>{item.fname + ' ' + item.lname}</td>
                                            <td className='p-4'>{item.designation}</td>
                                            <td className='p-4'>{item.email}</td>
                                        </tr>
                                    )
                                })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}