import { useCallback } from "react"
import { useTrackerApi } from "../services/TrackerApi";
import { useQueryClient } from "@tanstack/react-query";
export const useTracks = function() {
  const queryClient = useQueryClient();
  const {
    HandleButtonClick,
    HandleHaStop,
    DeleteParticular,
    DeleteAll
  } = useTrackerApi()
  //const [TrackerData, setTrackerData] = useState([]);

  const AddTheTracks = useCallback(async (data) => {
    const response = await HandleButtonClick(data);
    const TrackFromDB = response?.data?.data?.track;
    //setTrackerData(prev => [...prev, TrackFromDB]);
    queryClient.setQueryData(['tracks'], (prev) => [...(prev ?? []), TrackFromDB]);
  }, [HandleButtonClick, queryClient])

  const HandleClearTracks = useCallback(async (ID) => {
    await DeleteParticular(ID);
    //setTrackerData((prev) => prev.filter(p => p._id != ID))
    queryClient.setQueryData(['tracks'], (prev) =>
      (prev ?? []).filter(p => p._id != ID)
    );
  }, [DeleteParticular, queryClient])


  const SelectionOfTrackFunction = useCallback(async (id, ID) => {
    if (id == 1) HandleClearTracks(ID)
    // else do the cancel button api here !!
    else {
      const modified = await HandleHaStop(ID);
      //setTrackerData((prev) => prev.map((obj) => (obj._id == ID) ? { ...obj, ...modified } : obj));
      queryClient.setQueryData(['tracks'], (prev) =>
        (prev ?? []).map((obj) => (obj._id == ID) ? { ...obj, ...modified } : obj)
      );
    }
  }, [HandleClearTracks, queryClient, HandleHaStop])

  const ClearAllTracks = useCallback(async () => {
    await DeleteAll()
    //setTrackerData(prev => prev.filter(p => p.HasStop === false))
    queryClient.setQueryData(['tracks'], (prev) =>
      (prev ?? []).filter(p => p.HasStop === false)
    );
  }, [queryClient, DeleteAll])

  return {
    AddTheTracks,
    HandleClearTracks,
    SelectionOfTrackFunction,
    ClearAllTracks,
  }
}
