import { useEffect } from 'react';
import { AuthContext } from "./AuthContext.js"
import { AccessStates } from "../hooks/useAuth.jsx"
export const AuthProvider = ({ children }) => {
  const { accessToken,
    setAccessToken,
    loading,
    setLoading } = AccessStates()
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("http://localhost:8080/Auth/GetAccessToken", {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.Access);
        }
      } catch (err) {
        console.error("Not logged in", err);
      } finally {
        setLoading(false);
      };
    };
    verifyAuth();
  }, [setAccessToken, setLoading]);
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

