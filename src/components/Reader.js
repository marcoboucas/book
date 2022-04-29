import React from "react";
import Container from "@material-ui/core/Container";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import ScrollTop from "./ScrollTop";
import { Button, ButtonGroup, Toolbar } from "@material-ui/core";
import ContentElement from "./ContentElement";
const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: "1rem",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    textAlign: "center",
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(2),
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: theme.spacing(3),
  },
  bottomButtons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
    paddingBottom: theme.spacing(6),
  },
}));

const Reader = ({
  title,
  chapterContent,
  chapterId,
  changeChapter,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Toolbar id="back-to-top-anchor" />
      <Typography component={"h2"} className={classes.title}>
        {title}
      </Typography>
      {chapterContent.map((paragraph, index) => {
        return <ContentElement key={index} paragraph={paragraph} />;
      })}
      <div className={classes.bottomButtons}>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button
            onClick={() => {
              changeChapter(chapterId - 1);
            }}
          >
            <KeyboardArrowLeftIcon />
          </Button>
          <Button>Chapitre {chapterId + 1}</Button>
          <Button
            onClick={() => {
              changeChapter(chapterId + 1);
            }}
          >
            <KeyboardArrowRightIcon />
          </Button>
        </ButtonGroup>
      </div>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Container>
  );
};
export default Reader;
