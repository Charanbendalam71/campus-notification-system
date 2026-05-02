'use client';
import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useNotifications } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import { NotificationCard } from '../../components/NotificationCard';

export default function AllNotifications() {
  const { notifications, loading, fetchNotifications } = useNotifications();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [filterType, setFilterType] = useState<string>('All');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications(page, filterType !== 'All' ? filterType : undefined);
    }
  }, [isAuthenticated, fetchNotifications, page, filterType]);

  const handleFilterChange = (event: React.MouseEvent<HTMLElement>, newType: string | null) => {
    if (newType !== null) {
      setFilterType(newType);
      setPage(1); // Reset page on filter change
    }
  };

  const filteredNotifications = filterType === 'All' 
    ? notifications 
    : notifications.filter(n => n.type === filterType);

  if (authLoading || (loading && notifications.length === 0 && page === 1)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          All Notifications
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={filterType}
          exclusive
          onChange={handleFilterChange}
          aria-label="Filter Notifications"
        >
          <ToggleButton value="All">All</ToggleButton>
          <ToggleButton value="Result">Results</ToggleButton>
          <ToggleButton value="Placement">Placements</ToggleButton>
          <ToggleButton value="Event">Events</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {filteredNotifications.length === 0 ? (
        <Typography variant="body1" color="text.secondary">No notifications found.</Typography>
      ) : (
        filteredNotifications.map(notif => (
          <NotificationCard key={notif.id} notification={notif} />
        ))
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
        <Button 
          variant="outlined" 
          onClick={() => setPage(p => p + 1)}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </Button>
      </Box>
    </Box>
  );
}
