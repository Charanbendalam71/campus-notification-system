'use client';
import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useNotifications } from '../contexts/NotificationContext';

export const ToastContainer: React.FC = () => {
  const { toastNotification, clearToast } = useNotifications();

  return (
    <Snackbar
      open={!!toastNotification}
      autoHideDuration={6000}
      onClose={clearToast}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert 
        onClose={clearToast} 
        severity={toastNotification?.type === 'Result' ? 'error' : toastNotification?.type === 'Placement' ? 'success' : 'info'} 
        sx={{ width: '100%' }}
      >
        New {toastNotification?.type}: {toastNotification?.message}
      </Alert>
    </Snackbar>
  );
};
