# Profynus - Plataforma para Descarga Segura de Audio

## Descripción
Profynus es una aplicación web diseñada para permitir la descarga segura de pistas de audio desde videos de YouTube. Su objetivo es ofrecer una alternativa confiable y libre de riesgos frente a sitios fraudulentos o aplicaciones no autorizadas. La plataforma implementa una arquitectura frontend-backend moderna con tecnologías actualizadas para garantizar seguridad, rendimiento y facilidad de uso.

## Características Principales
- Descarga de audio en formato **MP3** desde enlaces de YouTube.
- Límite de **32 descargas diarias** por usuario registrado.
- **Autenticación segura** mediante registro propio o inicio de sesión con **OAuth de Google**.
- Seguridad de datos con contraseñas almacenadas bajo **hashes cifrados**.
- Interfaz intuitiva y optimizada utilizando **React y Tailwind CSS**.
- Backend robusto en **.NET 8.0** con manejo eficiente de peticiones concurrentes.
- **Almacenamiento en SQL Server** para registro de usuarios y monitoreo de descargas.

## Tecnologías Utilizadas
### Frontend
- **React v18.0** - Biblioteca para la construcción de la interfaz de usuario.
- **Tailwind CSS v4** - Estilos y diseño responsivo optimizado.
- **Vercel** - Hosting para despliegue de la aplicación.
- **Adobe Colors** - Paleta de colores para diseño visual atractivo.

### Backend
- **.NET 8.0** - Framework para la construcción de APIs REST.
- **SQL Server** - Base de datos para almacenamiento de usuarios y registros de actividad.
- **Ngrok** - Exposición de servicios para pruebas en la nube.
- **Node.js** - Utilizado para procesos específicos de validación y rendering.

## Instalación y Configuración
### Requisitos Previos
- Node.js instalado (para el frontend)
- .NET 8.0 instalado (para el backend)
- SQL Server configurado

### Instalación del Frontend
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/tuusuario/profynus.git
   cd profynus/frontend
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Ejecutar la aplicación en modo desarrollo:
   ```sh
   npm run dev
   ```

### Instalación del Backend
1. Navegar al directorio del backend:
   ```sh
   cd ../backend
   ```
2. Restaurar dependencias de .NET:
   ```sh
   dotnet restore
   ```
3. Configurar la conexión a la base de datos en `appsettings.json`.
4. Ejecutar el servidor:
   ```sh
   dotnet run
   ```

## Uso de la Aplicación
1. Iniciar sesión con Google o registrarse con un correo y contraseña.
2. Pegar el enlace del video de YouTube en el campo correspondiente.
3. Hacer clic en el botón de descarga y esperar la conversión.
4. Descargar el archivo de audio MP3 generado.

## Seguridad y Restricciones
- Se permiten únicamente descargas desde **YouTube.com**.
- No se almacenan archivos descargados en los servidores de Profynus.
- Se monitorean intentos de descarga fraudulentos y cuentas sospechosas pueden ser bloqueadas.
- Se respetan las normativas de protección de datos y privacidad de los usuarios.

## Licencia
Este proyecto está bajo la licencia **MIT**, lo que permite su uso, modificación y distribución con fines educativos y comerciales.

## Contacto
Para dudas, reportes de errores o sugerencias, contáctanos en **profynus.support@gmail.com** o visita nuestro [repositorio en GitHub](https://github.com/tuusuario/profynus).

