'use client';
import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Notification, useNotifications } from '../contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const { markAsRead } = useNotifications();

  const getColor = (type: string) => {
    switch (type) {
      case 'Result': return 'error';
      case 'Placement': return 'success';
      case 'Event': return 'primary';
      default: return 'default';
    }
  };

  const handleHover = () => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  return (
    <Card 
      onMouseEnter={handleHover}
      sx={{ 
        mb: 2, 
        transition: 'all 0.3s',
        borderLeft: notification.isRead ? '4px solid transparent' : '4px solid #f50057',
        backgroundColor: notification.isRead ? 'background.paper' : '#fff5f8',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Chip label={notification.type} color={getColor(notification.type)} size="small" />
          <Typography variant="caption" color="text.secondary">
            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: notification.isRead ? 'normal' : 'medium' }}>
          {notification.message}
        </Typography>
      </CardContent>
    </Card>
  );
};
