import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, ...rest }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', marginBottom: '8px' }}>{label}</label>
      <input
        style={{
          width: '100%',
          padding: '8px',
          boxSizing: 'border-box',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        {...rest}
      />
    </div>
  );
};

export default InputField;