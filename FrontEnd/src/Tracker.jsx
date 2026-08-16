import { useTracks } from "./hooks/useTracks.jsx"
import { TrackInput } from "./components/Tracker/TrackerInput.jsx"
import { ClearTracks } from "./components/Tracker/ClearAllTracks.jsx"
import { ListOfTracks } from "./components/Tracker/ListOfTracks.jsx"
import { useTrackerApi } from "./services/TrackerApi.jsx"
import { useQuery } from "@tanstack/react-query"
export const TrackerSection = function() {

  const {
    AddTheTracks,
    SelectionOfTrackFunction,
    ClearAllTracks,
  } = useTracks();
  const { FetchAllData } = useTrackerApi();
  //
  // useEffect(() => {
  //   async function GetData() {
  //     const data = await FetchAllData();
  //     console.log(data)
  //     if (!data) setTrackerData([])
  //     else setTrackerData(data)
  //   }
  //   GetData();
  // }, [FetchAllData, setTrackerData])
  const { data: TrackerData = [], isLoading, isFetching, isError } = useQuery({
    queryKey: ['tracks'],
    queryFn: FetchAllData,
    staleTime: 30000,
  })
  if (isLoading) return <h1>Loading Trackers Tab First Time ...</h1>
  if (isError) return <p>Unexpected Error OOPS...</p>
  return (
    <>
      {isFetching && <p> Fetching the Tracker Data ...</p>}
      <TrackInput AddTheTracks={AddTheTracks} TrackerData={TrackerData} SelectionOfTrackFunction={SelectionOfTrackFunction} />
      <ClearTracks ClearAllTracks={ClearAllTracks} />
      <ListOfTracks TrackerData={TrackerData} SelectionOfTrackFunction={SelectionOfTrackFunction} />
    </>
  )
}
