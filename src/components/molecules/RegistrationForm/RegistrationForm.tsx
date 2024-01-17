import React from 'react';
import CustomButton from '../../atoms/Button/Button';
import InputField from '../../atoms/Input/Input';


interface AuthFormProps {
  onSubmit: (data: { email: string; password: string; userName: string}) => void;
}

const RegisterForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const userName = formData.get('username') as string;
    const password = formData.get('password') as string;
    onSubmit({ email, userName, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField name="email" label="Email" type="email" required />
      <InputField name="username" label="User Name" type="text" required />
      <InputField name="password" label="Password" type="password"required />
      <CustomButton type="submit">Register</CustomButton>
    </form>
  );
};

export default RegisterForm;