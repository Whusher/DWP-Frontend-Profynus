import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Copy, RefreshCw, Loader2, Shield, AlertCircle, ChevronRight, CheckCircle2 } from "lucide-react"
import logo from "../../../assets/LogoRound.webp"

export default function MFASetupPage() {
  // State for the MFA setup process
  const [step, setStep] = useState(1) // 1: QR code, 2: Verification, 3: Success
  const [verificationCode, setVerificationCode] = useState("")
  const [isScanned, setIsScanned] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [secretKey, setSecretKey] = useState("ABCD EFGH IJKL MNOP")
  const [countdown, setCountdown] = useState(30)
  const [isCopied, setIsCopied] = useState(false)

  // Simulate countdown for TOTP code expiration
  useEffect(() => {
    if (step === 2) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            return 30
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [step])

  // Handle verification code input
  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "") // Only allow digits
    if (value.length <= 6) {
      setVerificationCode(value)
      setError("")
    }
  }

  // Copy secret key to clipboard
  const copySecretKey = () => {
    navigator.clipboard.writeText(secretKey.replace(/\s/g, ""))
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // Handle verification submission
  const handleVerify = () => {
    setIsLoading(true)
    setError("")

    // Simulate API call to verify code
    setTimeout(() => {
      // For demo purposes, let's say "123456" is the correct code
      if (verificationCode === "123456") {
        setStep(3) // Success
      } else {
        setError("Invalid verification code. Please try again.")
      }
      setIsLoading(false)
    }, 1500)
  }

  // Handle completion
  const handleComplete = () => {
    // Redirect to login page or dashboard
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="bg-cover shadow-xl shadow-cyan-900/30 bg-center w-20 h-20 rounded-full mb-4"
            style={{ backgroundImage: `url(${logo})` }}
          />
          <h1 className="text-2xl font-bold text-center">Two-Factor Authentication Setup</h1>
          <p className="text-gray-400 text-center mt-2">Enhance your account security with two-factor authentication</p>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          className="flex items-center justify-between mb-8 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? "bg-cyan-500 text-black" : "bg-gray-700 text-gray-300"
              }`}
            >
              <Shield size={16} />
            </div>
            <span className="text-xs mt-1 text-gray-400">Setup</span>
          </div>

          <div className={`h-1 flex-grow mx-2 ${step >= 2 ? "bg-cyan-500" : "bg-gray-700"}`} />

          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? "bg-cyan-500 text-black" : "bg-gray-700 text-gray-300"
              }`}
            >
              <Check size={16} />
            </div>
            <span className="text-xs mt-1 text-gray-400">Verify</span>
          </div>

          <div className={`h-1 flex-grow mx-2 ${step >= 3 ? "bg-cyan-500" : "bg-gray-700"}`} />

          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? "bg-cyan-500 text-black" : "bg-gray-700 text-gray-300"
              }`}
            >
              <CheckCircle2 size={16} />
            </div>
            <span className="text-xs mt-1 text-gray-400">Complete</span>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div
          className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 shadow-lg shadow-cyan-900/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {/* Step 1: QR Code */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4 text-cyan-400">Scan QR Code</h2>
                <p className="text-gray-300 mb-6">
                  Scan this QR code with your Google Authenticator app to set up two-factor authentication.
                </p>

                {/* QR Code */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-4 rounded-lg">
                    {/* This is a placeholder for the actual QR code */}
                    <svg width="180" height="180" viewBox="0 0 180 180">
                      <rect width="180" height="180" fill="white" />
                      <path d="M20,20 h40 v40 h-40 z M30,30 h20 v20 h-20 z" fill="black" />
                      <path d="M70,20 h40 v40 h-40 z M80,30 h20 v20 h-20 z" fill="black" />
                      <path d="M120,20 h40 v40 h-40 z M130,30 h20 v20 h-20 z" fill="black" />
                      <path d="M20,70 h40 v40 h-40 z M30,80 h20 v20 h-20 z" fill="black" />
                      <path d="M70,70 h40 v40 h-40 z" fill="black" />
                      <path d="M120,70 h40 v40 h-40 z M130,80 h20 v20 h-20 z" fill="black" />
                      <path d="M20,120 h40 v40 h-40 z M30,130 h20 v20 h-20 z" fill="black" />
                      <path d="M70,120 h40 v40 h-40 z" fill="black" />
                      <path d="M120,120 h40 v40 h-40 z M130,130 h20 v20 h-20 z" fill="black" />
                    </svg>
                  </div>
                </div>

                {/* Secret key */}
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">
                    If you can't scan the QR code, enter this secret key manually:
                  </p>
                  <div className="flex items-center bg-gray-900 rounded-md p-2">
                    <code className="text-cyan-400 flex-grow font-mono text-center">{secretKey}</code>
                    <motion.button
                      onClick={copySecretKey}
                      className="ml-2 text-gray-400 hover:text-cyan-400 p-1 rounded-md"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isCopied ? <Check size={16} /> : <Copy size={16} />}
                    </motion.button>
                  </div>
                </div>

                {/* Checkbox for confirmation */}
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="scanned"
                    checked={isScanned}
                    onChange={() => setIsScanned(!isScanned)}
                    className="w-4 h-4 text-cyan-500 bg-black border-cyan-400 rounded focus:ring-cyan-500 focus:ring-2"
                  />
                  <label htmlFor="scanned" className="ml-2 text-gray-300">
                    I have scanned the QR code or entered the secret key
                  </label>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    onClick={() => setStep(2)}
                    disabled={!isScanned}
                    className="bg-cyan-500 text-black px-6 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    whileHover={isScanned ? { scale: 1.05 } : {}}
                    whileTap={isScanned ? { scale: 0.95 } : {}}
                  >
                    Continue <ChevronRight size={16} className="ml-1" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Verification */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4 text-cyan-400">Verify Code</h2>
                <p className="text-gray-300 mb-6">
                  Enter the 6-digit verification code from your Google Authenticator app.
                </p>

                {/* Verification code input */}
                <div className="mb-6">
                  <label htmlFor="verificationCode" className="block mb-2 text-sm font-medium text-gray-300">
                    Verification Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="verificationCode"
                      value={verificationCode}
                      onChange={handleCodeChange}
                      maxLength={6}
                      placeholder="000000"
                      className="border pl-4 pr-12 py-3 rounded-md w-full bg-black/40 text-white text-center text-2xl tracking-widest font-mono focus:outline-none focus:ring-2 border-cyan-400 focus:ring-cyan-500"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                      <div className="text-xs text-gray-500 bg-gray-800 rounded-full px-2 py-1 flex items-center">
                        <RefreshCw size={12} className="mr-1 animate-spin" />
                        {countdown}s
                      </div>
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      <AlertCircle className="h-4 w-4 mr-1" /> {error}
                    </motion.p>
                  )}

                  <p className="mt-4 text-xs text-gray-400">
                    For demo purposes, enter "123456" as the verification code.
                  </p>
                </div>

                <div className="flex justify-between">
                  <motion.button
                    onClick={() => setStep(1)}
                    className="text-gray-400 hover:text-cyan-400 px-4 py-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back
                  </motion.button>

                  <motion.button
                    onClick={handleVerify}
                    disabled={verificationCode.length !== 6 || isLoading}
                    className="bg-cyan-500 text-black px-6 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    whileHover={verificationCode.length === 6 && !isLoading ? { scale: 1.05 } : {}}
                    whileTap={verificationCode.length === 6 && !isLoading ? { scale: 0.95 } : {}}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>Verify</>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.div
                  className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                >
                  <Check className="h-10 w-10 text-cyan-400" />
                </motion.div>

                <h2 className="text-xl font-semibold mb-4 text-cyan-400">Setup Complete!</h2>
                <p className="text-gray-300 mb-8">
                  Two-factor authentication has been successfully set up for your account. Your account is now more
                  secure.
                </p>

                <motion.button
                  onClick={handleComplete}
                  className="bg-cyan-500 text-black px-8 py-3 rounded-md font-medium w-full"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Continue to Login
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Security tips */}
        <motion.div
          className="mt-8 bg-gray-900/50 border border-gray-800 rounded-lg p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-sm font-medium text-cyan-400 mb-2">Security Tips</h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li className="flex items-start">
              <span className="text-cyan-500 mr-2">•</span>
              Store your backup codes in a safe place
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-2">•</span>
              Never share your verification codes with anyone
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-2">•</span>
              Set up multiple authentication methods for account recovery
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

