import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useRefreshToken } from "../hooks/userefreshToken";
export const PersistentLogin = function({ children }) {

  const {
    accessToken,
    setAccessToken,
    Loading,
    setLoading
  } = useContext(AuthContext);
  const { refresh } = useRefreshToken();

  useEffect(() => {

    // this thing protects us agaianst the memory leak when user 
    // ahs unmounted the component 

    let isMounted = true;
    const verifyRefToken = async () => {
      try {
        const newaccesstoken = await refresh();
        setAccessToken(newaccesstoken);
      } catch (err) {
        console.error("An error occured !", err);
      }
      finally {
        isMounted && setLoading(false);
      }
    }
    if (!accessToken) verifyRefToken();
    else setLoading(false);

    // runs by the react itself in the end so you dont need to set it false manually 
    return () => isMounted = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (Loading) return (
    <div>
      Loading ......
    </div>
  )
  return children
}
