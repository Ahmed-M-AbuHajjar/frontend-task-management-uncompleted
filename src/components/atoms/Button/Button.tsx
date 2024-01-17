import React from 'react';
import { Button, ButtonProps } from '@mui/material';

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button variant="contained" color="primary" {...props} />;
};

export default CustomButton;