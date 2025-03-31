export const calculateActiveDays = (createdAt) => {
    if (!createdAt) return 0; // Evita errores si el dato no está disponible
  
    const createdDate = new Date(createdAt); // Convertir a objeto Date
    const currentDate = new Date(); // Fecha actual
  
    // Calcular la diferencia en milisegundos y convertir a días
    const differenceInMs = currentDate - createdDate;
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  
    return differenceInDays;
};
  