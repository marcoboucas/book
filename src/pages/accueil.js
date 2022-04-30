/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import { Button, makeStyles, Container } from '@material-ui/core';
import React from 'react';

import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '1rem',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: theme.spacing(3),
  },
}));
function Accueil() {
  const classes = useStyles();

  const additionalData = useSelector((state) => state.book.additionalData);
  const chapters = useSelector((state) => state.book.chapters);

  const currentDate = new Date(Date.now());
  const nextChapterDate = new Date(additionalData.nextChapterDate);
  const dayInterval = Math.floor(
    (nextChapterDate - currentDate) / (60 * 60 * 24 * 1000),
  );

  return (
    <Container maxWidth="sm">
      <h2 className={classes.title}>Accueil</h2>
      <p className={classes.text}>Bienvenue sur le site !</p>
      <p className={classes.text} style={{ fontStyle: 'italic' }}>
        Paris, 2019. La vie poursuit son cours pour Léa, Vincent et Eléonore,
        qui profitent de leurs vies respectives. Un incendie ravageur, au
        lendemain d'une découverte mystérieuse. Et des évènements étranges, qui
        viennent à en perturber le quotidien de nos personnages…
      </p>
      <p className={classes.text} style={{ fontWeight: 'bold' }}>
        Cette histoire va éclaircir les évènements qui sont survenus cette
        année-là et soulever le voile sur certaines vérités que vous préféreriez
        peut-être qu'elles restent cachées.
      </p>
      <p className={classes.text}>
        Cette histoire est encore en cours d'écriture, mais vous pouvez déjà
        profiter des
        {' '}
        <span style={{ fontWeight: 'bold' }}>
          {Math.min(chapters.length, additionalData.nbrPublicChapters)}
        </span>
        {' '}
        premiers chapitres, et découvrir en même temps que les personnages les
        mystères qui se cachent dans nos vies.
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          variant="outlined"
          component={Link}
          to="/chapitre/0"
        >
          Commencer ma lecture
        </Button>
      </div>
      <p className={classes.text}>
        Le chapitre 2 sera terminé dans moins de
        {' '}
        <span style={{ fontWeight: 'bold' }}>{dayInterval}</span>
        {' '}
        jours !
      </p>
    </Container>
  );
}
export default Accueil;
