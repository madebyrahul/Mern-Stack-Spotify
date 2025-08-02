import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from "react-router-dom"
import PlayListCard from './PlayListCard'
import { UserData } from '../context/User';


const Sidebar = () => {
    
    const navigate = useNavigate()
    const {user} = UserData()

  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>

        <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
            <div onClick={()=> navigate("/")} className="flex items-center gap-3 pl-8 cursor-pointer">
                <img src={assets.home_icon} className='w-6' alt="icon" />
                <p className="font-bold">Home</p>
            </div>
            <div onClick={()=> navigate("/")} className="flex items-center gap-3 pl-8 cursor-pointer">
                <img src={assets.search_icon} className='w-6' alt="icon" />
                <p className="font-bold">Search</p>
            </div>
        </div>
        
        <div className="rounded h-[85%] bg-[#121212]">
            <div className="p-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <img src={assets.stack_icon} className='w-8' alt="icon" />
                    <p className="font-semibold">Your Library</p>
                 </div>

                 <div className="flex items-center gap-3">
                    <img src={assets.arrow_icon} className='w-8' alt="icon" />
                    <img src={assets.plus_icon} className='w-8' alt="icon" />
                 </div>
            </div>
            
            <div onClick={()=> navigate("/playlist")}>
                <PlayListCard/>
            </div>

            <div className="p-4 m-2 font-semibold bg-[#121212] rounded flex flex-col items-start justify-start gap-1 pl-4 mt-4">
                <h1>Let's findsome podcasts to follow</h1>
                <p className='font-light'>We'll keep you updated on new episodes</p>
                <button className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4">
                    Browse Podcasts
                </button>
            </div>

            { user && user.role === "admin" && (
                <button onClick={()=> navigate("/admin")} className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4">
                    Admin Dashboard
                </button>
            )

            }
        </div>

    </div>
  )
}

export default Sidebar
