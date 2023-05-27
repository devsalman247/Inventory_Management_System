import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate()
    return (
        <div>
            {/* Div for side bar */}
            <div className='sidebar flex text-white justify-center w-64 h-[590px] bg-[#34444C]'>
                <ul>
                    <li className='mt-10 cursor-pointer'

                        onClick={() => {
                            navigate('/user/dashboard')
                        }
                        }
                    >
                        {/* show all Items */}
                        <i className="fas fa-boxes mr-4"></i>
                        <span> All Items</span>
                    </li>

                    <li className='mt-10 cursor-pointer '
                        onClick={() => {
                            navigate('/user/request')
                        }   
                    }
                    >
                        {/* Request for item */}
                        <i className="fas fa-box-open mr-4"></i>
                        <span>Send Item Request</span>

                    </li>

                    <li className='mt-10 cursor-pointer '
                        onClick={() => {
                            navigate('/print_report')
                        }
                        }
                    >
                        {/* Print Report */}
                        <i className="fas fa-print mr-4"></i>
                        <span>Print Report</span>
                    </li>

                </ul>
            </div>


        </div>
    )
}

export default Sidebar