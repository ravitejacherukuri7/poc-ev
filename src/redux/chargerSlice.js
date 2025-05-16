import { createSlice } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const initialState = {
  list: [],
};

const generateId = () => {
  
  return Math.random().toString(36).substr(2, 9);
};

const getStatusForCommand = (currentStatus, command) => {
  switch (command) {
    case 'turnOn':
      return currentStatus === 'offline' ? 'online' : currentStatus;
    case 'startCharging':
      return currentStatus === 'online' ? 'charging' : currentStatus;
    case 'stopCharging':
      return currentStatus === 'charging' ? 'ready' : currentStatus;
    case 'fault':
      return 'fault';
    default:
      return currentStatus;
  }
};

const chargerSlice = createSlice({
  name: 'chargers',
  initialState,
  reducers: {
    load: (state) => {
      try {
        const data = loadFromLocalStorage('chargers');
        if (data && Array.isArray(data)) {
          state.list = data;
        }
      } catch (error) {
        console.error('Failed to load chargers from localStorage:', error);
      }
    },
    add: (state, action) => {
      const { name } = action.payload;
      const newCharger = {
        id: generateId(),
        name,
        status: 'offline',
      };
      state.list.push(newCharger);
      saveToLocalStorage('chargers', state.list);
    },
    remove: (state, action) => {
      const { id } = action.payload;
      state.list = state.list.filter((c) => c.id !== id);
      saveToLocalStorage('chargers', state.list);
    },
    removeAll: (state) => {
      state.list = [];
      saveToLocalStorage('chargers', state.list);
    },
    resetAll: (state) => {
      state.list = state.list.map((c) => ({ ...c, status: 'offline' }));
      saveToLocalStorage('chargers', state.list);
    },
    command: (state, action) => {
      const { id, command } = action.payload;
      const charger = state.list.find((c) => c.id === id);
      if (charger) {
        const newStatus = getStatusForCommand(charger.status, command);
        if (newStatus !== charger.status) {
          charger.status = newStatus;
        }
        saveToLocalStorage('chargers', state.list);
      }
    },
  },
});

export const { load, add, remove, removeAll, resetAll, command } = chargerSlice.actions;
export default chargerSlice.reducer;