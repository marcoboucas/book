import React from "react";
import Fade from "react-reveal/Fade";

function SpotifyMusic({ url }) {
  if (!url) {
    return null;
  }

  return (
    <Fade right>
      <iframe
        title="spotify-music"
        style={{ borderRadius: "12px", overflow: "visible" }}
        src={url}
        width="100%"
        height="100"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
    </Fade>
  );
}
export default SpotifyMusic;
