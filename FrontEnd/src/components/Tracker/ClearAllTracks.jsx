import React from "react";
export const ClearTracks = React.memo(({ ClearAllTracks }) => {
  async function DeleteAllTracks() {
    await ClearAllTracks();
  }
  return (
    <button onClick={DeleteAllTracks}>Clear all </button>
  )
})
