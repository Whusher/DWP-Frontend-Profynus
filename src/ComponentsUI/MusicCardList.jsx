import { useNavigate } from "react-router"
import { formatFileSize } from "../Utils/FIleSizeHelper"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { Heart, Disc3, Play, Download, ChevronLeft, ChevronRight, Clock, Music } from "lucide-react"
import { motion } from "framer-motion"
import { registerDownload } from "../Services/music/MusicAPI"
import { useState } from "react"

// Define responsive breakpoints
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1600 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1600, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
}

// Custom arrow components for the carousel
const CustomRightArrow = ({ onClick }) => {
  return (
    <motion.button
      className="absolute right-0 -mr-4 z-10 bg-cyan-500 text-black rounded-full p-2 shadow-lg"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ChevronRight size={24} />
    </motion.button>
  )
}

const CustomLeftArrow = ({ onClick }) => {
  return (
    <motion.button
      className="absolute left-0 -ml-4 z-10 bg-cyan-500 text-black rounded-full p-2 shadow-lg"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ChevronLeft size={24} />
    </motion.button>
  )
}

// Enhanced MusicCard component
const MusicCard = ({ song }) => {
  const [name] = song.name.split(".")
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleClick = () => {
    // Navigate to the player page with song details
    navigate("/player", {
      state: {
        song: {
          title: song.title || name,
          downloadURL: song.downloadURL,
          name: song.name,
          metadata: song.metadata,
        },
      },
    })
  }

  const toggleFavorite = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  // const handleDownload = async(e) => {
  //   e.stopPropagation()
  //   try {
  //     const response = await fetch(song.downloadURL);
  //     const blob = await response.blob();
  //     const link = document.createElement("a");
      
  //     link.href = URL.createObjectURL(blob);
  //     link.download = name;
  //     document.body.appendChild(link);
  //     link.click();
      
  //     // Eliminar el link después de la descarga
  //     document.body.removeChild(link);
  //     URL.revokeObjectURL(link.href);
  //   } catch (error) {
  //     console.error("Error al descargar el archivo:", error);
  //   }
  //   // // Download logic here
  //   // window.open(song.downloadURL, "_blank")
  // }
  const handleDownload = async (e) => {
    e.stopPropagation();
  
    try {
      const response = await fetch(song.downloadURL);
      const blob = await response.blob();
      const sizeMB = (blob.size / (1024 * 1024)).toFixed(2); // Convertir a MB
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      await registerDownload({
          userId: "Will set a token",
          songName: name,
          artist: "Desconocido", // Asegúrate de obtener este dato si está disponible
          album: "Desconocido", // Asegúrate de obtener este dato si está disponible
          size: sizeMB,
          downloadURL: song.downloadURL,
        });
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };
  

  return (
    <motion.div
      className="bg-gradient-to-b from-black to-cyan-950/30 border-2 border-cyan-800/50 rounded-xl overflow-hidden shadow-lg"
      whileHover={{
        scale: 1.03,
        borderColor: "rgba(8, 145, 178, 0.8)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Album art or visualizer */}
        <div className="h-40 bg-gradient-to-br from-cyan-900/50 to-black overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={
                isHovered
                  ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse",
              }}
            >
              <Disc3 className="text-cyan-500" size={80} />
            </motion.div>
          </div>

          {/* Audio visualizer bars (decorative) */}
          <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center gap-1 px-4">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-cyan-500/70 rounded-t"
                initial={{ height: 5 }}
                animate={
                  isHovered
                    ? {
                        height: [5, 5 + Math.random() * 30, 5],
                      }
                    : {}
                }
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          {/* Play button overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0"
            animate={{ opacity: isHovered ? 0.6 : 0 }}
          >
            <motion.button
              className="bg-cyan-500 text-black rounded-full p-4 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Play size={24} fill="currentColor" />
            </motion.button>
          </motion.div>
        </div>

        {/* Song info */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-bold text-white truncate">{song.title || name}</h3>
              <p className="text-sm text-cyan-400 truncate">{song.artist || "Unknown Artist"}</p>
            </div>
            <motion.button
              className={`rounded-full p-2 ${isFavorite ? "text-red-500" : "text-gray-400"}`}
              onClick={toggleFavorite}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            </motion.button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-400">
              <Clock size={14} className="mr-1" />
              <span>{song.duration || "3:45"}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Music size={14} className="mr-1" />
              <span>{formatFileSize(song.metadata.size)}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between mt-4">
            <motion.button
              className="bg-cyan-500 text-black px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-1"
              whileHover={{ scale: 1.05, backgroundColor: "#22d3ee" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
            >
              <Play size={16} />
              Play
            </motion.button>
            <motion.button
              className="bg-transparent border border-cyan-500 text-cyan-400 px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-1"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(8, 145, 178, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
            >
              <Download size={16} />
              Download
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Enhanced MusicCardList component
const MusicCardList = ({ songs = [] }) => {
  if (!songs || songs.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <div className="bg-cyan-900/20 border border-cyan-800/50 rounded-lg p-8 max-w-md mx-auto">
          <Disc3 className="text-cyan-500 mx-auto mb-4" size={60} />
          <h3 className="text-xl font-bold text-white mb-2">No songs available</h3>
          <p className="text-gray-400">Check back later for new music or try refreshing the page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="relative">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={songs.length > 3}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
          containerClass="carousel-container py-8"
          itemClass="px-3"
          removeArrowOnDeviceType={["mobile"]}
          dotListClass="custom-dot-list-style"
        >
          {songs.map((song, idx) => (
            <MusicCard key={idx} song={song} />
          ))}
        </Carousel>
      </div>

      {/* Additional section below carousel */}
      <div className="mt-8 mb-4 text-center">
        <motion.button
          className="bg-transparent border-2 border-cyan-500 text-cyan-400 px-6 py-2 rounded-full font-medium hover:bg-cyan-900/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Songs
        </motion.button>
      </div>
    </div>
  )
}

export default MusicCardList

