import React, { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLocation } from "react-router";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

const HudElements = () => {
  return (
    <group>
      <motion.mesh
        position={[-2, 1, 0]}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        <boxGeometry args={[1, 0.2, 0.2]} />
        <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={0.5} />
      </motion.mesh>
      <motion.mesh
        position={[2, -1, 0]}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={0.5} />
      </motion.mesh>
    </group>
  );
};

const CyanWaveAnimation = () => {
  const meshRef = useRef();
  const [time, setTime] = useState(0);

  // Create stable geometry using useMemo to prevent unnecessary re-creation
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(10, 10, 100, 100);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Update time for continuous animation
      setTime(prevTime => prevTime + delta);

      const positions = meshRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        
        // More stable wave calculation
        positions[i + 2] = Math.sin(x * 2 + time * 2) * 
                           Math.cos(y * 2 + time) * 
                           Math.sin(time) * 0.5;
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Gentler rotation
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.1;
    }
  });

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
  );
};

const PixelSwarm = () => {
  const groupRef = useRef();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create a swarm of particles
    const newParticles = Array.from({ length: 200 }, () => ({
      position: [
        Math.random() * 10 - 5, 
        Math.random() * 10 - 5, 
        Math.random() * 10 - 5
      ],
      scale: Math.random() * 0.2 + 0.1,
      rotationSpeed: Math.random() * 0.02
    }));
    setParticles(newParticles);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      particles.forEach((particle, index) => {
        const mesh = groupRef.current.children[index];
        if (mesh) {
          // Oscillating movement
          mesh.position.x += Math.sin(state.clock.elapsedTime * particle.rotationSpeed) * 0.02;
          mesh.position.y += Math.cos(state.clock.elapsedTime * particle.rotationSpeed) * 0.02;
          
          // Rotation
          mesh.rotation.x += particle.rotationSpeed;
          mesh.rotation.y += particle.rotationSpeed;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <mesh 
          key={index} 
          position={particle.position}
          scale={[particle.scale, particle.scale, particle.scale]}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial 
            color="cyan" 
            emissive="cyan" 
            emissiveIntensity={0.5} 
            transparent={true} 
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

const App = () => {
  const location = useLocation();
  const [audioData, setAudioData] = useState([]);
  const audioContextRef = useRef(null);
  const audioElementRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // const setupAudioContext = () => {
  //   // Ensure AudioContext is created in a user-triggered event
  //   if (!audioContextRef.current) {
  //     const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
  //     audioContextRef.current = newAudioContext;

  //     // Create audio element
  //     const newAudioElement = new Audio('/LoAirBadGirl.mp3');
  //     newAudioElement.crossOrigin = "anonymous";
  //     newAudioElement.loop = true;
  //     audioElementRef.current = newAudioElement;

  //     // Create analyser
  //     const analyser = newAudioContext.createAnalyser();
  //     const audioSource = newAudioContext.createMediaElementSource(newAudioElement);
  //     audioSource.connect(analyser);
  //     analyser.connect(newAudioContext.destination);
  //     analyser.fftSize = 256;
  //     analyserRef.current = analyser;

  //     // Setup data array
  //     const bufferLength = analyser.frequencyBinCount;
  //     const dataArray = new Float32Array(bufferLength);

  //     // Animation loop for audio data
  //     const updateAudioData = () => {
  //       if (analyserRef.current) {
  //         analyserRef.current.getFloatFrequencyData(dataArray);
  //         setAudioData([...dataArray]); // Create a new array to trigger re-render
  //         animationFrameRef.current = requestAnimationFrame(updateAudioData);
  //       }
  //     };

  //     // Play audio
  //     newAudioElement.play()
  //       .then(() => {
  //         setIsPlaying(true);
  //         updateAudioData();
  //       })
  //       .catch((error) => {
  //         console.error("Error playing audio:", error);
  //       });
  //   }
  // };

  const setupAudioContext = () => {
    console.log(location.state?.song?.downloadURL)
    // Ensure AudioContext is created in a user-triggered event
    if (!audioContextRef.current) {
      const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = newAudioContext;
      
      // Create audio element using the song URL from navigation state
      const newAudioElement = new Audio(location.state?.song?.downloadURL);
      newAudioElement.crossOrigin = "anonymous";
      newAudioElement.loop = true;
      audioElementRef.current = newAudioElement;
  
      // Create analyser
      const analyser = newAudioContext.createAnalyser();
      const audioSource = newAudioContext.createMediaElementSource(newAudioElement);
      audioSource.connect(analyser);
      analyser.connect(newAudioContext.destination);
      analyser.fftSize = 256;
      analyserRef.current = analyser;
  
      // Setup data array
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);
  
      // Animation loop for audio data
      const updateAudioData = () => {
        if (analyserRef.current) {
          analyserRef.current.getFloatFrequencyData(dataArray);
          setAudioData([...dataArray]); // Create a new array to trigger re-render
          animationFrameRef.current = requestAnimationFrame(updateAudioData);
        }
      };
  
      // Play audio
      newAudioElement.play()
        .then(() => {
          setIsPlaying(true);
          updateAudioData();
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    }
  };
  const stopAudio = () => {
    // Stop audio playback
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }

    // Cancel animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Reset state
    setIsPlaying(false);
    setAudioData([]);
    audioElementRef.current = null;
    analyserRef.current = null;
  };

  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "black", position: "relative" }}>
      <Canvas camera={{ position: [-.5, -10, -2], fov: 75 }}>
        <color attach="background" args={['black']} />
        {/* Let the user move the current scene */}
        <OrbitControls />
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} intensity={0.2} />
        
        <CyanWaveAnimation />
        <PixelSwarm />
        
        {/* <HudElements /> */}
      </Canvas>

      <div style={{ 
        position: "absolute", 
        bottom: "20px", 
        left: "50%", 
        transform: "translateX(-50%)", 
        display: "flex", 
        gap: "10px" 
      }}>
        {!isPlaying ? (
          <button 
            onClick={setupAudioContext} 
            style={{ 
              padding: "10px 20px", 
              fontSize: "16px", 
              backgroundColor: "cyan", 
              color: "black", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer" 
            }}
          >
            Play
          </button>
        ) : (
          <button 
            onClick={stopAudio} 
            style={{ 
              padding: "10px 20px", 
              fontSize: "16px", 
              backgroundColor: "red", 
              color: "white", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer" 
            }}
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default App;