import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: any; // Replace 'any' with your user type
  logout: () => Promise<void>;
}

// Define the props type for AuthProvider
interface AuthProviderProps {
  children: ReactNode; // This allows children to be passed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>({
    id: '123',
    name: 'John Doe',
    isAdmin: true, // Set to true for testing
  });

  useEffect(() => {
    // Fetch user data from your auth service
    const fetchUser = async () => {
      // Replace with your actual user fetching logic
      const fetchedUser = await getUserFromAuthService();
      setUser(fetchedUser);
    };

    fetchUser();
  }, []);

  const logout = async () => {
    // Your logout logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 