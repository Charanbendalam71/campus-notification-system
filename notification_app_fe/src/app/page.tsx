'use client';
import React, { useEffect } from 'react';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useNotifications } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';
import { NotificationCard } from '../components/NotificationCard';

export default function Dashboard() {
  const { notifications, loading, fetchNotifications } = useNotifications();
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications(1);
    }
  }, [isAuthenticated, fetchNotifications]);

  if (authLoading || (loading && notifications.length === 0)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Dashboard shows Top 10 unread notifications
  const topUnread = notifications.filter(n => !n.isRead).slice(0, 10);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Top High Priority Unread Notifications
      </Typography>
      
      {topUnread.length === 0 ? (
        <Alert severity="info">You're all caught up! No unread notifications.</Alert>
      ) : (
        topUnread.map(notif => (
          <NotificationCard key={notif.id} notification={notif} />
        ))
      )}
    </Box>
  );
}
