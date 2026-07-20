import { AuthContext } from "./AuthContext";
import { AccessStates } from "../hooks/useAuth.jsx";
export const AuthProvider = function({ children }) {
  const {
    accessToken,
    setAccessToken,
    loading,
    setLoading,
  } = AccessStates()
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
