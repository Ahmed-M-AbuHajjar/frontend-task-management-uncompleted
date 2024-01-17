import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/authProvider";
import { getAuthToken } from "../../services/authService";
import LoginTemplate from "../templates/Login/LoginTemplate";

const LoginPage:React.FC =() => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [rerenderKey, setRerenderKey] = useState(0);

    const handleLogin = async (data: {email: string; password:string}) => {
        try {
            await login(data);
            setRerenderKey((prevKey) => prevKey + 1);
        } catch (error) {
            console.error('Login failed',error);
        }
    };
    useEffect(() => {
        const navigateToDashboard = async () => {
            const storedToken = getAuthToken();
            if(storedToken){
                navigate('/dashboard'); 
            }
        };
        navigateToDashboard();
    }, [navigate]);

    const handleRegister = () => {
        navigate('/register')
    }
    return <LoginTemplate onLogin={handleLogin} onRegister={handleRegister} key={rerenderKey} />
}

export default LoginPage