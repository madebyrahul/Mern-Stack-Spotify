import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { SongData } from '../context/Song'
import { assets } from '../assets/assets'
import { FaBookmark, FaPlay } from 'react-icons/fa'
import { UserData } from '../context/User'

const PlayList = ({user}) => {
  const { songs, setSelectedSong, setIsPlaying } = SongData()
  const [myPlaylist, setMyPlaylist] = useState([])

  useEffect(()=>{
      if(songs && user && Array.isArray(user.playlist)){
        const filteredSongs = songs.filter((e)=>
           user.playlist.includes(e._id.toString())
        )
        setMyPlaylist(filteredSongs)
      }
      
  },[songs,user])

  const onclickHandler =(id)=>{
    setSelectedSong(id)
    setIsPlaying(true)
  }

  const {addToPlaylist} = UserData()

  const savePlayListHandler =(id)=>{
      addToPlaylist(id)
  }


  return (
    <Layout>
        <div className="mt-10 items-center flex gap-8 flex-col md:flex-row md:items-center">
            {
              myPlaylist && myPlaylist[0] ? (
                <img className='w-48 h-48 rounded object-contain' src={myPlaylist[0].thumbnail.url} alt="thumbnail" />
              ) : (
                 <img className='w-48 h-48 rounded object-contain' src="https://placehold.co/250" 
                 alt="dummy" />
              )
            }

            <div className="flex flex-col ">
               <p>Playlist</p>
               <h2 className='text-3xl font-bold mb-4 md:text-5xl'>{user.name} PlayList </h2>
               <h4>Your Favourite Songs</h4>
               <p className="mt-1">
                  <img className='inline-block w-6' src={assets.spotify_logo} alt="logo" />
               </p>
            </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
             <div>
                  <b className="mr-4">#</b>
             </div>
             <div>Artist</div>
             <div className="hidden sm:block">Description</div>
             <div className="text-center">Actions</div>
        </div>

        <hr />

        {
          myPlaylist && myPlaylist.map((e,i)=>(
             <div key={i} className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 
             text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer">
                 <div className="text-white">
                    <b className="mr-4 text-[#a7a7a7]">{i+1}</b>
                    <img src={e.thumbnail.url} className='inline w-10 h-10 object-contain mr-5' alt="thumbnail" />
                    {e.title.slice(0,8)}
                 </div>
                 <div className="text-[15px]">{e.singer}</div>
                 <div className="text-[15px] hidden sm:block">{e.description.slice(0,20)}...</div>
                 <div className="flex justify-center items-center gap-5">
                     <div onClick={()=> savePlayListHandler(e._id)} className='text-[15px] text-center'><FaBookmark/></div>
                     <div onClick={()=> onclickHandler(e._id)} className='text-[15px] text-center'><FaPlay/></div>
                 </div>
             </div>
          ))
        }
    </Layout>
  )
}

export default PlayList
