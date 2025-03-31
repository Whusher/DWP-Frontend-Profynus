import Dashboard from "../../Layouts/Dashboard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getUserDownloads } from "../../Services/music/MusicAPI";

export default function HistoryPage() {
  return <Dashboard child={<History />} />;
}

function History() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [downloads, setDownloads] = useState([]);
  const totalSize = 1.43; // GB
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    // Animate progress bar
    const timer = setTimeout(() => {
      setProgressWidth(100);
    }, 500);

    const fetchDownloads = async () => {
      try {
        const data = await getUserDownloads();
        if (Array.isArray(data)) {
          setDownloads(data);
        } else {
          console.error("Formato inesperado en la respuesta:", data);
          setDownloads([]);
        }
      } catch (error) {
        console.error("Error al obtener las descargas:", error);
        setDownloads([]);
      }
    };

    fetchDownloads();

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <motion.div
      className="flex flex-col w-full min-h-screen text-white bg-black"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div
        className="flex flex-col py-6 md:py-10 px-4 md:px-10 space-y-2"
        variants={itemVariants}
      >
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          Total size <span className="text-cyan-400">downloaded</span>
        </h3>

        {/* Progress bar */}
        <div className="w-full bg-gray-800 rounded-full h-6 mt-4 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-6 rounded-full flex items-center justify-end pr-2"
            initial={{ width: "0%" }}
            animate={{ width: `${progressWidth}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <span className="text-xs font-semibold text-black">
              {totalSize} GB
            </span>
          </motion.div>
        </div>

        <motion.p
          className="text-left text-lg text-cyan-300 mt-2"
          variants={itemVariants}
        >
          We celebrate your first GB! 🎉
        </motion.p>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full justify-between gap-6 px-4 md:px-10 pb-10">
        {/* New Users Section */}
        <motion.div
          className="lg:w-1/3 p-6 border-2 border-cyan-300 rounded-xl bg-black bg-opacity-50 "
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">
            Welcome to Profynus
          </h2>
          <p className="text-gray-300 mb-4">
            As a new user, here's what you can do:
          </p>

          <motion.ul className="space-y-3">
            {[
              "Discover new music",
              "Create playlists",
              "Follow your favorite artists",
              "Share with friends",
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 + 0.5 }}
              >
                <motion.div
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                  whileHover={{ scale: 1.5 }}
                />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.button
            className="mt-6 w-full py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Downloaded Songs Table */}
        <motion.div
          className="lg:w-2/3 p-6 rounded-xl shadow-lg shadow-cyan-500/20 bg-black bg-opacity-70 overflow-x-auto"
          variants={itemVariants}
        >
          <h2 className="text-white text-2xl font-bold mb-4">
            Last Downloaded Songs
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-cyan-400 shadow-md shadow-cyan-500/30">
              <thead>
                <tr className="bg-cyan-700 text-white">
                  <th className="p-3 border border-cyan-300">#</th>
                  <th className="p-3 border border-cyan-300">Song Name</th>
                  <th className="p-3 border border-cyan-300">Artist</th>
                  <th className="p-3 border border-cyan-300 hidden md:table-cell">
                    Album
                  </th>
                  <th className="p-3 border border-cyan-300">Size</th>
                </tr>
              </thead>
              <tbody>
                {downloads.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-3 text-center text-white">
                      No hay descargas disponibles
                    </td>
                  </tr>
                ) : (
                  downloads.map((song, index) => (
                    <motion.tr
                      key={song._id}
                      className="text-white hover:bg-cyan-900 transition-colors cursor-pointer"
                      variants={tableRowVariants}
                      custom={index}
                      whileHover={{
                        backgroundColor: "rgba(8, 145, 178, 0.2)",
                        transition: { duration: 0.1 },
                      }}
                    >
                      <td className="p-3 border border-cyan-300">
                        {index + 1}
                      </td>
                      <td className="p-3 border border-cyan-300">
                        {song.songName}
                      </td>
                      <td className="p-3 border border-cyan-300">
                        {song.artist}
                      </td>
                      <td className="p-3 border border-cyan-300 hidden md:table-cell">
                        {song.album}
                      </td>
                      <td className="p-3 border border-cyan-300">
                        {song.fileSize} MB
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <motion.button
            className="mt-4 px-4 py-2 bg-transparent border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-black transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All History
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
