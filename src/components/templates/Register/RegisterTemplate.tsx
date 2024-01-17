import { Container } from '@mui/material';
import React from 'react';
import RegisterForm from '../../molecules/RegistrationForm/RegistrationForm';


interface RegisterTemplateProps{
    onRegister:(data:{email:string; userName:string; password:string}) => void;
    onLogin:() => void;
}
const RegisterTemplate: React.FC<RegisterTemplateProps> = ({onRegister, onLogin}) => {
    return (
        <Container component="main" maxWidth="xs">
            <div>
            <h2>Register</h2>
            <RegisterForm onSubmit={onRegister} />
            <p>Already Registered? <span onClick={onLogin}>Login</span></p>
            </div>
        </Container>
    )
}

export default RegisterTemplate;