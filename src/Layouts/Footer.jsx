import logo from "../assets/LogoRound.webp"

const Footer = () => {
    return (
      <footer className="bg-black text-cyan-400 py-6 rounded-lg shadow-2xl shadow-cyan-300">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          {/* Logo y Nombre */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Profynus Logo" className="w-16 h-16 rounded-full object-cover" />
            <h2 className="text-xl font-bold">Profynus</h2>
          </div>
  
          {/* Enlaces de navegación */}
          <nav className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="hover:text-cyan-300 transition">Inicio</a>
            <a href="#" className="hover:text-cyan-300 transition">Sobre Nosotros</a>
            <a href="#" className="hover:text-cyan-300 transition">Contacto</a>
          </nav>
  
          {/* Derechos y redes sociales */}
          <div className="mt-4 md:mt-0 flex flex-col items-center">
            <p className="text-sm">&copy; 2025 Profynus. Todos los derechos reservados.</p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-cyan-300 transition">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="hover:text-cyan-300 transition">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="hover:text-cyan-300 transition">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
export default Footer;
  
