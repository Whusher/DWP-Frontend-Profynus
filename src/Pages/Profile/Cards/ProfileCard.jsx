"use client"

import { TrashSVG } from "../../../Utils/SVGExporter"
import { motion } from "framer-motion"

export default function ProfileCard() {
  return (
    <motion.div
      className="w-full h-auto rounded-lg py-5 flex flex-col items-center bg-gradient-to-t from-black from-60% to-cyan-500 border-cyan-400 border-2 shadow-lg shadow-cyan-500/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <motion.div className="relative text-center my-0 mx-auto h-36" whileHover={{ scale: 1.05 }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-FZT2yMp4_pjDTHiEnrjZ43vSnGs3qjI3w&s"
          alt="Profile picture"
          className="rounded-full shadow-black shadow-2xl w-[100px] h-[100px] bg-black object-cover"
        />
        <motion.div
          className="absolute rounded-full top-20 left-18 h-[15px] w-[15px] bg-green-500"
          id="activeUser"
          animate={{
            boxShadow: ["0 0 0 0 rgba(74, 222, 128, 0.4)", "0 0 0 10px rgba(74, 222, 128, 0)"],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
          }}
        />
      </motion.div>

      <motion.p
        id="greeting"
        className="text-white text-xl font-medium mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Hello User! <span className="text-cyan-300">#25696</span>
      </motion.p>

      <div className="w-full max-w-xs px-6 mt-4">
        <motion.div
          className="bg-black/30 p-4 rounded-lg border border-cyan-800/50 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-white font-medium mb-2">Account Stats</h3>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-black/50 p-2 rounded-md">
              <p className="text-cyan-400 text-xl font-bold">12</p>
              <p className="text-gray-400 text-xs">Playlists</p>
            </div>
            <div className="bg-black/50 p-2 rounded-md">
              <p className="text-cyan-400 text-xl font-bold">128</p>
              <p className="text-gray-400 text-xs">Songs</p>
            </div>
            <div className="bg-black/50 p-2 rounded-md">
              <p className="text-cyan-400 text-xl font-bold">5.2</p>
              <p className="text-gray-400 text-xs">GB Used</p>
            </div>
            <div className="bg-black/50 p-2 rounded-md">
              <p className="text-cyan-400 text-xl font-bold">14</p>
              <p className="text-gray-400 text-xs">Days Active</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div id="info-container" className="text-white w-full max-w-xs px-6">
        <motion.div
          className="w-full flex flex-col space-x-0 my-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label htmlFor="email" className="block mb-2">
            Email:{" "}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border px-3 rounded-md h-10 border-cyan-400 w-full bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
        </motion.div>

        <motion.div
          className="w-full flex flex-col space-x-0 my-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label htmlFor="phone" className="block mb-2">
            Phone:{" "}
          </label>
          <input
            type="phone"
            name="phone"
            id="phone"
            className="border px-3 rounded-md h-10 border-cyan-400 w-full bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
        </motion.div>

        <motion.button
          className="w-full bg-cyan-500 text-black font-medium py-2 rounded-md mt-2 mb-6"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Save Changes
        </motion.button>
      </div>

      <motion.div
        id="btn-group"
        className="w-full text-center flex flex-col items-center space-y-2 mt-4 px-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-red-500 font-medium"> ! Danger zone !</p>
        <motion.button
          className="text-white bg-red-600 cursor-pointer font-semibold p-2 rounded-md flex items-center justify-center gap-2 w-full"
          whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
          whileTap={{ scale: 0.95 }}
        >
          Request delete my account <TrashSVG />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

