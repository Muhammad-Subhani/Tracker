// requirements 
const API_ENDPOINT = "/api/createTrack";
const ENDPOINT_STOPWATCH = "/api/updateTrack";
const ENDPOINT_FETCHDATA = "/api/getTracks";
const ENDPOINT_DELETEONE = "/api/deleteParticular";
const ENDPOINT_DELETEALL = "/api/deleteAll";
import { useAxiosInterceptor } from "../hooks/useAxiosInterceptor.jsx";


export const useTrackerApi = function() {

  const axiosPrivate = useAxiosInterceptor();

  async function HandleButtonClick(content) {
    try {
      const response = await axiosPrivate.post(API_ENDPOINT
        , { content: content })
      return response;
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }

  async function HandleHaStop(ID) {
    try {
      const response = await axiosPrivate.patch(`${ENDPOINT_STOPWATCH}/${ID}`, {});
      return response?.data?.data?.track;
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }

  // call this function in useEffect 
  async function FetchAllData() {
    try {
      const response = await axiosPrivate.get(ENDPOINT_FETCHDATA, {});
      return response?.data?.data?.alltracks;
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }

  async function DeleteParticular(ID) {
    try {
      const response = await axiosPrivate.delete(`${ENDPOINT_DELETEONE}/${ID}`, {});
      console.log(`Deleted ${response?.data?.data?.numDeleted} tracks `);
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }

  async function DeleteAll() {
    try {
      const response = await axiosPrivate.delete(`${ENDPOINT_DELETEALL}`, {});
      console.log(`Deleted ${response?.data?.data?.numDeleted} tracks `);
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }

  // returning the data 
  return {
    HandleButtonClick,
    HandleHaStop,
    FetchAllData,
    DeleteParticular,
    DeleteAll,
  }
}
