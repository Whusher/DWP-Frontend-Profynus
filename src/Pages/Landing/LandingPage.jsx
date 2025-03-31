import logo from "../../assets/LogoRound.webp"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router"
import { Download, Play, ListMusic, ChevronRight, Music, Headphones, Share2, Heart, Volume2, Menu, X, Github, Twitter, Instagram } from 'lucide-react'
import { useNavigate } from "react-router"
export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)
  const navigate = useNavigate();
  const handleNavigation = (parameter = '/') => {
    navigate(parameter)
  }


  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <Logo />
            <span className="text-2xl font-bold ml-2 bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">
              Profynus
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/signup">Features</NavLink>
            <NavLink href="/signup">How It Works</NavLink>
            <NavLink href="/signup">Music</NavLink>
            <NavLink href="/login">Login</NavLink>
            <motion.button
              onClick={()=>handleNavigation('/signup')}
              className="bg-cyan-500 text-black px-6 py-2 rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </div>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-black border-t border-cyan-900/50 z-50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <MobileNavLink href="/signup" onClick={() => setIsMenuOpen(false)}>Features</MobileNavLink>
                <MobileNavLink href="/signup" onClick={() => setIsMenuOpen(false)}>How It Works</MobileNavLink>
                <MobileNavLink href="/signup" onClick={() => setIsMenuOpen(false)}>Music</MobileNavLink>
                <MobileNavLink href="/signup" onClick={() => setIsMenuOpen(false)}>Download</MobileNavLink>
                <motion.button
                  onClick={()=> handleNavigation('/signup')}
                  className="bg-cyan-500 text-black px-6 py-3 rounded-full font-medium w-full"
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-cyan-900/20 to-transparent"></div>
          <div className="absolute inset-0">
            <MusicParticles />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Your Music, <br />
                <span className="text-cyan-400">Your Way</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Download, listen, and create amazing playlists with Profynus. 
                The ultimate music experience that puts you in control.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.button
                  onClick={()=> navigate('/signup')}
                  className="bg-cyan-500 text-black px-8 py-3 rounded-full font-medium flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started <ChevronRight size={18} />
                </motion.button>
                <motion.button
                  onClick={()=> navigate('/signup')}
                  className="bg-transparent border border-cyan-500 text-cyan-400 px-8 py-3 rounded-full font-medium flex items-center gap-2"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(8, 145, 178, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={18} fill="currentColor" /> Watch Demo
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span>Trusted by</span>
                <span className="text-cyan-400 font-bold">10,000+</span>
                <span>music lovers</span>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 relative">
              {/* <AppPreview /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-black to-cyan-950/10 to-black">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Amazing Features"
            subtitle="Everything you need for the perfect music experience"
          />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Download className="text-cyan-400" size={32} />}
              title="Download Music"
              description="Download your favorite songs in high quality and listen offline anytime, anywhere."
            />
            <FeatureCard 
              icon={<Headphones className="text-cyan-400" size={32} />}
              title="Listen Anywhere"
              description="Stream music online or listen to your downloaded tracks with our powerful audio player."
            />
            <FeatureCard 
              icon={<ListMusic className="text-cyan-400" size={32} />}
              title="Create Playlists"
              description="Organize your music into custom playlists for every mood, activity or occasion."
            />
          </div>
          
          <div className="mt-20">
            <div className="flex justify-center mb-8">
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.button
                    key={i}
                    className={`w-3 h-3 rounded-full ${currentFeature === i ? 'bg-cyan-400' : 'bg-gray-700'}`}
                    onClick={() => setCurrentFeature(i)}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </div>
            
            <div className="relative h-[500px] md:h-[600px] bg-gradient-to-br from-cyan-900/20 to-black rounded-xl overflow-hidden border border-cyan-900/30">
              <AnimatePresence mode="wait">
                {currentFeature === 0 && (
                  <FeatureShowcase
                    key="download"
                    title="Download Your Favorite Music"
                    description="Get instant access to millions of songs. Download and enjoy high-quality audio without interruptions."
                    image="/placeholder.svg?height=400&width=600"
                    icon={<Download size={24} />}
                  />
                )}
                
                {currentFeature === 1 && (
                  <FeatureShowcase
                    key="listen"
                    title="Listen Anywhere, Anytime"
                    description="Take your music everywhere. Listen on any device with our seamless cross-platform experience."
                    image="/placeholder.svg?height=400&width=600"
                    icon={<Headphones size={24} />}
                  />
                )}
                
                {currentFeature === 2 && (
                  <FeatureShowcase
                    key="playlists"
                    title="Create Perfect Playlists"
                    description="Organize your music your way. Create, edit and share playlists with friends and family."
                    image="/placeholder.svg?height=400&width=600"
                    icon={<ListMusic size={24} />}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="How It Works"
            subtitle="Get started with Profynus in three simple steps"
          />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title="Sign Up"
              description="Create your free account in seconds and get access to all features."
            />
            <StepCard
              number="02"
              title="Discover Music"
              description="Browse our extensive library and find your favorite songs and artists."
            />
            <StepCard
              number="03"
              title="Enjoy & Share"
              description="Download, listen and create playlists to share with friends."
            />
          </div>
        </div>
      </section>

      {/* Music Showcase Section */}
      <section id="showcase" className="py-20 bg-gradient-to-b from-black to-cyan-950/10 to-black">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Music Showcase"
            subtitle="Explore some of our featured playlists and tracks"
          />
          
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Top Hits", songs: 24, image: "/placeholder.svg?height=300&width=300" },
                { title: "Chill Vibes", songs: 18, image: "/placeholder.svg?height=300&width=300" },
                { title: "Workout Mix", songs: 15, image: "/placeholder.svg?height=300&width=300" },
                { title: "Study Focus", songs: 20, image: "/placeholder.svg?height=300&width=300" }
              ].map((playlist, index) => (
                <PlaylistCard
                  key={index}
                  title={playlist.title}
                  songs={playlist.songs}
                  image={playlist.image}
                  index={index}
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <motion.button
                className="bg-cyan-500 text-black px-8 py-3 rounded-full font-medium inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore All Music <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <StatCard number="10M+" label="Downloads" />
            <StatCard number="5M+" label="Users" />
            <StatCard number="500K+" label="Songs" />
            <StatCard number="100K+" label="Playlists" />
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 bg-gradient-to-b from-black via-cyan-950/10 to-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to Experience <span className="text-cyan-400">Profynus</span>?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join thousands of music lovers who have already discovered the ultimate music experience. Download Profynus today!
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {/* <motion.button
                className="bg-cyan-500 text-black px-8 py-4 rounded-xl font-medium flex items-center gap-3 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.9 2.318A5.32 5.32 0 0 1 22 7.5v9a5.32 5.32 0 0 1-4.1 5.182A80.51 80.51 0 0 1 12 22a80.51 80.51 0 0 1-5.9-.318A5.32 5.32 0 0 1 2 16.5v-9a5.32 5.32 0 0 1 4.1-5.182A80.51 80.51 0 0 1 12 2a80.51 80.51 0 0 1 5.9.318zM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on</div>
                  <div>App Store</div>
                </div>
              </motion.button>
              
              <motion.button
                className="bg-cyan-500 text-black px-8 py-4 rounded-xl font-medium flex items-center gap-3 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 5.26l2.3-4.02c.5-.84 1.64-1.16 2.48-.66.84.5 1.16 1.64.66 2.48l-1.86 3.26 1.86 3.26c.5.84.18 1.98-.66 2.48-.84.5-1.98.18-2.48-.66l-2.3-4.02 8.49 8.49c.37.37.58.88.58 1.41 0 1.1-.9 2-2 2-.53 0-1.04-.21-1.41-.59l-8.48-8.48 8.48-8.48a2.003 2.003 0 0 1 2.83 2.83l-8.49 8.47z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on</div>
                  <div>Google Play</div>
                </div>
              </motion.button> */}
              
              <motion.button
                className="bg-transparent border border-cyan-500 text-cyan-400 px-8 py-4 rounded-xl font-medium flex items-center gap-3 text-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(8, 145, 178, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>handleNavigation('/signup')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="7" y1="12" x2="17" y2="12"></line>
                  <line x1="12" y1="7" x2="12" y2="17"></line>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Access on</div>
                  <div>Web Browser</div>
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-cyan-900/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <Logo size={32} />
                <span className="text-xl font-bold ml-2 bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">
                  Profynus
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Your ultimate music companion. Download, listen, and create amazing playlists.
              </p>
              <div className="flex space-x-4">
                <SocialIcon icon={<Twitter size={18} />} />
                <SocialIcon icon={<Instagram size={18} />} />
                <SocialIcon icon={<Github size={18} />} />
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <FooterLink href="#features">Features</FooterLink>
                <FooterLink href="#how-it-works">How It Works</FooterLink>
                <FooterLink href="#showcase">Music</FooterLink>
                <FooterLink href="#download">Download</FooterLink>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <FooterLink href="#">Help Center</FooterLink>
                <FooterLink href="#">Contact Us</FooterLink>
                <FooterLink href="#">FAQs</FooterLink>
                <FooterLink href="#">Privacy Policy</FooterLink>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to get updates on new features and music releases.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-900 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <button className="bg-cyan-500 text-black px-4 py-2 rounded-r-md hover:bg-cyan-400 transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Profynus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Components

function Logo({ size = 24 }) {
  return (
    <motion.div 
      className="relative"
      whileHover={{ rotate: 10 }}
    >
      <div
        className={`bg-cover shadow-2xl shadow-black bg-center w-${size} h-${size} rounded-full`}
                  style={{ backgroundImage: `url(${logo})` }}
                />
      {/* <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="black" stroke="#22D3EE" strokeWidth="2" />
        <path d="M9 8L17 12L9 16V8Z" fill="#22D3EE" />
      </svg> */}
    </motion.div>
  )
}

function NavLink({ href, children }) {
  return (
    <Link to={href} className="text-gray-300 hover:text-cyan-400 transition-colors">
      {children}
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }) {
  return (
    <Link 
      to={href} 
      className="text-gray-300 hover:text-cyan-400 transition-colors block py-2 border-b border-gray-800"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <span className="text-cyan-400">{title.split(' ')[0]}</span>{' '}
        {title.split(' ').slice(1).join(' ')}
      </motion.h2>
      
      <motion.p 
        className="text-xl text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {subtitle}
      </motion.p>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      className="bg-gradient-to-br from-black to-cyan-950/10 p-8 rounded-xl border border-cyan-900/30 hover:border-cyan-500/50 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="bg-cyan-900/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

function StepCard({ number, title, description }) {
  return (
    <motion.div 
      className="relative p-8 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="absolute -top-10 left-8 text-6xl font-bold text-cyan-500/20">{number}</div>
      <div className="bg-gradient-to-br from-black to-cyan-950/10 p-8 rounded-xl border border-cyan-900/30 relative z-10">
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}

function PlaylistCard({ title, songs, image, index }) {
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-xl cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10"></div>
      
      <img 
        src={image || "/placeholder.svg"} 
        alt={title} 
        className="w-full aspect-square object-cover transition-transform group-hover:scale-110"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-cyan-400">{songs} songs</p>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <motion.button
          className="bg-cyan-500 text-black rounded-full p-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Play size={24} fill="currentColor" />
        </motion.button>
      </div>
    </motion.div>
  )
}

function StatCard({ number, label }) {
  return (
    <motion.div 
      className="p-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="text-4xl font-bold text-cyan-400 mb-2">{number}</h3>
      <p className="text-gray-400">{label}</p>
    </motion.div>
  )
}

function FeatureShowcase({ title, description, image, icon }) {
  return (
    <motion.div 
      className="absolute inset-0 flex flex-col md:flex-row items-center p-8"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
        <div className="flex items-center mb-4">
          <div className="bg-cyan-500 p-2 rounded-lg mr-3">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-300 mb-6">{description}</p>
        <motion.button
          className="bg-cyan-500 text-black px-6 py-2 rounded-lg font-medium flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More <ChevronRight size={18} />
        </motion.button>
      </div>
      <div className="md:w-1/2">
        <img 
          src={image || "/placeholder.svg"} 
          alt={title} 
          className="rounded-lg shadow-lg border border-cyan-900/30"
        />
      </div>
    </motion.div>
  )
}

function SocialIcon({ icon }) {
  return (
    <motion.a 
      href="#" 
      className="bg-cyan-900/30 p-2 rounded-full text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.a>
  )
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-gray-400 hover:text-cyan-400 transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}

function MusicParticles() {
  return (
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 text-cyan-500/30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 20,
          }}
        >
          {i % 3 === 0 ? (
            <Music size={24} />
          ) : i % 3 === 1 ? (
            <Headphones size={24} />
          ) : (
            <Volume2 size={24} />
          )}
        </motion.div>
      ))}
    </div>
  )
}