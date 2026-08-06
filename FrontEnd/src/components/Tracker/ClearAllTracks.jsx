export const ClearTracks = function({ ClearAllTracks }) {
  async function DeleteAllTracks() {
    await ClearAllTracks();
  }
  return (
    <button onClick={DeleteAllTracks}>Clear all </button>
  )
}
