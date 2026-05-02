'use client';
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <NotificationsIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Campus Connect
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} href="/">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} href="/notifications">
            All Notifications
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
