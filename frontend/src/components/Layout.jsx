import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Player from './Player'

const Layout = ({children}) => {
  return (
    <div className='h-screen'>
        <div className="h-[90%] flex">
            <Sidebar/>
            
            <div className="w-[100%]  bg-[#121212] rounded px-6 pt-4 m-2 text-white overflow-auto lg:w-[75%]
            lg:ml-0">
                 <Navbar/>
                 {children}
            </div>

        </div>
        <Player/>
    </div>
  )
}

export default Layout
