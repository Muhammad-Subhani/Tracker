import { useAxiosInterceptor } from "../hooks/useAxiosInterceptor.jsx";
const GetALl_URL = '/api/calendar/getexistingevents';
const ADDNEW_URL = '/api/calendar/createnewevent';
import { useCallback } from 'react';
export const useCalendarApi = () => {
  const axiosPrivate = useAxiosInterceptor()
  const getCalendarEvents = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(GetALl_URL, {});
      return response?.data?.data?.data;
    } catch (err) {
      console.log(err)
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }, [axiosPrivate]);

  const createCalendarEvent = useCallback(async (eventData) => {
    try {
      const response = await axiosPrivate.post(ADDNEW_URL, eventData);
      return response?.data?.data?.data;

    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw error;
    }
  }, [axiosPrivate]);
  return {
    getCalendarEvents,
    createCalendarEvent,
  }
};
