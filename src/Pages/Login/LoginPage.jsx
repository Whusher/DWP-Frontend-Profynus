"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from "lucide-react"
import { Link } from "react-router"
import anubis from "../../assets/anubis.webp"
import logo from "../../assets/LogoRound.webp"
import "./Animations/ShadowWrapper.css"

export default function LoginPage() {
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  // UI state
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }

    // Clear login error when user modifies inputs
    if (loginError) {
      setLoginError("")
    }
  }

  // Validate form
  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
      isValid = false
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    const isValid = validateForm()
    if (isValid) {
      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // For demo purposes, let's simulate a successful login for a specific email
        if (formData.email === "demo@profynus.com" && formData.password === "password") {
          // Successful login - would normally redirect or set auth state
          console.log("Login successful", formData)
          window.location.href = "/home"
        } else {
          // Failed login
          setLoginError("Invalid email or password")
        }
      } catch (error) {
        setLoginError("An error occurred. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Check form validity on data change
  useEffect(() => {
    if (formSubmitted) {
      validateForm()
    }
  }, [formData, formSubmitted])

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden scrollbar-hide">
      {/* Left side - Login Form */}
      <div
        id="left-side"
        className="flex w-full h-screen scrollbar-hide md:basis-1/2 bg-gradient-to-l from-black via-black via-35% to-cyan-900 text-white py-8 md:py-0 overflow-y-auto"
      >
        <motion.div
          id="form-target"
          className="flex flex-col justify-evenly items-center mx-auto md:mx-10 lg:mx-20 py-5 my-auto rounded-2xl 
                    w-[90%] md:w-full bg-transparent border-2 border-gray-400 text-black relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background glow effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>

          <motion.div
            className="bg-cover shadow-2xl shadow-black bg-center w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full"
            style={{ backgroundImage: `url(${logo})` }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          />

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <p className="text-white text-2xl text-center">
              PROFYNUS <span className="block text-sm font-light">Music app</span>
            </p>
          </motion.div>

          <form
            onSubmit={handleSubmit}
            className="flex-col flex w-full space-y-5 md:space-y-7 justify-center items-center text-white mt-4"
          >
            {/* Login error message */}
            <AnimatePresence>
              {loginError && (
                <motion.div
                  className="w-[85%] sm:w-3/4 bg-red-500/20 border border-red-500/50 rounded-md p-3 flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                  <p className="text-red-200 text-sm">{loginError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email field */}
            <motion.div
              className="w-[85%] sm:w-3/4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`border pl-10 pr-3 py-2 rounded-md h-11 w-full bg-black/40 text-white focus:outline-none focus:ring-2 transition-all ${
                    errors.email ? "border-red-500 focus:ring-red-500" : "border-cyan-400 focus:ring-cyan-500"
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-500 flex items-center"
                >
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password field */}
            <motion.div
              className="w-[85%] sm:w-3/4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`border pl-10 pr-10 py-2 rounded-md h-11 w-full bg-black/40 text-white focus:outline-none focus:ring-2 transition-all ${
                    errors.password ? "border-red-500 focus:ring-red-500" : "border-cyan-400 focus:ring-cyan-500"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-cyan-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-500 flex items-center"
                >
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Remember me checkbox */}
            <motion.div
              className="w-[85%] sm:w-3/4 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 text-cyan-500 bg-black border-cyan-400 rounded focus:ring-cyan-500 focus:ring-2"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-300">
                Remember me
              </label>
            </motion.div>

            {/* Links */}
            <motion.div
              className="w-[85%] sm:w-3/4 text-center space-y-5 md:space-y-6 mt-2 md:mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="text-sm sm:text-base">
                Don't have an account?{" "}
                <Link
                  to={"/signup"}
                  className="text-cyan-400 underline font-semibold hover:cursor-pointer hover:text-cyan-300 transition-colors"
                >
                  Register now
                </Link>
              </p>
              <motion.p
                
                className="text-sm sm:text-base text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={'/forgot-password'}>
                  Forgot password?
                </Link>
              </motion.p>
            </motion.div>

            {/* Login button */}
            <motion.div
              id="buttons-group"
              className="w-full text-center mb-4 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                type="submit"
                disabled={isLoading}
                className="py-2.5 px-5 w-[160px] rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 
                         hover:from-cyan-500 hover:to-cyan-400 text-black font-bold shadow-lg 
                         shadow-cyan-900/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Demo credentials hint */}
          <motion.div
            className="w-[85%] sm:w-3/4 mt-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-xs text-gray-400">Demo: demo@profynus.com / password</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side - Image and Promotion */}
      <div
        id="right-side"
        className="relative hidden md:flex w-full md:basis-1/2 flex-col justify-center items-center bg-blend-color-dodge bg-black py-10 md:py-0 md:h-full"
      >
        <motion.div
          id="image-container"
          className="z-10 p-4 mt-2 mx-auto bg-gradient-to-b from-60% from-black to-cyan-700 
                    shadow-2xl shadow-cyan-500 animate-[shake-shadow_8s_infinite_ease-in]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={anubis || "/placeholder.svg"}
            alt="business logotype"
            className="w-[15rem] sm:w-[18rem] md:w-[20rem]"
          />
        </motion.div>

        <motion.div
          id="promotion-lader"
          className="w-full flex flex-col sm:flex-row sm:space-x-5 justify-center items-center p-5 text-white mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="w-full sm:w-1/2 text-center font-bold text-2xl md:text-3xl tracking-wider mb-4 sm:mb-0">
            PROFYNUS
          </p>

          {/* Separator line for desktop */}
          <div id="separator-line-virtual" className="hidden sm:block w-px mr-10 h-25" />

          {/* Animated separator */}
          <div
            id="separator-line"
            className="w-5 rounded-3xl absolute h-50 md:h-[400px] bottom-2 blur-lg center bg-gradient-to-b 
                      from-cyan-700 z-0 to-cyan-900/50 shadow-4xl shadow-cyan-500 p-1"
          />

          <p className="w-full sm:w-1/2 text-center text-sm sm:text-base">
            The application that your ears, essence and style need!
          </p>
        </motion.div>

        {/* Music notes animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-cyan-500/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 20}px`,
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: -100,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 10,
                ease: "easeInOut",
              }}
            >
              {i % 2 === 0 ? "♪" : "♫"}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

