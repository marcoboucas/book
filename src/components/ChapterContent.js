/* eslint-disable no-unused-vars */
import React from "react";
import { Typography, makeStyles, Divider } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { Trans } from "react-i18next";
import sanitize from "../app/functions/text";
import {
  Image,
  SpotifyMusic,
  Separator,
  DeezerMusic,
} from "./chapterComponents";

function ChapterContent({ content, tagsInfos }) {
  const components = {};
  Object.entries(tagsInfos ?? {}).forEach(([tag, info]) => {
    if (info.tag === "img") {
      components[tag] = (
        <Image
          key={info.path}
          path={info.path}
          alt={info.alt}
          width={info.width}
        />
      );
    } else if (info.tag === "music") {
      components[tag] = (
        <div>
          <SpotifyMusic key={info.spotifyUrl} url={info.spotifyUrl} />

          <DeezerMusic key={info.deezerUrl} url={info.deezerUrl} />
        </div>
      );
    }
  });

  return (
    <Trans
      components={{
        hr: <Separator />,
        ...components,
      }}
    >
      {content}
    </Trans>
  );
}
export default ChapterContent;
