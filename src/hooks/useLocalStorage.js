import { useState, useEffect } from 'react';
import { seedProjects, seedRecognition, seedJournal, seedProfile } from '../data/seeds';

const KEYS = {
  AUTH:        'adnan_auth',        // sessionStorage
  PROJECTS:    'adnan_projects',
  PROFILE:     'adnan_profile',
  OUTREACH:    'adnan_outreach',
  RECOGNITION: 'adnan_recognition',
  JOURNAL:     'adnan_journal',
  ACTIVITY:    'adnan_activity',
};

// Storage utility
export const storage = {
  get: (key, defaultValue = []) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch a custom event to notify other instances of the hook
      window.dispatchEvent(new Event('storage_update'));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  },

  add: (key, item) => {
    const data = storage.get(key);
    // Use window.crypto.randomUUID if nanoid is not yet available, 
    // but the spec asks for nanoid eventually.
    const newItem = { 
      ...item, 
      id: crypto.randomUUID(), 
      createdAt: Date.now() 
    };
    storage.set(key, [newItem, ...data]);
    return newItem;
  },

  update: (key, id, patch) => {
    const data = storage.get(key);
    const updated = data.map(item => 
      item.id === id ? { ...item, ...patch, updatedAt: Date.now() } : item
    );
    storage.set(key, updated);
  },

  delete: (key, id) => {
    const data = storage.get(key);
    storage.set(key, data.filter(item => item.id !== id));
  },

  export: () => {
    const data = {};
    Object.values(KEYS).forEach(key => {
      data[key] = storage.get(key);
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adnan_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  import: (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      Object.keys(data).forEach(key => {
        if (Object.values(KEYS).includes(key)) {
          storage.set(key, data[key]);
        }
      });
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  },

  initialize: () => {
    try {
      if (!localStorage.getItem(KEYS.PROJECTS)) {
        storage.set(KEYS.PROJECTS, seedProjects);
      }
      if (!localStorage.getItem(KEYS.RECOGNITION)) {
        storage.set(KEYS.RECOGNITION, seedRecognition);
      }
      if (!localStorage.getItem(KEYS.JOURNAL)) {
        storage.set(KEYS.JOURNAL, seedJournal);
      }
      if (!localStorage.getItem(KEYS.PROFILE)) {
        storage.set(KEYS.PROFILE, seedProfile);
      }
      if (!localStorage.getItem(KEYS.ACTIVITY)) {
        storage.set(KEYS.ACTIVITY, []);
      }
      if (!localStorage.getItem(KEYS.OUTREACH)) {
        storage.set(KEYS.OUTREACH, []);
      }
    } catch (error) {
      console.error('Failed to initialize local storage:', error);
    }
  }

};

// React hook for reactive local storage
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => storage.get(key, defaultValue));

  useEffect(() => {
    const handleUpdate = () => {
      setValue(storage.get(key, defaultValue));
    };

    window.addEventListener('storage_update', handleUpdate);
    window.addEventListener('storage', handleUpdate); // For cross-tab sync

    return () => {
      window.removeEventListener('storage_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [key, defaultValue]);

  const setStoredValue = (newValue) => {
    storage.set(key, newValue);
    setValue(newValue);
  };

  return [value, setStoredValue];
}

export { KEYS };
