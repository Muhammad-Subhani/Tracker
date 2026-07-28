export const TrackInput = function({ tracks, setTracks, AddTheTracks }) {
  async function AddTracksButton() {
    await AddTheTracks();
  }
  return (
    <>
      <input
        className="InputField"
        type="text"
        placeholder="Enter your tasks ..."
        value={tracks}
        onChange={(e) => setTracks(e.target.value)} />
      <button type="submit" onClick={AddTracksButton}>Start Task</button>
    </>
  )
}
