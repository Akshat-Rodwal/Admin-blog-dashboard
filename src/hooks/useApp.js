import { useContext } from 'react';
import AppContext from '../context/AppContext';

// Hook to access App context outside the provider file to keep Fast Refresh happy
export const useApp = () => useContext(AppContext);

