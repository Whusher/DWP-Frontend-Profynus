import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ Component , isAdmin = false}) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>; // Para evitar parpadeos
    return user ? <Component /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;