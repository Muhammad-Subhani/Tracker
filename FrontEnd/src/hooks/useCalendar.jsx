import { useCalendarApi } from "../services/CalendarApi";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useCalendar = function() {
  const queryClient = useQueryClient();
  const { getCalendarEvents, createCalendarEvent } = useCalendarApi();

  const fetchCalendarEvents = useCallback(async () => {
    const events = await getCalendarEvents();
    console.log("Fetched calendar events:", events);
    return events;
  }, [getCalendarEvents]);

  const addCalendarEvent = useCallback(async (obj) => {
    const newEvent = await createCalendarEvent(obj);
    console.log("Added calendar event:", newEvent);
    queryClient.setQueryData(['calendarEvents'], (prev) => [...(prev ?? []), newEvent]);
  }, [createCalendarEvent, queryClient]);

  return {
    fetchCalendarEvents,
    addCalendarEvent,
  };
};
