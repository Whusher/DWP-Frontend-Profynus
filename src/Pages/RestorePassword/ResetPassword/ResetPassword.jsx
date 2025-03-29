import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Lock, AlertCircle, Loader2, ArrowLeft, CheckCircle } from "lucide-react"
import { Link, useSearchParams, useNavigate } from "react-router"
import logo from "../../../assets/LogoRound.webp"

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get("token")

  // Form state
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  // UI state
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    general: "",
  })
  const [countdown, setCountdown] = useState(5)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }

    // Calculate password strength when password changes
    if (name === "password") {
      calculatePasswordStrength(value)
    }
  }

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0

    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }

  // Get strength label and color
  const getStrengthLabel = () => {
    if (passwordStrength === 0) return { label: "Very Weak", color: "bg-red-500" }
    if (passwordStrength === 1) return { label: "Weak", color: "bg-orange-500" }
    if (passwordStrength === 2) return { label: "Medium", color: "bg-yellow-500" }
    if (passwordStrength === 3) return { label: "Strong", color: "bg-green-500" }
    if (passwordStrength === 4) return { label: "Very Strong", color: "bg-emerald-500" }
  }

  // Validate form
  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      isValid = false
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      isValid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({
      password: "",
      confirmPassword: "",
      general: "",
    })

    try {
      // Check if token exists
      if (!token) {
        setErrors({
          ...errors,
          general: "Invalid or expired reset token. Please request a new password reset link.",
        })
        setIsLoading(false)
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, always succeed
      setIsSuccess(true)

      // Start countdown for redirect
      startRedirectCountdown()
    } catch (error) {
      setErrors({
        ...errors,
        general: "An error occurred while resetting your password. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Countdown and redirect after successful password reset
  const startRedirectCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer)
          navigate("/login")
          return 0
        }
        return prevCount - 1
      })
    }, 1000)
  }

  // Check if token exists on component mount
  useEffect(() => {
    if (!token) {
      setErrors({
        ...errors,
        general: "Invalid or expired reset token. Please request a new password reset link.",
      })
    }
  }, [])

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
            Create New Password
          </motion.h1>

          <motion.p
            className="text-gray-400 text-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your new password must be different from previously used passwords
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* General error message */}
              {errors.general && (
                <motion.div
                  className="bg-red-500/20 border border-red-500/50 rounded-md p-3 flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                  <p className="text-red-200 text-sm">{errors.general}</p>
                </motion.div>
              )}

              {/* Password field */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
                  New Password
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
                    disabled={!!errors.general}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-cyan-400"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={!!errors.general}
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

                {/* Password strength indicator */}
                {formData.password && !errors.general && (
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-400">Password strength:</span>
                      <span className="text-xs font-medium text-cyan-400">{getStrengthLabel().label}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <motion.div
                        className={`h-1.5 rounded-full ${getStrengthLabel().color}`}
                        initial={{ width: "0%" }}
                        animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      ></motion.div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password field */}
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-300">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`border pl-10 pr-10 py-2 rounded-md h-11 w-full bg-black/40 text-white focus:outline-none focus:ring-2 transition-all ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-cyan-400 focus:ring-cyan-500"
                    }`}
                    placeholder="••••••••"
                    disabled={!!errors.general}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-cyan-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={!!errors.general}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-red-500 flex items-center"
                  >
                    <AlertCircle className="h-3 w-3 mr-1" /> {errors.confirmPassword}
                  </motion.p>
                )}
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isLoading || !!errors.general}
                className="w-full py-2.5 px-5 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 
                         hover:from-cyan-500 hover:to-cyan-400 text-black font-bold shadow-lg 
                         shadow-cyan-900/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
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
          ) : (
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

              <h2 className="text-xl font-semibold mb-4 text-cyan-400">Password Reset Successful!</h2>
              <p className="text-gray-300 mb-6">
                Your password has been reset successfully. You can now log in with your new password.
              </p>

              <p className="text-sm text-gray-400 mb-6">
                Redirecting to login page in <span className="text-cyan-400 font-medium">{countdown}</span> seconds...
              </p>

              <motion.button
                onClick={() => navigate("/login")}
                className="py-2 px-6 rounded-md bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Login Now
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

