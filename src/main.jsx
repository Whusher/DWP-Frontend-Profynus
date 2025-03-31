import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";

// Import your routes
import LoginPage from "./Pages/Login/LoginPage.jsx";
import LandingPage from "./Pages/Landing/LandingPage.jsx";
import HomePage from "./Pages/Home/HomePage.jsx";
import ProfilePage from "./Pages/Profile/ProfilePage.jsx";
import DownloadPage from "./Pages/Download/DownloadPage.jsx";
import HistoryPage from "./Pages/History/HistoryPage.jsx";
import MediaPlayer from "./Pages/Media/MediaPlayer.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";
import MFASetupPage from "./Pages/SignUp/MFA/MFAConfirmation.jsx";
import ForgotPassword from "./Pages/RestorePassword/ForgotPassword.jsx";
import ResetPassword from "./Pages/RestorePassword/ResetPassword/ResetPassword.jsx";
import MFAVerification from "./Pages/Login/MFAauthorization/MFA-validation.jsx";

// Context Isolation
import { AuthProvider } from "./Context/AuthContext.jsx";

// Import the ProtectedRoute component
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
    <Routes>
      {/* Public Routes - Accessible to everyone */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/mfa-auth" element={<MFAVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/validate-account" element={<MFASetupPage />} />

      {/* Protected Routes - Only for authenticated users */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/moremusic" element={<DownloadPage />} />
        <Route path="/player" element={<MediaPlayer />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>

      {/* Catch-all route for non-existent paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <ToastContainer theme="dark" />
    </AuthProvider>
  </BrowserRouter>
);
