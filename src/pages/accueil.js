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
const Accueil = ({ changeChapter }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <h2 className={classes.title}>Accueil</h2>
      <p className={classes.text}>Bienvenue sur le site !</p>
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
    </Container>
  );
};
export default Accueil;
