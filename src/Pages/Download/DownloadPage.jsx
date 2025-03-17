import Dashboard from "../../Layouts/Dashboard";

export default function DownloadPage(){
    return (
        <Dashboard child={<Downloads/>}/>
    )
}

function Downloads(){
    return(
        <div className="flex w-full min-h-screen flex-col p-4 items-center text-white">
            <div className="text-center my-10">
                <p>Paste your link here</p>
                <input type="link" className="border border-white rounded-2xl w-[600px] m-3 p-2"  />
            </div>
            <div id="btn-group" className="flex justify-between w-1/2">
                <button className="text-white p-3 shadow-lg hover:shadow-red-600 rounded-2xl cursor-pointer">
                    Cancel 
                </button>
                <button className="text-white p-3 shadow-lg hover:shadow-cyan-400 rounded-2xl cursor-pointer">
                    Download 
                </button>
            </div>
            <div className="w-full flex justify-center relative">
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