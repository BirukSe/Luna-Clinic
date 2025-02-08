import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the context data structure
interface AuthContextType {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
  id: string;
  setId: (id: string) => void;
  clearId: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state with values from localStorage if available
  const [email, setEmailState] = useState<string>(localStorage.getItem("email") || "");
  const [id, setIdState] = useState<string>(localStorage.getItem("id") || "");

  // Function to update email and store it in localStorage
  const setEmail = (email: string) => {
    setEmailState(email);
    localStorage.setItem("email", email);
  };

  // Function to update ID and store it in localStorage
  const setId = (id: string) => {
    setIdState(id);
    localStorage.setItem("id", id);
  };

  // Function to clear email and remove it from localStorage
  const clearEmail = () => {
    setEmailState("");
    localStorage.removeItem("email");
  };

  // Function to clear ID and remove it from localStorage
  const clearId = () => {
    setIdState("");
    localStorage.removeItem("id");
  };

  // Sync with localStorage on component mount
  useEffect(() => {
    setEmailState(localStorage.getItem("email") || "");
    setIdState(localStorage.getItem("id") || "");
  }, []);

  return (
    <AuthContext.Provider value={{ email, setEmail, clearEmail, id, setId, clearId }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
