import { Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: "1rem",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    textAlign: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: theme.spacing(3),
  },
}));
const Accueil = ({ changeChapter, chapters, additionalData }) => {
  const classes = useStyles();

  const currentDate = new Date(Date.now());
  const nextChapterDate = new Date(additionalData.nextChapterDate);
  const dayInterval = Math.floor(
    (nextChapterDate - currentDate) / (60 * 60 * 24 * 1000)
  );

  return (
    <Container maxWidth="md">
      <h2 className={classes.title}>Accueil</h2>
      <p className={classes.text}>Bienvenue sur le site !</p>
      <p className={classes.text}>
        Cette histoire est en cours d'écriture et comporte actuellement{" "}
        <span style={{ fontWeight: "bold" }}>
          {Math.min(chapters.length, additionalData.nbrPublicChapters)}
        </span>{" "}
        chapitres
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            changeChapter(0);
          }}
        >
          Commencer ma lecture
        </Button>
      </div>
      <p className={classes.text}>
        Prochain chapitre dans moins de{" "}
        <span style={{ fontWeight: "bold" }}>{dayInterval}</span> jours
      </p>
    </Container>
  );
};
export default Accueil;
