import { axiosPrivate } from "./useAxiosPrivate.jsx"
const API_ENDPOINT = "/api/createTrack";
const ENDPOINT_CANCEL = "/api/updateTrack";
export const TrackerApi = function() {
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
      const response = await axiosPrivate.patch(`${ENDPOINT_CANCEL}/${ID}`, {});
      return response.data;
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }
  return {
    HandleButtonClick,
    HandleHaStop,
  }
}
