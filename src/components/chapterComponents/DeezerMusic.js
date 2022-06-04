import React from "react";
import Fade from "react-reveal/Fade";

function SpotifyMusic({ url }) {
  if (!url) {
    return null;
  }

  return (
    <Fade right>
      <iframe
        title="deezer-music"
        src={url}
        width="100%"
        height="200"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media; clipboard-write"
      />
    </Fade>
  );
}
export default SpotifyMusic;
