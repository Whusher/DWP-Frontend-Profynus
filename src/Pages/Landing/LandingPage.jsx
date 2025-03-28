import "./Animations/ShadowWrapper.css"
import anubis from "../../assets/anubis.webp"
import logo from "../../assets/LogoRound.webp"
import { Link } from "react-router"
import { useState } from "react"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Left side - Login Form */}
      <div
        id="left-side"
        className="flex w-full md:basis-1/2 bg-gradient-to-l from-black via-black via-35% to-cyan-900 text-white py-8 md:py-0"
      >
        <div
          id="form-target"
          className="flex flex-col justify-evenly items-center mx-auto md:mx-10 lg:mx-20 py-5 my-4 rounded-2xl 
                    w-[90%] md:w-full h-auto rotate-x-1 bg-transparent border-2 border-gray-400 text-black"
        >
          <div
            className="bg-cover shadow-2xl shadow-black bg-center w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full"
            style={{ backgroundImage: `url(${logo})` }}
          />

          <div
            id="form-container"
            className="flex-col flex w-full space-y-5 md:space-y-7 justify-center items-center text-white mt-4"
          >
            <div className="w-[85%] sm:w-3/4">
              <label htmlFor="email" className="block mb-2">
                Email:{" "}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border px-3 rounded-md h-10 border-cyan-400 w-full bg-black/40 text-white"
              />
            </div>

            <div className="w-[85%] sm:w-3/4">
              <label htmlFor="password" className="block mb-2">
                Password:{" "}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border px-3 rounded-md h-10 border-cyan-400 w-full bg-black/40 text-white"
              />
            </div>

            <div className="w-[85%] sm:w-3/4 text-center space-y-5 md:space-y-10 mt-2 md:mt-5">
              <p className="text-sm sm:text-base">
                Don't have an account?{" "}
                <span className="text-cyan-600 underline font-semibold hover:cursor-pointer hover:text-cyan-400 transition-colors">
                  Register now
                </span>
              </p>
              <p className="text-sm sm:text-base hover:text-cyan-400 transition-colors cursor-pointer">
                Restore password
              </p>
            </div>

            <div id="buttons-group" className="w-full text-center mb-4 md:mb-0">
              <Link
                to={"/home"}
                className="p-3 w-[140px] rounded-lg bg-gradient-to-t hover:text-cyan-300 hover:font-light 
                          from-gray-800 hover:scale-110 cursor-pointer transition-all delay-150 m-4 
                          text-white font-bold inline-block"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image and Promotion */}
      <div
        id="right-side"
        className="relative flex w-full md:basis-1/2 flex-col justify-center items-center bg-blend-color-dodge bg-black py-10 md:py-0"
      >
        <div
          id="image-container"
          className="z-10 p-4 mt-2 mx-auto bg-gradient-to-b from-60% from-black to-cyan-700 
                    shadow-2xl shadow-cyan-500 animate-[shake-shadow_8s_infinite_ease-in]"
        >
          <img
            src={anubis || "/placeholder.svg"}
            alt="business logotype"
            className="w-[15rem] sm:w-[18rem] md:w-[20rem]"
          />
        </div>

        <div
          id="promotion-lader"
          className="w-full flex flex-col sm:flex-row sm:space-x-5 justify-center items-center p-5 text-white mt-4"
        >
          <p className="w-full sm:w-1/2 text-center font-bold text-2xl md:text-3xl tracking-wider mb-4 sm:mb-0">
            PROFYNUS
          </p>

          {/* Separator line for desktop */}
          <div id="separator-line-virtual" className="hidden sm:block w-px mr-10 h-25" />

          {/* Animated separator */}
          <div
            id="separator-line"
            className="w-5 rounded-3xl absolute h-50 bottom-2 blur-lg center bg-gradient-to-b 
                      from-cyan-700 z-0 to-cyan-900/50 shadow-4xl shadow-cyan-500 p-1"
          />

          <p className="w-full sm:w-1/2 text-center text-sm sm:text-base">
            The application that your ears, essence and style need!
          </p>
        </div>
      </div>
    </div>
  )
}

