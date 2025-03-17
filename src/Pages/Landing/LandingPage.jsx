import "./Animations/ShadowWrapper.css"
import anubis from "../../assets/anubis.webp"
import logo from "../../assets/LogoRound.webp"

export default function LandingPage() {
  return (
    <div className="flex w-full min-h-screen">

        <div id="lef-side" className="flex basis-1/2 bg-gradient-to-l from-black via-black via-35% to-cyan-900 text-white">
        {/* This will be the Login component after release */}
            <div id="form-target" className="flex flex-col justify-evently items-center mx-20 py-5 my-4 rounded-2xl w-full h-auto rotate-x-1 bg-transparent border-2 border-gray-400 text-black">
                    <div className="bg-cover shadow-2xl shadow-black bg-center w-40 h-40 rounded-full" style={{ backgroundImage: `url(${logo})` }}>                        
                    </div>
                    <div id="form-container" className="flex-col flex w-full space-y-7 justify-center items-center text-white">
                        <div className="w-3/4">
                            <label htmlFor="email" className="block mb-2">Email: </label>
                            <input type="email" name="email" id="email" className="border px-3 rounded-md h-10 border-cyan-400 w-full"/>
                        </div>
                        <div className="w-3/4">
                            <label htmlFor="password" className="block mb-2">Password: </label>
                            <input type="password" name="password" id="password" className="border px-3 rounded-md h-10 border-cyan-400 w-full" />
                        </div>
                        <div className="w-3/4 text-center space-y-10 mt-5">
                            <p>Don't have an account?  <span className="text-cyan-600 underline font-semibold hover:cursor-pointer"> Register now</span></p>
                            <p>Restore password</p>
                        </div>                        
                        <div id="buttons-group" className="w-fulltext-center">
                            <button className="py-1 px-3 w-[140px] rounded-lg bg-gradient-to-t hover:text-cyan-300 hover:font-light from-gray-800 hover:scale-110 cursor-pointer transition-all delay-150 m-4 text-white font-bold">
                                Login
                            </button>
                        </div>
                    </div>
            </div>
        </div>
        
        <div id="right-side" className="relative flex basis-1/2 flex-col justify-center items-center bg-blend-color-dodge bg-black">
            <div id="image-container" className="z-10 p-4 mt-2 mx-auto bg-gradient-to-b from-60% from-black to-cyan-700 shadow-2xl shadow-cyan-500 animate-[shake-shadow_8s_infinite_ease-in]">
                <img 
                    src={anubis} 
                    alt="bussiness logotype"
                    className="w-[20rem]"
                />
            </div>

            <div id="promotion-lader" className="w-full flex space-x-5 justify-center items-center p-5 text-white">
                <p className="w-1/2 text-center font-bold text-3xl tracking-wider">PROFYNUS</p>
                <div id="separator-line-virtual" 
                    className="w-px mr-10 h-25"
                >
                </div>
                <div id="separator-line" className="w-5 rounded-3xl absolute h-50 bottom-2 blur-lg center bg-gradient-to-b from-cyan-700 z-0 to-cyan-900/50 shadow-4xl shadow-cyan-500 p-1 "></div>
                <p className="w-1/2 text-center">The application that your ears, essence and style need!</p>
            </div>
        </div>    

    </div>
  )
}
