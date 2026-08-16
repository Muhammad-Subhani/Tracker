// requirements 
const CREATE_ENDPOINT = "/api/todo/create";
const ENDPOINT_FETCHDATA = "/api/todo/allTodos";
const ENDPOINT_DELETEONE = "/api/todo/deleteone";
const ENDPOINT_DELETEALL = "/api/todo/deleteAll";
const ENPOINT_COMPLETE = "/api/todo/completionstatus"
import { useAxiosInterceptor } from "../hooks/useAxiosInterceptor.jsx";
import { useCallback } from "react";
export const useTodoApi = function() {

  const axiosPrivate = useAxiosInterceptor();

  const CreateTodo = useCallback(async (todo) => {
    try {
      const response = await axiosPrivate.post(CREATE_ENDPOINT,
        { content: todo })
      return response?.data?.data?.Todo;
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }, [axiosPrivate]);

  const GetAllTodods = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(ENDPOINT_FETCHDATA)
      return response?.data?.data?.Todo;
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }, [axiosPrivate]);

  const Deleteone = useCallback(async (id) => {
    try {
      const response = await axiosPrivate.delete(`${ENDPOINT_DELETEONE}/${id}`);
      return response?.data?.data?.noofdeletions
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }, [axiosPrivate]);

  const DeleteAll = useCallback(async () => {
    try {
      const response = await axiosPrivate.delete(ENDPOINT_DELETEALL);
      return response?.data?.data?.noofdeletions
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }, [axiosPrivate]);

  const UpdateComplete = useCallback(async (id) => {
    try {
      const response = await axiosPrivate.patch(`${ENPOINT_COMPLETE}/${id}`)
      return response?.data?.data?.Todo;
    } catch (err) {
      if (!err?.response) console.log("no response from the backend ");
      else if (err?.response.status === 401 || err?.response?.status === 400) console.log("unauthorized ")
      else console.error("error occured :", err);
    }
  }, [axiosPrivate]);
  return {
    CreateTodo,
    GetAllTodods,
    DeleteAll,
    Deleteone,
    UpdateComplete,
  }
}

