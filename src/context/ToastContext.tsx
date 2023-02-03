import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import './ToastContext.css';

interface ToastProps {
  message: string;
  color: string;
  delay: number;
}

interface ToastContextType {
  toast: ToastProps | null;
  handleToast: (toast: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

/**
 * Hook personalisé pour gérer le cas où le context est undefined
 * Si on ne le fais pas, une erreur va apparaitre en utilisant le context dans les autres composants
 * Ça permet aussi the nommé spécifiquement ce context pour mieux le différencier des autres context (comme user par exemple) et permet de n'avoir fait qu'un seul import pour l'utiliser
 */

export const useToast = () => {
  let context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "children must be inside the provider otherwise it won't work correctly"
    );
  }
  return context;
};

/**
 * Déclaration du Provider et de sa logique qui va venir entourer {children} (qui correspondra au reste de l'app).
 * Faire la logique du provider ici directement évite de surcharger le composant App.tsx
 */
interface ProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ProviderProps) => {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [show, toggleShow] = useState(false);

  const handleToast = (toast: ToastProps) => {
    setToast(toast);
    toggleShow(!show);
  };

  const stateValues = {
    toast,
    handleToast,
  };

  return (
    <ToastContext.Provider value={stateValues}>
      <ToastContainer
        className='p-3'
        containerPosition='fixed'
        position='top-center'
      >
        <Toast
          bg={toast?.color}
          onClose={() => toggleShow(!show)}
          show={show}
          delay={toast?.delay}
          autohide
          className='toast-custom'
        >
          <Toast.Body className='text-dark text-center fs-6'>
            {toast?.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
