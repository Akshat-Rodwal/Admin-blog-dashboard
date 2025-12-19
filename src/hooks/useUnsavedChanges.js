import { useEffect } from 'react';

// Warn user on page unload when there are unsaved changes
export const useUnsavedChangesWarning = (hasUnsavedChanges) => {
  useEffect(() => {
    if (!hasUnsavedChanges) return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      return e.returnValue;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);
};

