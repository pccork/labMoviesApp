import React, {useState} from "react";
import useAuth from "../../hooks/useAuth";
//import { Password } from "@mui/icons-material";
//import { inputAdornmentClasses } from "@mui/material";

//use hooks with context to setup login form component for home page
const LoginForm = () => {
const { authenticated, login, logout, user } = useAuth();
const [username, setUsername] =useState("");
const [password, setPassword] =useState("");
const [error, setError] =useState("");

const handleLogin = () => {  // add event handler
        const success = login(username, password);
        if (!success){
            setError("Invalid")
        }    
      };

return authenticated ?(
    <div>    
        <p>Please login, {user}! </p>
        <button onClick={logout}> logout </button>
      </div>
    ):(
       <div>
        <h3>Login</h3>
        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} 
        />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleLogin}> login </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    
   );
};
    
export default LoginForm;   
    
  



