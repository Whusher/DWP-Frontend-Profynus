import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  AlertCircle,
  Loader2,
  RefreshCw,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import logo from "../../../assets/LogoRound.webp";
import { useNavigate } from "react-router";
import { verifyMFA } from "../../../Services/auth/AuthAPI";
import { useAuth } from "../../../Context/AuthContext";
export default function MFAVerification({
  email = "user@example.com"
}) {
  // State for the verification code
  email = localStorage.getItem("email");
  const {login} = useAuth();
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [attempts, setAttempts] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigation = useNavigate();

  // Handle verification code input
  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 6) {
      setVerificationCode(value);
      setError("");
    }
  };

  // Simulate countdown for TOTP code expiration
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle verification submission
  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      setError("Please enter a 6-digit verification code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call to verify MFA code
      // await new Promise((resolve) => setTimeout(resolve, 1500))
      const response = await verifyMFA(verificationCode);
      if (response.success) {
        await login(response);
        setIsSuccess(true)

        await new Promise(resolve => setTimeout(resolve, 1500));
        navigation('/home')

      } else {
        setAttempts((prev) => prev + 1);
        if (attempts >= 2) {
          setError("Too many failed attempts. Please try again later.");
        } else {
          setError(
            `Invalid verification code. ${2 - attempts} attempts remaining.`
          );
        }
      }
    } catch (error) {
      console.log(error)
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerify();
  };

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
            Two-Factor Authentication
          </motion.h1>

          <motion.p
            className="text-gray-400 text-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Enter the verification code from your authenticator app
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="verification-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* User info */}
              <div className="bg-black/40 rounded-lg p-4 mb-6 flex items-center">
                <div className="bg-cyan-900/30 p-2 rounded-full mr-3">
                  <Shield className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white text-sm">Verifying account</p>
                  <p className="text-cyan-400 text-sm font-medium">{email}</p>
                </div>
              </div>

              {/* Verification code input */}
              <div className="mb-6">
                <label
                  htmlFor="verificationCode"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
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
                    className={`border pl-4 pr-12 py-3 rounded-md w-full bg-black/40 text-white text-center text-2xl tracking-widest font-mono focus:outline-none focus:ring-2 transition-all ${
                      error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-cyan-400 focus:ring-cyan-500"
                    }`}
                    autoFocus
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

                {/* <p className="mt-4 text-xs text-gray-400">
                  For demo purposes, enter "123456" as the verification code.
                </p> */}
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                <motion.button
                  type="button"
                  onClick={() => navigation("/")}
                  className="px-4 py-2 text-gray-400 hover:text-cyan-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={
                    verificationCode.length !== 6 || isLoading || attempts > 2
                  }
                  className="bg-cyan-500 text-black px-6 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify
                      <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </motion.button>
              </div>

              {/* Help text */}
              <div className="mt-8 text-center">
                {/* <p className="text-sm text-gray-400">
                  Didn't receive a code?{" "}
                  <button type="button" className="text-cyan-400 hover:underline">
                    Resend code
                  </button>
                </p> */}
                <p className="text-sm text-gray-400 mt-2">
                  Need restore your MFA?{" "}
                  <button
                    onClick={()=> navigation('/validate-account')}
                    type="button"
                    className="text-cyan-400 hover:underline"
                  >
                    Request restore MFA
                  </button>
                </p>
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

              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Verification Successful!
              </h2>
              <p className="text-gray-300 mb-6">
                You have been successfully authenticated.
              </p>

              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-t-cyan-500 border-cyan-500/30 rounded-full animate-spin"></div>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Redirecting to your account...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
