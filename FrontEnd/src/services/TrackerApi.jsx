// requirements 
const API_ENDPOINT = "/api/createTrack";
const ENDPOINT_STOPWATCH = "/api/updateTrack";
const ENDPOINT_FETCHDATA = "/api/getTracks";
const ENDPOINT_DELETEONE = "/api/deleteParticular";
const ENDPOINT_DELETEALL = "/api/deleteAll";
import { useCallback } from "react";
import { useAxiosInterceptor } from "../hooks/useAxiosInterceptor.jsx";


export const useTrackerApi = function() {

  const axiosPrivate = useAxiosInterceptor();
  const HandleButtonClick = useCallback(async (content) => {
    try {
      const response = await axiosPrivate.post(API_ENDPOINT
        , { content: content })
      return response;
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }, [axiosPrivate])

  const HandleHaStop = useCallback(async (ID) => {
    try {
      const response = await axiosPrivate.patch(`${ENDPOINT_STOPWATCH}/${ID}`, {});
      return response?.data?.data?.track;
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }, [axiosPrivate])

  const FetchAllData = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(ENDPOINT_FETCHDATA, {});
      return response?.data?.data?.alltracks;
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }, [axiosPrivate])

  const DeleteParticular = useCallback(async (ID) => {
    try {
      const response = await axiosPrivate.delete(`${ENDPOINT_DELETEONE}/${ID}`, {});
      console.log(`Deleted ${response?.data?.data?.numDeleted} tracks `);
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }, [axiosPrivate])

  const DeleteAll = useCallback(async () => {
    try {
      const response = await axiosPrivate.delete(`${ENDPOINT_DELETEALL}`, {});
      console.log(`Deleted ${response?.data?.data?.numDeleted} tracks `);
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }, [axiosPrivate])
  // returning the data 
  return {
    HandleButtonClick,
    HandleHaStop,
    FetchAllData,
    DeleteParticular,
    DeleteAll,
  }
}
