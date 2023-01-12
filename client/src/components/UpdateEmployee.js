import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
export const UpdateEmployee = () => {
  return (
      <div>
          <Navbar />
          <div className='flex'>
              <Sidebar />
              
              <div className="flex flex-col items-center justify-center w-full h-full">
                  {/* Search Employee by name */}
                  <form className=' flex flex-col mt-8 w-[900px] h-[530px] bg-slate-200 rounded-md shadow-md'>
                      <label htmlFor="search" className='w-full px-4 py-2 font-semibold ' >Search Employee</label>
                      <input type="text" placeholder='search employee' id='search' className='px-2 py-2
                        mx-4 outline-none rounded-lg'/>
                      <button className='w-1/4 px-4 py-2 mx-auto mt-4 text-white bg-slate-500 rounded-md shadow-md hover:bg-blue-600'
                      >Search</button>
                    </form>
              </div>
              
          </div>
          
    </div>
  )
}
