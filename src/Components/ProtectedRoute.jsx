import { Navigate, Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { verifyToken } from '../Services/APIBase';
import { toast } from 'react-toastify';

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ProtectedRoute = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await delay(500)// two seconds of banner
        // Check if token exists
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            error: 'No authentication token found'
          });
          return;
        }
        
        // Set timeout to prevent infinite loading if API is down
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Authentication request timed out')), 8000);
        });
        
        // Race between the API call and the timeout
        await Promise.race([
          verifyToken(),
          timeoutPromise
        ]);
        
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } catch (error) {
        // console.error('Authentication verification failed:', error);
        
        // Determine appropriate error message
        let errorMessage = 'Authentication failed';
        if (error.response) {
          // Server responded with error
          if (error.response.status === 401) {
            errorMessage = 'Your session has expired. Please log in again.';
          } else {
            errorMessage = error.response.data?.message || 'Server error. Please try again.';
          }
        } else if (error.message === 'Authentication request timed out') {
          errorMessage = 'Connection timed out. Please check your internet connection.';
        }
        
        // Show toast notification for better UX
        toast.error(errorMessage);
        
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: errorMessage
        });
      }
    };

    verifyAuth();
  }, []);

  if (authState.isLoading) {
    return <ProfynusLoader />;
  }

  return authState.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

// Stylish Profynus Loader Component
const ProfynusLoader = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="relative">
        {/* Pulsing background glow */}
        <motion.div
          className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Logo */}
        <motion.div
          className="relative z-10 mb-8 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-4xl font-bold text-white mb-2">
            PROF<span className="text-cyan-400">YNUS</span>
          </div>
          <div className="text-sm text-gray-400">Authenticating your session</div>
        </motion.div>
        
        {/* Animated loader */}
        <div className="relative flex justify-center items-center h-20">
          {/* Spinning outer ring */}
          <motion.div
            className="absolute w-16 h-16 border-4 border-t-cyan-500 border-cyan-500/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Pulsing inner circle */}
          <motion.div
            className="absolute w-8 h-8 bg-cyan-500/50 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Music note animations */}
          <AnimatePresence>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-cyan-400 text-xl"
                initial={{ 
                  opacity: 0, 
                  y: 0,
                  x: -10 + i * 10
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: -40,
                  rotate: [-10, 10]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: i * 0.8,
                  ease: "easeOut"
                }}
              >
                {i % 2 === 0 ? '♪' : '♫'}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Loading text */}
      <motion.div
        className="mt-8 text-gray-400 text-sm flex items-center"
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex space-x-1">
          {/* {['L', 'o', 'a', 'd', 'i', 'n', 'g'].map((letter, index) => (
            <motion.span
              key={index}
              animate={{
                y: [0, -5, 0]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 0.05,
                delay: index * 0.05
              }}
            >
              {letter}
            </motion.span>
          ))} */}
          <motion.span
            animate={{
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ...
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

export default ProtectedRoute;