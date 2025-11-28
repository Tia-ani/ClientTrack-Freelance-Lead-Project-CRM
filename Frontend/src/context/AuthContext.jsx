import { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Auto-login
  useEffect(() => {
    (async () => {
      const savedToken = await SecureStore.getItemAsync("token");
      if (savedToken) {
        setToken(savedToken);
        // You can fetch user details if you want
      }
    })();
  }, []);

  const loginUser = async (token, userData) => {
    await SecureStore.setItemAsync("token", token);
    setToken(token);
    setUser(userData);
  };

  const logoutUser = async () => {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
