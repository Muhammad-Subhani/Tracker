import { useCallback, useState } from "react";

export const TrackInput = function({ AddTheTracks }) {
  const [tracks, setTracks] = useState("");
  const AddTracksButton = useCallback(async (data) => {
    await AddTheTracks(data)
  }, [AddTheTracks])
  return (
    <>
      <input
        className="InputField"
        type="text"
        placeholder="Enter your tasks ..."
        value={tracks}
        onChange={(e) => setTracks(e.target.value)} />
      <button type="submit" onClick={() => AddTracksButton(tracks)}>Start Task</button>
    </>
  )
}
