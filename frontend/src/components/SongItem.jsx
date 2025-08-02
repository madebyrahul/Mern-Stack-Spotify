import React, { useEffect, useState } from 'react'
import { FaBookmark, FaPlay, FaRegBookmark } from 'react-icons/fa'
import { UserData } from '../context/User'
import { SongData } from '../context/Song'

const SongItem = ({ image, name, desc, id }) => {
    const [saved, setSaved] = useState(false)
    const {addToPlaylist, user} = UserData()

    const {setSelectedSong, isPlaying, setIsPlaying} = SongData()
    
      const playList = user.playlist
      
      useEffect(()=>{
         if(playList && playList.includes(id)){
            setSaved(true)
         }
      }, [user])
    
    const savetoPlaylistHandler = ()=>{
        setSaved(!saved)
        addToPlaylist(id)
    }

    return (
        <div className='min-w-[181px] min-h-[230px] p-2 px-3 rounded
     cursor-pointer hover:bg-[#ffffff26]'>
            <div className="relative group">
                <img src={image} className='rounded w-[160px] h-[160px] object-contain' alt="image" />
                <div className="flex gap-2">
                    <button className='absolute bottom-2 right-14 bg-green-500 text-black p-3
                  rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 '
                    onClick={()=> {
                        setSelectedSong(id)
                        setIsPlaying(true)  
                    }}
                    >
                        <FaPlay />
                    </button>
                    <button onClick={savetoPlaylistHandler} className='absolute bottom-2 right-2 bg-green-500 text-black p-3
                  rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 '>
                        {saved? <FaBookmark /> : <FaRegBookmark/>}
                    </button>
                </div>
            </div>
            <p className="font-bold mt-2 mb-1">{name.slice(0, 12)}...</p>
            <p className="text-slate-200 text-sm">{desc.slice(0, 18)}...</p>
        </div>
    )
}

export default SongItem
