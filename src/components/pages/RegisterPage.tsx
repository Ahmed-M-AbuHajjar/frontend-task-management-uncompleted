import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/authProvider";
import RegisterTemplate from "../templates/Register/RegisterTemplate";

const RegisterPage:React.FC =() => {
    const { register } = useAuth()
    const navigate = useNavigate();


    const handleRegister = async (data: {email: string; userName: string; password:string}) => {
        try {
            await register(data);
            navigate('/login')
        } catch (error) {
            console.error('register failed',error);
        }
    };


    const handleLogin = () => {
        navigate('/login')
    }
    return <RegisterTemplate onRegister={handleRegister} onLogin={handleLogin} />
}

export default RegisterPage