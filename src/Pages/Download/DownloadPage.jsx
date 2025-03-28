import Dashboard from "../../Layouts/Dashboard"
import MusicCardList from "../../ComponentsUI/MusicCardList"
import { useState, useEffect } from "react"
import { displayFiles } from "../../firebase/Initialization"
import { motion } from "framer-motion"

function Downloads() {
  const [publicSongs, setPublicSongs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", "Popular", "New Releases", "Trending", "Your Favorites"]

  useEffect(() => {
    setIsLoading(true)
    displayFiles()
      .then((res) => {
        setPublicSongs(res)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setError("Failed to load songs. Please try again later.")
        setIsLoading(false)
      })
  }, [])

  // Featured song (first song or a placeholder)
  const featuredSong = publicSongs.length > 0 ? publicSongs[0] : null

  return (
    <motion.div
      className="flex w-full flex-col min-h-screen bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section with Featured Song */}
      <section className="relative w-full">
        <div className="w-full h-[300px] md:h-[400px] bg-gradient-to-b from-cyan-900/30 to-black relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMkQzRUUiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAtOGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkgNCA0IDQgNC0xLjc5MSA0LTRtLTEyLTRjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTEyIDEyYzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0tMTIgNGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkgNCA0IDQgNC0xLjc5MSA0LTRtMTItMTJjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
          </div>

          <div className="container mx-auto px-4 py-12 h-full flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <motion.h1
                className="text-3xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Discover <span className="text-cyan-400">Amazing</span> Music
              </motion.h1>
              <motion.p
                className="text-lg text-gray-300 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Select your favorite songs to listen or download.{" "}
                <span className="text-cyan-300 font-medium">It's free!</span>
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-3 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button className="bg-cyan-500 text-black px-6 py-2 rounded-full font-medium hover:bg-cyan-400 transition-colors">
                  Browse All
                </button>
                <button className="bg-transparent border border-cyan-500 text-cyan-400 px-6 py-2 rounded-full font-medium hover:bg-cyan-900/30 transition-colors">
                  Top Charts
                </button>
              </motion.div>
            </div>

            {featuredSong && (
              <motion.div
                className="md:w-1/2 flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-black p-6 rounded-lg border border-cyan-500/50 flex items-center gap-6 max-w-md">
                    <div className="w-24 h-24 bg-cyan-900/50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 10,
                          ease: "linear",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 text-cyan-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5.5v-5l4.5 2.5-4.5 2.5z" />
                        </svg>
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Featured Track</h3>
                      <p className="text-cyan-400 text-lg">{featuredSong.title || featuredSong.name.split(".")[0]}</p>
                      <div className="flex gap-3 mt-3">
                        <button className="bg-cyan-500 text-black px-4 py-1 rounded text-sm font-medium hover:bg-cyan-400 transition-colors flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          Play Now
                        </button>
                        <button className="bg-transparent border border-cyan-500 text-cyan-400 px-4 py-1 rounded text-sm font-medium hover:bg-cyan-900/30 transition-colors">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category ? "bg-cyan-500 text-black" : "bg-black text-cyan-400 border border-cyan-500"
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Music Carousel */}
      {isLoading ? (
        <div className="container mx-auto px-4 py-8">
          <LoadingSkeleton />
        </div>
      ) : error ? (
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 max-w-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500 mx-auto mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p className="text-white text-lg">{error}</p>
            <button className="mt-4 bg-cyan-500 text-black px-4 py-2 rounded font-medium hover:bg-cyan-400 transition-colors">
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-4">
          <MusicCardList songs={publicSongs} />
        </div>
      )}

      {/* Music Categories */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Browse by <span className="text-cyan-400">Category</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {["Rock", "Pop", "Hip Hop", "Electronic", "Jazz", "Classical"].map((genre, index) => (
            <motion.div
              key={genre}
              className="bg-gradient-to-br from-cyan-900/30 to-black border border-cyan-800/30 rounded-lg p-4 text-center cursor-pointer hover:border-cyan-500 transition-colors"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="w-12 h-12 bg-cyan-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-white font-medium">{genre}</h3>
              <p className="text-xs text-gray-400 mt-1">12 songs</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4 justify-center">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full sm:w-[300px] h-[200px] bg-cyan-900/10 rounded-lg animate-pulse border border-cyan-900/20"
          ></div>
        ))}
      </div>
    </div>
  )
}

export default function DownloadPage() {
  return <Dashboard child={<Downloads />} />
}

