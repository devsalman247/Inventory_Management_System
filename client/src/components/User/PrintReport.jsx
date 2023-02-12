import React from 'react'
import { Navbar } from '../Admin/Navbar'
import Sidebar from './Sidebar'
import Report from './Report.pdf'

const PrintReport = () => {
    return (
        <div className='flex flex-col' >
            <Navbar />
            {/* Div for sidebar and main content */}
            <div className='flex'>
                <Sidebar />
                <div>
                    <h1 className=' ml-4 mt-4 mb-4 ' >
                        Click on the print button to print the report
                    </h1>
                    <a className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-4 mt-12'
                    download={Report}
                    href={Report} target="_blank"
                    rel="noreferrer"
                    >

                    Print Report
                </a>
                


                </div>
            </div>


        </div>
    )
}

export default PrintReport