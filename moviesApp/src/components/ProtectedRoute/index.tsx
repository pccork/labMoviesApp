import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const ProtectedRoute:  React.FC<{ children: JSX.Element }> = ({ 
    children }) => {
    const {authenticated} = useAuth(); 
     return authenticated ? children : <Navigate to="/" replace />;
}; // if route is protected not login retrun back to home page

export default ProtectedRoute;