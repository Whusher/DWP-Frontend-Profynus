import MusicCardList from "../../ComponentsUI/MusicCardList";
import Dashboard from "../../Layouts/Dashboard";
import { useState, useEffect } from "react";
import { displayFiles } from "../../firebase/Initialization";


function Downloads() {
    const [publicSongs, setPublicSongs] = useState([])
    useEffect(()=>{
        displayFiles().then(res =>{
          setPublicSongs(res)
        }).catch(err =>{
          console.log(err)
        })
      },[])
    return (
        <div className="flex w-full flex-col p-4 min-h-screen items-center justify-center text-white">
            <p className="text-2xl text-center mt-5">Select your favorite song to listen or download!<span className="text-cyan-300 block">
                Its free
            </span>
            </p>
            <MusicCardList songs={publicSongs}/>
        </div>
    )
}

export default function DownloadPage() {
    return (
        <Dashboard child={<Downloads />} />
    )
}