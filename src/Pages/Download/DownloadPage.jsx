import Dashboard from "../../Layouts/Dashboard";
import { useState } from "react";
export default function DownloadPage(){
    return (
        <Dashboard child={<Downloads/>}/>
    )
}

function Downloads(){
    const [urlVideo, setUrlVideo] = useState("");
    const handleDownload = async () => {
        try {
            const res = await fetch(`https://localhost:7024/api/AudioDownloader/download-audio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: urlVideo
                })
            });
    
            if (!res.ok) throw new Error('Error al descargar el audio');
    
            // Convertir la respuesta en un Blob
            const blob = await res.blob();
    
            // Crear una URL para el Blob
            const url = window.URL.createObjectURL(blob);
    
            // Crear un enlace de descarga
            const a = document.createElement('a');
            a.href = url;
            a.download = 'audio.mp3'; // Nombre del archivo a descargar
            document.body.appendChild(a);
            a.click();
            
            // Limpiar URL y remover el enlace
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
    
        } catch (e) {
            console.error('Error:', e);
        }
    };
    
    return(
        <div className="flex w-full min-h-screen flex-col p-4 items-center justify-center text-white">
            <div className="text-center my-10">
                <p>Paste your link here</p>
                <input type="link" name="videourl" 
                    onChange={ (e) => setUrlVideo(e.target.value)}
                    className="border border-white rounded-2xl w-[600px] m-3 p-2"  />
            </div>
            <div id="btn-group" className="flex justify-between w-1/2">
                <button className="text-white p-3 shadow-lg hover:shadow-red-600 rounded-2xl cursor-pointer">
                    Cancel 
                </button>
                <button onClick={handleDownload} className="text-white p-3 shadow-lg hover:shadow-cyan-400 rounded-2xl cursor-pointer">
                    Download 
                </button>
            </div>
            <div className="w-full justify-center relative hidden">
                <div className="h-40 w-40 bg-blue-600 -rotate-12 text-center">
                    <p id="description" className="text-center absolute top-15 left-15 right-15">
                        Loading...
                    </p>
                </div>
            </div>
            <div className="flex justify-end w-full mx-6">
                <button className="text-cyan-500 hover:text-2xl cursor-pointer px-10">
                    History
                </button>
            </div>
        </div>
    )
}