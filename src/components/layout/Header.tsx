import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { getUserIdFromToken } from "../../utils/authUtils";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../features/auth/authProvider";


const Header: React.FC = () => {
    const { logout } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const userId = getUserIdFromToken()
    const isLoggedIn = !!userId;

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    const navLinks = [
        { label: "profile", path: `/profile/${userId}` },
        { label: "dashboard", path: '/dashboard' },
        { label: "Logout", path: '/login'},
        
    ];

    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    {isMobile ? (
                        <>
                            <IconButton color='inherit' onClick={() => toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6">
                                Task Management App
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" style={{ flexGrow: 1 }}>Task Management App</Typography>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {isLoggedIn &&
                                    navLinks.map((link, index) => (
                                        <Typography key={index} variant="h6" style={{ marginRight: theme.spacing(2) }}>
                                            {link.label === "Logout" ? (
                                                <RouterLink to={link.path} style={{ textDecoration: 'none', color: 'inherit' }} onClick={logout}>
                                                    {link.label}
                                                </RouterLink>
                                            ) : (
                                                <RouterLink to={link.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    {link.label}
                                                </RouterLink>
                                            )}
                                        </Typography>
                                    ))
                                }
                            </div>
                        </>
                    )}
                </Toolbar>
            </AppBar>
              <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
                <List>
                    {isLoggedIn &&
                        navLinks.map((link, index) => (
                            <ListItem button key={index} onClick={() => toggleDrawer(false)}>
                                <ListItemText>
                                    <RouterLink to={link.path} style={{ textDecoration: 'none', color: 'inherit' }} onClick={link.label === "Logout" ? logout : undefined}>
                                        {link.label}
                                    </RouterLink>
                                </ListItemText>
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
        </>
    );
};

export default Header;
