import React from 'react'
import { Navbar } from './Navbar'
// import admin from '../../'


const Profile = () => {
  return (
      <div className='flex flex-col w-full h-screen overflow-hidden'>
          <Navbar />
          <div className='flex w-full h-screen '>
              {/* show image with 50% round */}
              <img src={"admin"} alt="Profile"
              className=' w-1/2 h-1/2 ml-2 rounded-full border-blue-400 border-4'
              />
              <div className="name text-4xl font-bold ">
                    <h1 className="text-4xl font-bold">Admin  </h1>
              </div>
          </div>
          
    </div>
  )
}

export default Profile