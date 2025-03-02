import Dashboard from "../../Layouts/Dashboard"
import SoundBeat from "../../assets/SoundBeat.webp"
export default function HomePage() {
    return (
        <Dashboard child={<Home />} />
    )
}

function Home() {
    return (
        <div className="flex justify-center items-center h-screen w-full bg-black">
            {/* Contenedor principal */}
            <div className="flex items-center h-full">
                {/* Sección Izquierda (Imagen/GIF y Botón) */}
                <div className="ml-10 text-center">
                    <img src={SoundBeat} alt="business-image" className="h-[400px] w-[600px] object-cover rounded-lg" />
                    <button className="border-2 cursor-pointer border-cyan-400 text-white bg-black p-3 my-6 rounded-md">
                        Check Music
                    </button>
                </div>
                <div className="flex flex-col justify-evenly h-full">
                    {/* Sección Centro (Label Azul) */}
                    <div className="bg-gradient-to-b from-gray-600 to-black from-10% text-white px-6 py-2 h-16 flex justify-center w-full text-center">
                        <p className="tracking-wider mt-2 text-white">
                            PROFYNUS
                        </p>
                    </div>

                    {/* Sección Derecha (Descripción de Texto) */}
                    <div className="max-w-xl">
                        <p className="text-lg text-gray-200 text-center mx-auto ml-10">
                            <strong>Profynus</strong> es una plataforma innovadora que permite la descarga de pistas de audio
                            de YouTube de manera segura y eficiente. Diseñada con una arquitectura
                            <span className="text-cyan-400"> Frontend-Backend</span>, garantiza un alto rendimiento y protección de datos.
                            A diferencia de servicios fraudulentos, Profynus ofrece un entorno libre de malware,
                            con autenticación segura y sin riesgos para el usuario.
                            Explora una experiencia optimizada con una interfaz moderna en
                            <span className="text-cyan-500"> negro y cyan</span>.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
