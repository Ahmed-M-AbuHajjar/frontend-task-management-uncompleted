import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './app/store';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './App';
import Router from './router';
import { AuthProvider } from './features/auth/authProvider';
import { BrowserRouter, Link as RouterLink, LinkProps as RouterLinkProps} from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  palette:{
    primary:{
      main:'#1976D2',
    },
    secondary:{
      main:'#ff4081',
    },
    background:{
      default:'#f4f4f4',
    },
  },
  typography:{
    fontFamily:'Roboto, sans-serif',
  },
  shape:{
    borderRadius:8,
  },
  components: {
    MuiAppBar: {
      styleOverrides:{
        colorPrimary: {
          backgroundColor: '#1976D2', 
        },
      },
    },
    MuiLink:{
      defaultProps:{
        component:LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase:{
      defaultProps:{
        LinkComponent:LinkBehavior,
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: 'white',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>
              <App/>
        </BrowserRouter>
        <Router/>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

