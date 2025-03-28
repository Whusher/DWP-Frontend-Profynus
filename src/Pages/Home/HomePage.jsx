import Dashboard from "../../Layouts/Dashboard"
import SoundBeat from "/neonsoundwave.jpg"

export default function HomePage() {
  return <Dashboard child={<Home />} />
}

function Home() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Main content container - stacks vertically on mobile, horizontal on larger screens */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          {/* Left section (Image and Button) - full width on mobile, proportional on desktop */}
          <div className="flex flex-col items-center lg:w-1/2">
            <div className="relative w-full max-w-xl mx-auto">
              <img
                src={SoundBeat || "/placeholder.svg"}
                alt="Profynus Music"
                className="w-full h-auto rounded-lg shadow-lg object-cover aspect-video"
              />
              <div className="absolute -bottom-3 left-0 right-0 flex justify-center">
                <button className="border-2 border-cyan-400 text-white bg-black px-6 py-3 rounded-md hover:bg-cyan-400 hover:text-black transition-colors duration-300 font-medium shadow-lg">
                  Check Music
                </button>
              </div>
            </div>
          </div>

          {/* Right section (Brand and Description) - full width on mobile, proportional on desktop */}
          <div className="flex flex-col gap-6 lg:w-1/2 mt-12 lg:mt-0">
            {/* Brand label */}
            <div className="bg-gradient-to-b from-blue-600/40 to-black from-10% px-6 py-4 rounded-t-lg border-t-2 border-x-2 border-cyan-400">
              <p className="tracking-widest text-2xl md:text-3xl font-bold text-center text-white">PROFYNUS</p>
            </div>

            {/* Description text */}
            <div className="bg-black bg-opacity-70 p-6 rounded-lg border border-gray-800">
              <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                <strong className="text-cyan-400 text-xl">Profynus</strong> is an innovative platform that provides
                direct access to high-quality music streaming in a secure and efficient environment. Built with a robust{" "}
                <span className="text-cyan-400">Frontend-Backend</span> architecture, it ensures high performance and
                data protection.
                <br />
                <br />
                Unlike unreliable services, Profynus offers a malware-free environment with secure authentication and
                zero risk to users. Experience our optimized music service with a modern interface featuring sleek{" "}
                <span className="text-cyan-500">black and cyan</span> aesthetics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

