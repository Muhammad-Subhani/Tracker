import axios from "../services/api.js"
import { AuthContext } from "../context/AuthContext.js"
import { useCallback, useContext } from "react"
export const useRefreshToken = () => {
  const {
    setAccessToken,
  } = useContext(AuthContext)
  const refresh = useCallback(async () => {
    const response = await axios.get("/Auth/GetToken",
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    setAccessToken(response.data.Access);
    return response.data.Access;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return {
    refresh,
  }
}
