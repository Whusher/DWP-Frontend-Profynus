import { useState, useEffect } from "react"
import { useMobile } from "./hooks/use-mobile"
import { Link } from "react-router"
import { Menu, X, LogOut, Settings } from "lucide-react"

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000) // Update every second

    return () => clearInterval(interval) // Clean up interval on unmount
  }, [])

  const formattedTime = currentTime.toLocaleTimeString() // Format HH:MM:SS

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="flex flex-col w-full z-10 rounded-lg bg-black text-white shadow-lg shadow-cyan-600">
      {/* Main header row */}
      <div className="flex flex-wrap w-full min-h-20 justify-between items-center px-4 md:px-6">
        {/* Left section - Clock and settings */}
        <div className="flex items-center space-x-2 py-4">
          <p className="text-cyan-400 font-mono">{formattedTime}</p>
          <button className="cursor-pointer p-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <Settings size={20} />
          </button>
        </div>

        {/* Center section - Navigation (desktop only) */}
        <div className="hidden md:flex justify-center flex-1 px-4">
          <div className="flex rounded-lg border-cyan-400 border-2 items-center justify-around p-3 my-4 w-full max-w-2xl">
            <NavLink href="/home">Home</NavLink>
            <NavLink href="/profile">Account</NavLink>
            <NavLink href="/history">History</NavLink>
            <NavLink href="/moremusic">Music Player</NavLink>
          </div>
        </div>

        {/* Right section - User info and logout */}
        <div className="flex items-center space-x-4">
          <p className="hidden sm:block">Hello User</p>
          <button className="cursor-pointer flex items-center gap-2 transition-all duration-300 hover:text-red-500 shadow-md hover:shadow-red-500/70 p-2 rounded-md">
            <span className="hidden sm:inline">Logout</span>
            <LogOut size={20} />
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden cursor-pointer p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden w-full border-t border-cyan-800 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4 space-y-3">
            <MobileNavLink href="/home" onClick={toggleMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/profile" onClick={toggleMenu}>
              Account
            </MobileNavLink>
            <MobileNavLink href="/history" onClick={toggleMenu}>
              History
            </MobileNavLink>
            <MobileNavLink href="/moremusic" onClick={toggleMenu}>
              Music Player
            </MobileNavLink>
          </nav>
        </div>
      )}
    </div>
  )
}

// Desktop navigation link component
function NavLink({ href, children }) {
  return (
    <Link
      to={href}
      className="shadow-xl bg-transparent 
      rounded-2xl px-3 py-1 cursor-pointer 
      transition-all duration-300 
      hover:shadow-cyan-300/70 hover:text-cyan-300"
    >
      {children}
    </Link>
  )
}

// Mobile navigation link component
function MobileNavLink({ href, onClick, children }) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="w-full text-left py-2 px-4 rounded-lg 
      transition-all duration-300 hover:bg-cyan-900/30
      hover:text-cyan-300 hover:pl-6"
    >
      {children}
    </Link>
  )
}

