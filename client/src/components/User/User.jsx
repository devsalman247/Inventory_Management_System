import React from 'react'
import { Navbar } from '../Admin/Navbar'
import Sidebar from './Sidebar'
const User = () => {
    return (

        <div className='flex flex-col'>
            <Navbar />
            {/* Div for sidebar and main content */}
            <div className='flex flex-row'>
                <Sidebar />
            </div>
            
        </div>

    )
}

export default User