"use client"

import Dashboard from "../../Layouts/Dashboard"
import ProfileCard from "./Cards/ProfileCard"
import { motion } from "framer-motion"
import { useState } from "react"

export default function ProfilePage() {
  return <Dashboard child={<Profile />} />
}

function Profile() {
  const [activePlaylist, setActivePlaylist] = useState(0)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  // Sample playlists data
  const playlists = [
    {
      id: 1,
      name: "Chill Vibes",
      coverUrl: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=300",
      songs: [
        { title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
        { title: "Levitating", artist: "Dua Lipa", duration: "3:23" },
        { title: "Save Your Tears", artist: "The Weeknd", duration: "3:35" },
        { title: "G.O.M.D speaker audio", artist: "J. Cole", duration: "4:52" },
      ],
      totalDuration: "14m 10s",
      createdAt: "2 weeks ago",
    },
    {
      id: 2,
      name: "Workout Mix",
      coverUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=300",
      songs: [
        { title: "Stronger", artist: "Kanye West", duration: "5:12" },
        { title: "Eye of the Tiger", artist: "Survivor", duration: "4:05" },
        { title: "Till I Collapse", artist: "Eminem", duration: "4:57" },
      ],
      totalDuration: "14m 14s",
      createdAt: "1 month ago",
    },
    {
      id: 3,
      name: "Focus Mode",
      coverUrl: "https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?q=80&w=300",
      songs: [
        { title: "Experience", artist: "Ludovico Einaudi", duration: "5:15" },
        { title: "Time", artist: "Hans Zimmer", duration: "4:35" },
        { title: "Strobe", artist: "Deadmau5", duration: "10:37" },
      ],
      totalDuration: "20m 27s",
      createdAt: "3 days ago",
    },
  ]

  return (
    <motion.div
      className="min-h-screen w-full bg-black p-4 md:p-6 lg:p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Profile Card Section */}
        <motion.div className="lg:w-1/3" variants={itemVariants}>
          <ProfileCard />
        </motion.div>

        {/* Playlists Section */}
        <motion.div className="lg:w-2/3 text-white" variants={itemVariants}>
          <div className="bg-gradient-to-r from-cyan-900/30 to-black p-6 rounded-lg border border-cyan-800/50">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-400">Your Music Collection</h2>

            {/* Playlists Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {playlists.map((playlist, index) => (
                <motion.button
                  key={playlist.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activePlaylist === index
                      ? "bg-cyan-500 text-black"
                      : "bg-black text-cyan-400 border border-cyan-500"
                  }`}
                  onClick={() => setActivePlaylist(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {playlist.name}
                </motion.button>
              ))}

              <motion.button
                className="px-4 py-2 rounded-full text-sm font-medium bg-black text-cyan-400 border border-cyan-500 border-dashed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                + New Playlist
              </motion.button>
            </div>

            {/* Active Playlist */}
            <motion.div
              className="bg-black/50 rounded-lg border border-cyan-800/30 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              key={activePlaylist}
            >
              <div className="flex flex-col md:flex-row gap-4 p-4">
                {/* Playlist Cover and Info */}
                <div className="md:w-1/3">
                  <div className="relative group">
                    <img
                      src={playlists[activePlaylist].coverUrl || "/placeholder.svg"}
                      alt={playlists[activePlaylist].name}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                      <motion.button
                        className="bg-cyan-500 text-black rounded-full p-3"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M8 5.14v14l11-7-11-7z" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3 className="text-xl font-bold">{playlists[activePlaylist].name}</h3>
                    <p className="text-gray-400 text-sm">
                      {playlists[activePlaylist].songs.length} songs • {playlists[activePlaylist].totalDuration}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">Created {playlists[activePlaylist].createdAt}</p>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <motion.button
                      className="bg-cyan-500 text-black px-4 py-2 rounded-md text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Play All
                    </motion.button>
                    <motion.button
                      className="bg-transparent border border-cyan-500 text-cyan-400 px-4 py-2 rounded-md text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Share
                    </motion.button>
                  </div>
                </div>

                {/* Songs List */}
                <div className="md:w-2/3">
                  <div className="bg-black/30 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-[auto_1fr_auto] gap-2 p-2 text-xs text-gray-400 border-b border-gray-800">
                      <div className="px-2">#</div>
                      <div>TITLE</div>
                      <div className="px-2">DURATION</div>
                    </div>

                    {playlists[activePlaylist].songs.map((song, index) => (
                      <motion.div
                        key={index}
                        className="grid grid-cols-[auto_1fr_auto] gap-2 p-2 hover:bg-cyan-900/20 transition-colors rounded-md cursor-pointer items-center"
                        whileHover={{ backgroundColor: "rgba(8, 145, 178, 0.1)" }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="w-8 h-8 flex items-center justify-center text-gray-400">{index + 1}</div>
                        <div>
                          <p className="font-medium">{song.title}</p>
                          <p className="text-sm text-gray-500">{song.artist}</p>
                        </div>
                        <div className="text-gray-400 px-2">{song.duration}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <motion.button
                      className="text-cyan-400 text-sm flex items-center gap-1"
                      whileHover={{ scale: 1.05, color: "#22d3ee" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add more songs
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recently Played Section */}
          <motion.div
            className="mt-6 bg-gradient-to-r from-black to-cyan-900/30 p-6 rounded-lg border border-cyan-800/50"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4">Recently Played</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[...Array(5)].map((_, index) => (
                <motion.div
                  key={index}
                  className="bg-black/50 p-2 rounded-md hover:bg-cyan-900/20 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(8, 145, 178, 0.2)" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="aspect-square bg-cyan-900/20 rounded-md mb-2 overflow-hidden">
                    <img
                      src={`https://source.unsplash.com/random/100x100?music&sig=${index}`}
                      alt="Song cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium truncate">Song Title {index + 1}</p>
                  <p className="text-xs text-gray-500 truncate">Artist Name</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

