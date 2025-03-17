import { TrashSVG } from "../../../Utils/SVGExporter";

export default function ProfileCard() {
    return (
        <div className="h-[600px] w-[400px] m-5 rounded-lg py-5 flex flex-col items-center bg-gradient-to-t from-black from-60% to-cyan-500 border-cyan-400 border-2">
            <div className="relative text-center my-0 mx-auto h-36">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-FZT2yMp4_pjDTHiEnrjZ43vSnGs3qjI3w&s"
                    alt="Profile picture" className="rounded-full shadow-black shadow-2xl w-[100px] h-[100px] bg-black object-cover" />
                <div className="absolute rounded-full top-20 left-18 h-[15px] w-[15px] bg-green-500" id="activeUser">
                </div>
            </div>
            <p id="greeting" className="text-white">Hello User! #25696</p>
            <div id="info-container" className="text-white">
                <div className="w-full flex flex-col space-x-2 my-4">
                    <label htmlFor="email" className="block mb-2">Email: </label>
                    <input type="email" name="email" id="email" className="border px-3 min-w-[180px] rounded-md h-10 border-cyan-400 w-full flex space-x-1" />
                </div>
                <div className="w-full flex flex-col space-x-2 my-4">
                    <label htmlFor="phone" className="block mb-2">Phone: </label>
                    <input type="phone" name="phone" id="phone" className="border px-3  min-w-[180px] rounded-md h-10 border-cyan-400 w-full" />
                </div>
            </div>
            <div id="btn-group" className="w-full text-center flex flex-col items-center space-y-2">
                <p className="text-red-700"> ! Danger zone !</p>
                <button className="text-white bg-red-600 cursor-pointer font-semibold p-1 rounded-b-2xl flex flex-col justify-between items-center">
                    Request delete my account <TrashSVG />
                </button>
            </div>
        </div>
    )
}
