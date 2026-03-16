import { useState, useCallback } from 'react';
import { storage, KEYS } from './useLocalStorage';

export function useActivity() {
  const logActivity = useCallback((module, description) => {
    const activities = storage.get(KEYS.ACTIVITY);
    const newEntry = {
      id: crypto.randomUUID(),
      module,
      description,
      timestamp: Date.now()
    };
    
    // Keep max 50 entries
    const updatedActivities = [newEntry, ...activities].slice(0, 50);
    storage.set(KEYS.ACTIVITY, updatedActivities);
  }, []);

  const getRelativeTime = useCallback((timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'just now';
  }, []);

  return { logActivity, getRelativeTime };
}
