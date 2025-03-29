import { useState, useEffect, useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useLocation } from "react-router"
import { OrbitControls } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import * as THREE from "three"
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Download, Repeat, Music } from "lucide-react"

// Keep the original Three.js visualization components unchanged
const CyanWaveAnimation = () => {
  const meshRef = useRef()
  const [time, setTime] = useState(0)

  // Create stable geometry using useMemo to prevent unnecessary re-creation
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(10, 10, 100, 100)
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Update time for continuous animation
      setTime((prevTime) => prevTime + delta)

      const positions = meshRef.current.geometry.attributes.position.array

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]

        // More stable wave calculation
        positions[i + 2] = Math.sin(x * 2 + time * 2) * Math.cos(y * 2 + time) * Math.sin(time) * 0.5
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true

      // Gentler rotation
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1
      meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="cyan"
        wireframe={true}
        transparent={true}
        opacity={0.7}
        emissive="cyan"
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

const PixelSwarm = () => {
  const groupRef = useRef()
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Create a swarm of particles
    const newParticles = Array.from({ length: 200 }, () => ({
      position: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5],
      scale: Math.random() * 0.2 + 0.1,
      rotationSpeed: Math.random() * 0.02,
    }))
    setParticles(newParticles)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      particles.forEach((particle, index) => {
        const mesh = groupRef.current.children[index]
        if (mesh) {
          // Oscillating movement
          mesh.position.x += Math.sin(state.clock.elapsedTime * particle.rotationSpeed) * 0.02
          mesh.position.y += Math.cos(state.clock.elapsedTime * particle.rotationSpeed) * 0.02

          // Rotation
          mesh.rotation.x += particle.rotationSpeed
          mesh.rotation.y += particle.rotationSpeed
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position} scale={[particle.scale, particle.scale, particle.scale]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={0.5} transparent={true} opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

// Enhanced Media Player Component
const EnhancedMediaPlayer = ({
  defaultSong = { title: "Unknown Track", artist: "Unknown Artist", downloadURL: "" },
}) => {
  const location = useLocation()
  const [audioData, setAudioData] = useState([])
  const audioContextRef = useRef(null)
  const audioElementRef = useRef(null)
  const analyserRef = useRef(null)
  const animationFrameRef = useRef(null)

  // Enhanced player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const progressBarRef = useRef(null)

  // Get song data from navigation state or use default
  const song = location.state?.song || defaultSong

  // Format time in MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Setup audio context and analyzer
  const setupAudioContext = () => {
    setIsLoading(true)

    // Ensure AudioContext is created in a user-triggered event
    if (!audioContextRef.current) {
      const newAudioContext = new (window.AudioContext || window.webkitAudioContext)()
      audioContextRef.current = newAudioContext

      // Create audio element using the song URL
      const newAudioElement = new Audio(song.downloadURL)
      newAudioElement.crossOrigin = "anonymous"
      newAudioElement.loop = isLooping
      newAudioElement.volume = volume
      audioElementRef.current = newAudioElement

      // Add event listeners
      newAudioElement.addEventListener("loadedmetadata", () => {
        setDuration(newAudioElement.duration)
        setIsLoading(false)
      })

      newAudioElement.addEventListener("timeupdate", () => {
        setCurrentTime(newAudioElement.currentTime)
      })

      newAudioElement.addEventListener("ended", () => {
        if (!isLooping) {
          setIsPlaying(false)
        }
      })

      newAudioElement.addEventListener("error", (e) => {
        console.error("Audio error:", e)
        setIsLoading(false)
        setIsPlaying(false)
      })

      // Create analyser
      const analyser = newAudioContext.createAnalyser()
      const audioSource = newAudioContext.createMediaElementSource(newAudioElement)
      audioSource.connect(analyser)
      analyser.connect(newAudioContext.destination)
      analyser.fftSize = 256
      analyserRef.current = analyser

      // Setup data array
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Float32Array(bufferLength)

      // Animation loop for audio data
      const updateAudioData = () => {
        if (analyserRef.current) {
          analyserRef.current.getFloatFrequencyData(dataArray)
          setAudioData([...dataArray]) // Create a new array to trigger re-render
          animationFrameRef.current = requestAnimationFrame(updateAudioData)
        }
      }

      // Play audio
      playAudio()
      updateAudioData()
    } else {
      // If context already exists, just play/pause
      if (isPlaying) {
        pauseAudio()
      } else {
        playAudio()
      }
    }
  }

  // Play audio
  const playAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Error playing audio:", error)
          setIsLoading(false)
        })
    } else {
      setupAudioContext()
    }
  }

  // Pause audio
  const pauseAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause()
      setIsPlaying(false)
    }
  }

  // Stop audio completely
  const stopAudio = () => {
    // Stop audio playback
    if (audioElementRef.current) {
      audioElementRef.current.pause()
      audioElementRef.current.currentTime = 0
    }

    // Cancel animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }

    // Reset state
    setIsPlaying(false)
    setAudioData([])
    setCurrentTime(0)
    audioElementRef.current = null
    analyserRef.current = null
  }

  // Toggle mute
  const toggleMute = () => {
    if (audioElementRef.current) {
      if (isMuted) {
        audioElementRef.current.volume = volume
      } else {
        audioElementRef.current.volume = 0
      }
      setIsMuted(!isMuted)
    }
  }

  // Change volume
  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioElementRef.current) {
      audioElementRef.current.volume = newVolume
      if (newVolume > 0 && isMuted) {
        setIsMuted(false)
      }
    }
  }

  // Toggle loop
  const toggleLoop = () => {
    setIsLooping(!isLooping)
    if (audioElementRef.current) {
      audioElementRef.current.loop = !isLooping
    }
  }

  // Seek in track
  const handleSeek = (e) => {
    if (audioElementRef.current) {
      const seekTime = (e.nativeEvent.offsetX / progressBarRef.current.offsetWidth) * duration
      audioElementRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  // Skip forward 10 seconds
  const skipForward = () => {
    if (audioElementRef.current) {
      const newTime = Math.min(audioElementRef.current.currentTime + 10, duration)
      audioElementRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Skip backward 10 seconds
  const skipBackward = () => {
    if (audioElementRef.current) {
      const newTime = Math.max(audioElementRef.current.currentTime - 10, 0)
      audioElementRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Download the current song
  const downloadSong = () => {
    if (song.downloadURL) {
      const link = document.createElement("a")
      link.href = song.downloadURL
      link.download = `${song.title || "track"}.mp3`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Toggle controls visibility
  const toggleControls = () => {
    setShowControls(!showControls)
  }

  // Clean up on unmount
  useEffect(() => {
    return () => { //Always use before unmount component
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Get volume icon based on volume level
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={18} />
    if (volume < 0.5) return <Volume1 size={18} />
    return <Volume2 size={18} />
  }

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden">
      {/* 3D Visualization Canvas */}
      <Canvas camera={{ position: [-0.5, -10, -2], fov: 75 }}>
        <color attach="background" args={["black"]} />
        <OrbitControls />
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} intensity={0.2} />

        <CyanWaveAnimation />
        <PixelSwarm />
      </Canvas>

      {/* Song Info Overlay */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 text-white"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-cyan-900/50 rounded-lg flex items-center justify-center">
            <Music className="text-cyan-400" size={32} />
          </div>
          <div>
            <motion.h1
              className="text-2xl font-bold text-cyan-400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {song.title || "Unknown Track"}
            </motion.h1>
            <motion.p
              className="text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {song.artist || "Unknown Artist"}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Controls Toggle Button */}
      <motion.button
        className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-cyan-900/50 transition-colors"
        onClick={toggleControls}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {showControls ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        )}
      </motion.button>

      {/* Main Controls Panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress Bar */}
            <div className="mb-4">
              <div
                ref={progressBarRef}
                className="h-2 bg-gray-700 rounded-full cursor-pointer relative overflow-hidden"
                onClick={handleSeek}
              >
                <motion.div
                  className="absolute top-0 left-0 h-full bg-cyan-500"
                  style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                  animate={{
                    width: `${(currentTime / duration) * 100 || 0}%`,
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <button onClick={toggleMute} className="text-white hover:text-cyan-400 transition-colors">
                    {getVolumeIcon()}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, cyan ${volume * 100}%, #374151 ${volume * 100}%)`,
                    }}
                  />
                </div>

                {/* Loop Toggle */}
                <button
                  onClick={toggleLoop}
                  className={`p-2 rounded-full ${isLooping ? "text-cyan-400 bg-cyan-900/30" : "text-white hover:text-cyan-400"} transition-colors`}
                >
                  <Repeat size={18} />
                </button>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={skipBackward}
                  className="p-2 text-white hover:text-cyan-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipBack size={24} />
                </motion.button>

                <motion.button
                  // onClick={setupAudioContext} possible null referencing
                  className={`p-4 rounded-full ${isPlaying ? "bg-cyan-500" : "bg-white"} text-black`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <Pause size={24} onClick={()=> pauseAudio()} />
                  ) : (
                    <Play size={24} fill="currentColor"  onClick={()=> playAudio()}/>
                  )}
                </motion.button>

                <motion.button
                  onClick={skipForward}
                  className="p-2 text-white hover:text-cyan-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipForward size={24} />
                </motion.button>
              </div>

              {/* Download Button */}
              <motion.button
                onClick={downloadSong}
                className="p-2 text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                <span className="hidden sm:inline">Download</span>
              </motion.button>
            </div>

            {/* Audio Visualizer (Optional) */}
            <div className="mt-4 h-10 flex items-end justify-center gap-1">
              {audioData.slice(0, 64).map((value, index) => (
                <motion.div
                  key={index}
                  className="w-1 bg-cyan-500 rounded-t"
                  style={{
                    height: `${Math.max(0, (value + 140) / 2)}%`,
                    opacity: isPlaying ? 0.7 : 0.3,
                  }}
                  animate={{
                    height: `${Math.max(0, (value + 140) / 2)}%`,
                    opacity: isPlaying ? 0.7 : 0.3,
                  }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EnhancedMediaPlayer

