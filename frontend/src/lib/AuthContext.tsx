import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the context data structure
interface AuthContextType {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state with the value from localStorage if available
  const [email, setEmailState] = useState<string>(localStorage.getItem("email") || "");

  // Function to update the email and store it in localStorage
  const setEmail = (email: string) => {
    setEmailState(email);
    localStorage.setItem("email", email); // Save to localStorage
  };

  // Function to clear the email and remove it from localStorage
  const clearEmail = () => {
    setEmailState("");
    localStorage.removeItem("email"); // Remove from localStorage
  };

  // Optionally, you could listen for localStorage changes and update state accordingly
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmailState(storedEmail);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ email, setEmail, clearEmail }}>
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
