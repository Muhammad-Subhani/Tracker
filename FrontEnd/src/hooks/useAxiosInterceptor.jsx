import { axiosPrivate } from "../services/useAxiosPrivate";
import { useRefreshToken } from "./userefreshToken";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
export const AxiosInterceptor = () => {
  const { refresh } = useRefreshToken()
  const { accessToken } = useContext(AuthContext);
  useEffect(() => {
    // this interceptor would attach a accessToken to every ongoing req 
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${AuthContext?.accessToken}`
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
          prevRequest.sent = true; // prevent infinite retry loops
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest); // retry original request
        }
        return Promise.reject(error);
      }

    );
    // essential to remove them every time other wise they would pile up 
    return () => {
      axiosPrivate.interceptors.request.eject(reqInterceptor);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh])
  return axiosPrivate
}
