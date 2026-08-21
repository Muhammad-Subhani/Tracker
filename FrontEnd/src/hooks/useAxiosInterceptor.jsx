// requirements 
import { axiosPrivate } from "../services/useAxiosPrivate";
import { useRefreshToken } from "./userefreshToken";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";

// interceptor 
export const useAxiosInterceptor = () => {

  const { refresh, LogOutFromOneDevice } = useRefreshToken()
  const { accessToken, setAccessToken } = useContext(AuthContext);

  useEffect(() => {

    // this interceptor would attach a accessToken to every ongoing req 
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    // now this will be the response interceptors 
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          } catch (refreshError) {
            // refresh token itself is dead — this is the missing branch
            LogOutFromOneDevice();               // clear context/state
            window.location.href = "/Auth/Login";
            setAccessToken("");
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }

    );

    // essential to remove them every time other wise they would pile up 
    return () => {
      axiosPrivate.interceptors.request.eject(reqInterceptor);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh, LogOutFromOneDevice, setAccessToken])

  // in the last returning the axios instance 
  return axiosPrivate
}
