import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
// the context only provide references to avoid read the localstorage directly in the code
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado para evitar parpadeos

  useEffect(() => {
    const userData = localStorage.getItem("user");
    setUser(JSON.parse(userData));
    setLoading(false); // Marcamos que terminó de cargar
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    // Limpiar los toasts antes de recargar
    import("react-toastify").then(({ toast }) => {
      toast.dismiss(); // Cierra todos los toasts activos
    });
  
    // Redirigir y recargar la página
    window.location.href = "/";
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);