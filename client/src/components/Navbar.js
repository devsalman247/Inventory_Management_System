import React from 'react'
import logo from "../logo.png";
import admin from "..//images/admin.jpg";

export const Navbar = () => {
    return (
        <>

            {/* Navbar */}
            <div className='navbar flex items-center   w-full h-16 bg-[#00B4F4] shadow-md'>
                {/* left */}
                <div className='w-1/4 h-full flex items-center justify-center ml-20'>
                    <img src={logo} className="w-12 App-logo" alt="logo" />
                    <h4 className=' ml-8' >
                        <span className='text-white text-xl'>
                            FCIT Inventory System
                        </span>
                    </h4>
                </div>
                {/* center */}
                <div className="center ml-56">
                    {/* search Icon */}
                    <div className="search w-[400px] h-10 bg-slate-500 rounded-lg ">
                        <input type="text" className="w-full h-full rounded-lg px-4 outline-none
                        text-slate-700 " placeholder="Search here" />
                        <i className="fas fa-search relative bottom-8 left-[360px] cursor-pointer text-slate-500 "></i>
                    </div>

                </div>

                {/* right */}
                <div className="right flex items-center justify-center ml-8">
                    <img src={admin} className="w-10 h-10 rounded-full ml-16" alt="admin" />
                    <h4 className=' ml-3' >
                        <span className='text-white text-md'>
                            Admin
                        </span>

                        <select name="admin_options" id="admin_options"
                            className='ml-4 text-white text-md outline-none bg-[#00B4F4]'>
                            <option value="Select">Select</option>
                            <option value="profile">Profile</option>
                            <option value="setting">Setting</option>
                            <option value="logout">Logout</option>
                        </select>
                    </h4>

                </div>

            </div>

        </>
  )
}
