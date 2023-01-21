import React from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import data from './Employee.json'
import { useState } from 'react'

export const Admin = () => {
    const [dataItem, setDataItem] = useState(data);
    const [searchItem, setSearchItem] = useState('');
    const [designation, setDesignation] = useState('');

    // get Checked filters 
    const getCheckedFilters = () => {
        const checkedFilters = [];
        const filters = document.querySelectorAll('input[type="checkbox"]');
        filters.forEach((filter) => {
            if (filter.checked) {
                checkedFilters.push(filter.value);
            }
        })
        console.log(checkedFilters);
        // Now filter the data and set accordng to the checked boxes
        if (checkedFilters.length > 0) {
            const filteredData = data.filter((item) => {
                if (checkedFilters.includes(item.designation)) {
                    return item;
                }
            })
            setDataItem(filteredData);
        }
        return checkedFilters;
    }


    const showData = () => {
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
            <Navbar/>
            <div className="super_section flex ">
                <Sidebar />
                {/* Main Content */}
                <div className='main_content flex flex-col items-center '>
                    <div className="main_top relative top-4 right-[420px] ">
                        <h1 className=' mt-8  font-semibold text-xl'>Employees</h1>
                        <p className='' >Dashboard</p>
                    </div>

                    <div className="main_search flex relative top-4 right-[90px] mb-8 ">
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

                    {/* Filters */}
                    <div className="main_filter flex mt-8 relative mr-[520px] ">
                        {/* Add Filters font awesome icon */}
                        <i className="fas fa-filter text-[#00B4F4] text-2xl ml-12"></i>
                        <div className="filter1 flex items-center">
                            <input type="checkbox" className='ml-4'
                            value={"Professor"}
                            />
                            <p className='ml-2'>Professor</p>
                        </div>

                        <div className="filter2 flex items-center ml-8">
                            <input type="checkbox" className='ml-4'
                            value={"Assistant Professor"}
                            />
                            <p className='ml-2'>Assistant Professor</p>
                        </div>

                        <div className="filter3 flex items-center ml-8">
                            <input type="checkbox" className='ml-4'
                            value={"Lecturer"}
                            />
                            <p className='ml-2'>Lecturer</p>
                        </div>
                    </div>

                    {/* button to get checked filters */}
                    <button className='bg-[#00B4F4] absolute top-[265px] right-[460px] text-white py-2 px-4 mt-8 ml-12 rounded-lg'
                        onClick={() => {
                            getCheckedFilters();
                        }}
                    >Apply</button>


                    {/* Display data in the form of table*/}
                    <div className="main_table flex flex-col items-center mt-8 ml-12 ">
                        <table className='w-[1000px] bg-white shadow-md rounded-lg'>
                            <thead className='bg-[#00B4F4] text-white text-center '>
                                <tr className='text-left' >
                                    <th className='px-4 py-3'>Name</th>
                                    <th className='px-4 py-3'>Designation</th>
                                    <th className='px-4 py-3'>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataItem.length === 0 ? data.map((item) => {
                                    return (
                                        <tr className='text-left'>
                                            <td className='px-4 py-3'>{item.fname + ' ' + item.lname}</td>
                                            <td className='px-4 py-3'>{item.designation}</td>
                                            <td className='px-4 py-3'>{item.email}</td>
                                        </tr>
                                    )
                                }) : dataItem.map((item) => {
                                    return (
                                        <tr className='text-left'>
                                            <td className='px-4 py-3'>{item.fname + ' ' + item.lname}</td>
                                            <td className='px-4 py-3'>{item.designation}</td>
                                            <td className='px-4 py-3'>{item.email}</td>
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