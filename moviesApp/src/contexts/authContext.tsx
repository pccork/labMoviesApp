import { AuthInterface } from "../types/interfaces";
import React, { useState, useCallback } from "react";
//import { BaseMovieProps, Review } from "../types/interfaces";

const authState: AuthInterface = {
user: null,
login: () => false,
logout: () => {},
authenticated: false,
}

export const AuthContext = React.createContext<AuthInterface>(authState);

const AuthContextProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const [user, setUser] = useState<string | null>(
            localStorage.getItem("authUser")
             );  // Ensure login users stored in local storage
        
    const login = useCallback((username: string, password: string) => {
        
            if (username === "peterchuk" && password === "secret") {
                setUser(username);
                localStorage.setItem("authUser", username)
                return true;
            }
            return false;
        
    }, []);

    const logout = useCallback(() => {                   
          setUser(null);
          localStorage.removeItem("authUser");
    }, []);
    
    const authenticated =!!user;

    return (
        <AuthContext.Provider value={{user, login,logout, authenticated}}>
            {children}</AuthContext.Provider>
        );
};

export default AuthContextProvider //import to login compononet for update state