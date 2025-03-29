
import  React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, AlertCircle, Loader2, ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { Link } from "react-router"
import logo from "../../assets/LogoRound.webp"

export default function ForgotPassword() {
  // Form state
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")

  // UI state
  const [isLoading, setIsLoading] = useState(false)
//   const [requestStatus, setRequestStatus] = useState<"idle" | "success" | "error">("idle")
    const [requestStatus, setRequestStatus] = useState("idle")

  const [errorMessage, setErrorMessage] = useState("")

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setEmailError("")
    if (requestStatus !== "idle") {
      setRequestStatus("idle")
    }
  }

  // Validate email
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      setEmailError("Email is required")
      return false
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email")
      return false
    }
    return true
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateEmail()) return

    setIsLoading(true)
    setRequestStatus("idle")
    setErrorMessage("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, let's simulate success most of the time
      // but occasionally show an error to demonstrate that flow
      if (Math.random() > 0.2) {
        setRequestStatus("success")
      } else {
        setRequestStatus("error")
        setErrorMessage("Unable to process your request. Please try again later.")
      }
    } catch (error) {
      setRequestStatus("error")
      setErrorMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-8 shadow-lg shadow-cyan-900/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            className="bg-cover shadow-xl shadow-cyan-900/30 bg-center w-20 h-20 rounded-full mb-4"
            style={{ backgroundImage: `url(${logo})` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          />

          <motion.h1
            className="text-2xl font-bold text-white text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Reset Your Password
          </motion.h1>

          <motion.p
            className="text-gray-400 text-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Enter your email and we'll send you instructions to reset your password
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {requestStatus === "idle" && (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`border pl-10 pr-3 py-2 rounded-md h-11 w-full bg-black/40 text-white focus:outline-none focus:ring-2 transition-all ${
                      emailError ? "border-red-500 focus:ring-red-500" : "border-cyan-400 focus:ring-cyan-500"
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
                {emailError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-red-500 flex items-center"
                  >
                    <AlertCircle className="h-3 w-3 mr-1" /> {emailError}
                  </motion.p>
                )}
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-5 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 
                         hover:from-cyan-500 hover:to-cyan-400 text-black font-bold shadow-lg 
                         shadow-cyan-900/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </motion.button>

              {/* Back to login link */}
              <div className="text-center mt-4">
                <Link to="/login" className="text-cyan-400 hover:text-cyan-300 inline-flex items-center text-sm">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Login
                </Link>
              </div>
            </motion.form>
          )}

          {requestStatus === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="text-center py-6"
            >
              <motion.div
                className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <CheckCircle className="h-8 w-8 text-cyan-400" />
              </motion.div>

              <h2 className="text-xl font-semibold mb-4 text-cyan-400">Check Your Email</h2>
              <p className="text-gray-300 mb-6">
                We've sent password reset instructions to:
                <br />
                <span className="font-medium text-white">{email}</span>
              </p>
              <p className="text-sm text-gray-400 mb-6">
                If you don't see the email, check your spam folder or make sure you entered the correct email address.
              </p>

              <div className="flex flex-col space-y-3">
                <motion.button
                  onClick={() => setRequestStatus("idle")}
                  className="py-2 px-4 rounded-md border border-cyan-500 text-cyan-400 hover:bg-cyan-900/20 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Try Another Email
                </motion.button>

                <Link to="/login" className="py-2 px-4 rounded-md text-gray-400 hover:text-cyan-400 transition-colors">
                  Back to Login
                </Link>
              </div>
            </motion.div>
          )}

          {requestStatus === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="text-center py-6"
            >
              <motion.div
                className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <XCircle className="h-8 w-8 text-red-500" />
              </motion.div>

              <h2 className="text-xl font-semibold mb-4 text-red-400">Something Went Wrong</h2>
              <p className="text-gray-300 mb-6">{errorMessage}</p>

              <div className="flex flex-col space-y-3">
                <motion.button
                  onClick={() => setRequestStatus("idle")}
                  className="py-2 px-4 rounded-md bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Try Again
                </motion.button>

                <Link to="/login" className="py-2 px-4 rounded-md text-gray-400 hover:text-cyan-400 transition-colors">
                  Back to Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

