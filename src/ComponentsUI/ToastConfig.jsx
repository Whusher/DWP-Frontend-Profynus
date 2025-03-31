import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { User, Bell, CheckCircle, AlertCircle, Info, X } from "lucide-react"

// Custom toast component with avatar
export const showToast = ({ title, message, type = "default", avatar }) => {
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "profynus-toast",
  }

  const content = ({ closeToast }) => (
    <CustomToastContent title={title} message={message} type={type} avatar={avatar} closeToast={closeToast} />
  );
  
  switch (type) {
    case "success":
      toast.success(content, toastOptions)
      break
    case "error":
      toast.error(content, toastOptions)
      break
    case "info":
      toast.info(content, toastOptions)
      break
    case "warning":
      toast.warning(content, toastOptions)
      break
    default:
      toast(content, toastOptions)
  }
}

// Custom toast content component
const CustomToastContent = ({ title, message, type = "default", avatar, closeToast }) => {
  // Default avatar based on type if none is provided
  const defaultAvatar = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" size={24} />;
      case "error":
        return <AlertCircle className="text-red-500" size={24} />;
      case "info":
        return <Info className="text-cyan-500" size={24} />;
      case "warning":
        return <Bell className="text-yellow-500" size={24} />;
      default:
        return <User className="text-cyan-400" size={24} />;
    }
  };

  // Get background color based on type
  const getAvatarBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500/20";
      case "error":
        return "bg-red-500/20";
      case "info":
        return "bg-cyan-500/20";
      case "warning":
        return "bg-yellow-500/20";
      default:
        return "bg-cyan-500/20";
    }
  };

  return (
    <div className="flex items-start relative">
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full ${getAvatarBgColor()} flex items-center justify-center mr-3`}
      >
        {typeof avatar === "string" ? (
          <img src={avatar || "/placeholder.svg"} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
        ) : (
          avatar || defaultAvatar()
        )}
      </div>
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-medium text-white">{title}</p>}
        <p className="text-sm text-gray-300">{message}</p>
      </div>
      {/* Close button */}
      <button
        onClick={closeToast}
        className="absolute top-1 right-1 p-1 rounded-full hover:bg-gray-700/50 transition-colors"
        aria-label="Close notification"
      >
        <X size={16} className="text-gray-400" />
      </button>
    </div>
  );
};


// Toast container component with custom styling
export const ProfynusToastContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      closeButton={CloseButton}
      toastClassName={() =>
        "bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-lg p-4 mb-3 shadow-lg shadow-cyan-900/20 relative flex"
      }
      progressClassName={() => "Toastify__progress-bar Toastify__progress-bar--animated bg-cyan-500"}
    />
  )
}

// Custom close button
const CloseButton = ({ closeToast }) => (
  <button
    onClick={closeToast}
    className="absolute top-1 right-1 p-1 rounded-full hover:bg-gray-700/50 transition-colors"
    aria-label="Close notification"
  >
    <X size={16} className="text-gray-400" />
  </button>
)

// Usage examples
export const showSuccessToast = (message, title) => showToast({ title, message, type: "success" })

export const showErrorToast = (message, title) => showToast({ title, message, type: "error" })

export const showInfoToast = (message, title) => showToast({ title, message, type: "info" })

export const showWarningToast = (message, title) => showToast({ title, message, type: "warning" })

export const showUserToast = (message, title, avatar) => showToast({ title, message, avatar })

