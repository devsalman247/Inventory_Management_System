import React from 'react'
import { Sidebar } from './Sidebar'
import { useState, useEffect } from 'react'
import { Navbar } from './Navbar'


const DeleteItem = () => {
  return (
      <div className='flex flex-col'>
          <Navbar />
          <div className='flex flex-row'>
              <Sidebar />
          </div>
    </div>
  )
}

export default DeleteItem