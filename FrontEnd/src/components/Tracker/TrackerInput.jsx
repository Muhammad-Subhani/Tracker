export const TrackInput = function({ tracks, setTracks, AddTheTracks }) {
  return (
    <>
      <input
        className="InputField"
        type="text"
        placeholder="Enter your tasks ..."
        value={tracks}
        onChange={(e) => setTracks(e.target.value)} />
      <button type="submit" onClick={AddTheTracks}>Start Task</button>
    </>
  )
}
