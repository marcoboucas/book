/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import {
  Button, makeStyles, Container, ListItem, List, ListItemText, ListSubheader,
  Grid,
} from '@material-ui/core';
import React from 'react';
import { Fade } from 'react-reveal';
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
  couverture: {
    width: '100%',
    maxWidth: 250,
    position: 'float',
    filter: 'drop-shadow(2px 4px 6px black)',
    borderRadius: '4px',
    aspectRatio: 1 / 1.4,
  },
  link: {
    color: theme.palette.primary.main,
    '&:visited': {
      color: theme.palette.primary.main,
    },
    '&:hover': {
      color: theme.palette.action.active,
    },
  },
}));
function Accueil() {
  const classes = useStyles();

  const additionalData = useSelector((state) => state.book.additionalData);
  const chapters = useSelector((state) => state.book.chapters);

  const currentDate = new Date(Date.now());
  const nextChapterDate = new Date(additionalData.nextChapterDate);
  const dayInterval = Math.ceil(
    (nextChapterDate - currentDate) / (60 * 60 * 24 * 1000),
  );

  const nbrChapters = Math.min(chapters.length, additionalData.nbrPublicChapters);

  return (
    <Container maxWidth="sm">
      <h2 className={classes.title}>Accueil</h2>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Fade>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src="/book/images/couverture.webp" alt="couverture" className={classes.couverture} />
            </div>
          </Fade>
        </Grid>
        <Grid item xs={12} md={6}>

          <p className={classes.text} style={{ fontStyle: 'italic' }}>
            Paris, 2019. La vie poursuit son cours pour L??a, Vincent et El??onore,
            qui profitent de leurs vies respectives. Un incendie ravageur, au
            lendemain d'une d??couverte myst??rieuse. Et des ??v??nements ??tranges, qui
            viennent ?? en perturber le quotidien de nos personnages???
          </p>
          <p className={classes.text} style={{ fontWeight: 'bold' }}>
            Cette histoire va ??claircir les ??v??nements qui sont survenus cette
            ann??e-l?? et soulever le voile sur certaines v??rit??s que vous pr??f??reriez
            peut-??tre qu'elles restent cach??es.
          </p>
        </Grid>
      </Grid>
      <p className={classes.text}>
        Cette histoire est encore en cours d'??criture, mais vous pouvez d??j??
        profiter des
        {' '}
        <span style={{ fontWeight: 'bold' }}>
          {nbrChapters}
        </span>
        {' '}
        premiers chapitres, et d??couvrir en m??me temps que les personnages les
        myst??res qui se cachent dans nos vies.
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
        Le chapitre suivant sera termin?? dans moins de
        {' '}
        <span style={{ fontWeight: 'bold' }}>{dayInterval}</span>
        {' '}
        jours !
      </p>
      <List subheader={(
        <ListSubheader button component="div" id="nested-list-subheader">
          Chapitres disponibles
        </ListSubheader>
      )}
      >
        {chapters.map((chapter, index) => (
          <ListItem
            key={index}
            component={Link}
            className={classes.link}
            to={`/chapitre/${index}`}
          >

            <ListItemText
              primary={`Chapitre ${index + 1}`}
              secondary={chapter.title}
            />

          </ListItem>
        ))}
      </List>
    </Container>
  );
}
export default Accueil;
