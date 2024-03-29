/* eslint-disable no-unused-vars */
import { makeStyles, Modal, Paper } from "@material-ui/core";
import React from "react";
import { Trans } from "react-i18next";
import { useSelector } from "react-redux";
import {
  DeezerMusic, Image, Separator, SpotifyMusic,
} from "./chapterComponents";
import GeneralInfos from "./infos";

const useStyles = makeStyles((theme) => ({
  modalPaper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    maxHeight: "95vh",
    overflowY: "auto",
    overflowX: "hidden",
  },
}));

function ChapterContent({ content, tagsInfos }) {
  const classes = useStyles();
  const components = {};
  const [currentOpenedModal, setCurrentOpenedModal] = React.useState("");

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

  // Add components for each element of the book (characters, ...)
  const bookElements = useSelector((state) => state.infos.elements);
  bookElements.forEach((bookElement) => {
    const tag = `infos-${bookElement.id}`;
    components[tag] = (
      // eslint-disable-next-line max-len
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <span
        style={{
          cursor: "help",
          backgroundColor: "#0054ff14",
          padding: 3,
          borderRadius: 5,
        }}
        key={tag}
        onClick={() => {
          setCurrentOpenedModal(tag);
        }}
      >
        {bookElement.name}
      </span>
    );
  });

  const currentOpenedModalData = bookElements.find(
    (e) => `infos-${e.id}` === currentOpenedModal,
  );
  return (
    <>
      <Modal
        open={currentOpenedModal && currentOpenedModalData}
        onClose={() => { setCurrentOpenedModal(""); }}
      >

        <Paper className={classes.modalPaper}>
          <GeneralInfos infos={currentOpenedModalData} onClose={() => { setCurrentOpenedModal(""); }} />
        </Paper>
      </Modal>
      <Trans
        components={{
          hr: <Separator />,
          ...components,
        }}
      >
        {content}
      </Trans>

    </>
  );
}
export default ChapterContent;
