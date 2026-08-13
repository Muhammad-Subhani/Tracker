import { useState } from "react"

export const AccessStates = function() {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("graphs")
  return {
    accessToken,
    setAccessToken,
    loading, setLoading,
    tab, setTab
  }
}

// tabs options are 
// [
//  graphs ,
//  todo ,
//  tracker
// ]
