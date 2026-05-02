'use client';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiClient } from '../services/api';
import { Log } from 'logging_middleware';
import { useAuth } from './AuthContext';

export interface Notification {
  id: string;
  type: 'Event' | 'Result' | 'Placement';
  message: string;
  timestamp: string;
  isRead?: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  loading: boolean;
  fetchNotifications: (page?: number, type?: string) => Promise<void>;
  markAsRead: (id: string) => void;
  toastNotification: Notification | null;
  clearToast: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  loading: false,
  fetchNotifications: async () => {},
  markAsRead: () => {},
  toastNotification: null,
  clearToast: () => {},
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const [toastNotification, setToastNotification] = useState<Notification | null>(null);

  const sortNotifications = (notifs: Notification[]) => {
    const typePriority: Record<string, number> = {
      Result: 3,
      Placement: 2,
      Event: 1,
    };

    return [...notifs].sort((a, b) => {
      if (typePriority[a.type] !== typePriority[b.type]) {
        return typePriority[b.type] - typePriority[a.type];
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  };

  const fetchNotifications = useCallback(async (page: number = 1, type?: string) => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      Log('frontend', 'info', 'api', `Fetching notifications. Page: ${page}`);
      const params: any = { page, limit: 10 };
      if (type) params.notification_type = type;

      const response = await apiClient.get('/notifications', { params });
      
      // Merge and sort
      setNotifications(prev => {
        const merged = [...prev];
        response.data.forEach((n: Notification) => {
          if (!merged.find(existing => existing.id === n.id)) {
            merged.push({ ...n, isRead: false });
          }
        });
        return sortNotifications(merged);
      });
    } catch (error: any) {
      Log('frontend', 'error', 'api', `Failed to fetch notifications: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Simulate real-time updates
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      // Create a mock new notification randomly
      if (Math.random() > 0.8) {
        const types: ('Event' | 'Result' | 'Placement')[] = ['Event', 'Result', 'Placement'];
        const newNotif: Notification = {
          id: Math.random().toString(36).substring(7),
          type: types[Math.floor(Math.random() * types.length)],
          message: 'New simulated notification!',
          timestamp: new Date().toISOString(),
          isRead: false
        };

        setNotifications(prev => sortNotifications([newNotif, ...prev]));
        setToastNotification(newNotif);
        Log('frontend', 'info', 'component', 'Simulated new notification received');
      }
    }, 15000); // Check every 15s

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    Log('frontend', 'info', 'state', `Marked notification ${id} as read`);
  };

  const clearToast = () => setToastNotification(null);

  return (
    <NotificationContext.Provider value={{ notifications, loading, fetchNotifications, markAsRead, toastNotification, clearToast }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
