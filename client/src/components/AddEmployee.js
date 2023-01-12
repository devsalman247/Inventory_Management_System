import React from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export const AddEmployee = () => {
  return (
    <div className='flex flex-col ' >
      <Navbar />

      <div className='flex' >
      <Sidebar />

      {/* Add Employee */}
        <div className="flex flex-col items-center justify-center w-full h-full">
          <form className=' flex flex-col mt-8 w-[900px] h-[530px] bg-slate-200 rounded-md shadow-md'>
            {/* first name */}
            <label htmlFor="firstname" className='w-full px-4 py-2 font-semibold ' >First Name</label>
            <input type="text" placeholder='first name' id='firstname' className='px-2 py-2
            mx-4 outline-none rounded-lg '  />
            
            {/* last name */}
            <label htmlFor="lastname" className='w-full px-4 py-2 font-semibold' >Last Name</label>
            <input type="text" placeholder='last name' id='lastname' className='px-2 py-2
            mx-4 outline-none rounded-lg '  />

            {/* email */}
            <label htmlFor="email" className='w-full px-4 py-2 font-semibold' >Email</label>
            <input type="email" placeholder='email' id='email' className='px-2 py-2
            mx-4 outline-none rounded-lg '  />

            {/* phone */}
            <label htmlFor="phone" className='w-full px-4 py-2 font-semibold' >Phone</label>
            <input type="text" placeholder='phone' id='phone' className='px-2 py-2
            mx-4 outline-none rounded-lg '  />

            {/* address */}
            <label htmlFor="address" className='w-full px-4 py-2 font-semibold' >Address</label>
            <input type="text" placeholder='address' id='address' className='px-2 py-2
            mx-4 outline-none rounded-lg'/>

            {/* joining date */}
            <label htmlFor="joiningdate" className='w-full px-4 py-2 font-semibold' >Joining Date</label>
            <input type="date" placeholder='joining date' id='joiningdate' className='px-2 py-2
            mx-4 outline-none rounded-lg'/>

            {/* Submit Button */}
            <button className='w-1/4 px-4 py-2 mx-auto mt-4 text-white bg-slate-500 rounded-md shadow-md hover:bg-blue-600' >Add Employee</button>

          </form>

      </div>
      </div>
    </div>
  )
}
