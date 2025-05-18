// src/contexts/DialogContext.tsx
import React, { createContext, useContext, useState, ReactNode, ComponentType } from 'react';

type DialogContextType = {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

type DialogProviderProps = {
  children: ReactNode;
};

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <DialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

export function withDialogProvider<P extends object>(WrappedComponent: ComponentType<P>) {
    const ComponentWithDialog: React.FC<P> = (props) => (
      <DialogProvider>
        <WrappedComponent {...props} />
      </DialogProvider>
    );
  
    // Daha okunaklı bir isim için displayName ayarlayabiliriz
    const wrappedName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    ComponentWithDialog.displayName = `withDialogProvider(${wrappedName})`;
  
    return ComponentWithDialog;
  }