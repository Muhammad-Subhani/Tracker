import { axiosPrivate } from "./useAxiosPrivate.jsx"
const API_ENDPOINT = "/api/createTrack";
export const TrackerApi = function() {
  async function HandleButtonClick(content) {
    try {
      const response = await axiosPrivate.post(API_ENDPOINT
        , { content: content })
      return response;
    } catch (err) {
      if (!err?.response) console.log("NO response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("Error Occured :", err);
    }
  }
  return {
    HandleButtonClick,
  }
}
