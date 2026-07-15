import { useState } from "react"
export const AccessStates = function() {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  return {
    accessToken,
    setAccessToken,
    loading, setLoading
  }
}
