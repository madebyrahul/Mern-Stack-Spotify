import React, { useEffect, useRef, useState } from 'react'
import { SongData } from '../context/Song'
import { GrChapterPrevious } from "react-icons/gr";
import { GrChapterNext } from "react-icons/gr";
import { FaPause, FaPlay } from 'react-icons/fa';


const Player = () => {
   
    const {song, fetchSingleSong, selectedSong, isPlaying, setIsPlaying, nextMusic, prevMusic} = SongData()
    

    useEffect(()=>{
        fetchSingleSong()
    }, [selectedSong])
    
    const audioRef = useRef(null)

    const handlePlayPause = ()=>{
        if(isPlaying){
            audioRef.current.pause()
        }else{
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const [volume, setVolume] = useState(1)

    const handleVolumeChange = (e)=>{
        const newVolume = e.target.value
        setVolume(newVolume)
        audioRef.current.volume = newVolume
    }

    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(()=>{
        const audio = audioRef.current
        if(!audio) return
        const handleLoadedMetaData = ()=>{
            setDuration(audio.duration)
        }
        const handleTimeUpdate = ()=>{
            setProgress(audio.currentTime)
        }
        audio.addEventListener("loadedmetadata", handleLoadedMetaData)
        audio.addEventListener("timeupdate", handleTimeUpdate)

        return ()=>{
            audio.removeEventListener("loadedmetadata", handleLoadedMetaData)
            audio.removeEventListener("timeupdate", handleTimeUpdate)
        }
    },[song])
     
    const handleProgressChange = (e)=>{
        const newTime = (e.target.value/100)*duration
        audioRef.current.currentTime = newTime
        setProgress(newTime)
    }

  return (
    <div>
         {
            song && <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
                 <div className="lg:flex items-center gap-4">
                       <img className='w-12 h-12 object-contain' src={song.thumbnail? song.thumbnail.url : (
                          "https://placehold.co/50"
                       )} alt="" />
                       <div className="hidden md:block">
                          <p>{song.title}</p>
                          <p>{song.description && song.description.slice(0,30)}...</p>
                       </div>
                 </div>
                
                <div className="flex flex-col items-center gap-1 m-auto">
                    { song && song.audio && <>
                        
                       {isPlaying? (
                          <audio ref={audioRef} src={song.audio.url}  autoPlay/>   
                       ) : (
                          <audio ref={audioRef} src={song.audio.url} />  
                       )
                       }
                    
                    </>
                     }
                    <div className="w-full flex items-center font-thin text-green-400">
                          <input value={duration ? (progress / duration) * 100 : 0} onChange={handleProgressChange} type="range" min={"0"} max={"100"} className='progress-bar w-[120px] 
                          md:w-[300px] ' />
                    </div>

                    <div className="flex justify-center items-center gap-4">
                          <span onClick={prevMusic} className="cursor-pointer">
                                <GrChapterPrevious/>
                          </span>
                          <button onClick={handlePlayPause} className='bg-white text-black rounded-full p-2'>
                            {isPlaying? <FaPause/> : <FaPlay/>}
                          </button>
                          <span onClick={nextMusic} className="cursor-pointer">
                                <GrChapterNext/>
                          </span>
                    </div>

                </div> 

                <div className="flex items-center">
                    <input value={volume} onChange={handleVolumeChange} min={"0"} max={"1"} step={"0.01"} type="range" className='w-16 md:w-32' />
                </div>

            </div>
         }
    </div>
  )
}

export default Player
