import { Container } from '@mui/material';
import React from 'react';
import AuthForm from '../../molecules/LoginForm/LoginForm';
import './LoginTemplate.css';

interface LoginTemplateProps{
    onLogin:(data:{email:string; password:string}) => void;
    onRegister:() => void;
}
const LoginTemplate: React.FC<LoginTemplateProps> = ({onLogin, onRegister}) => {
    return (
        <Container component="main" maxWidth="xs">
            <div>
            <h2>Sign In</h2>
            <AuthForm onSubmit={onLogin} />
            <p>Don't have an account? <span onClick={onRegister}>Register</span></p>
            </div>
        </Container>
    )
}

export default LoginTemplate;