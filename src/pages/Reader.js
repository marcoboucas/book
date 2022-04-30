/* eslint-disable max-len */
import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';

import {
  Typography, Button, ButtonGroup, Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Fade from 'react-reveal/Fade';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ScrollTop from '../components/ScrollTop';
import { updateChapter } from '../app/slices/chapterSlice';
import ContentElement from '../components/ContentElement';
import { getChapter } from '../app/functions/data';
import resetScroll from '../app/functions/scroll';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '1rem',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(2),
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: theme.spacing(3),
  },
  bottomButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
    paddingBottom: theme.spacing(6),
  },
}));

function Reader() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chapters = useSelector((state) => state.book.chapters);
  const title = useSelector((state) => state.chapter.title);
  const chapterContent = useSelector((state) => state.chapter.content);
  const chapterId = useSelector((state) => state.chapter.id);
  const nbrChapters = useSelector((state) => state.book.chapters.length || 0);

  const { id } = useParams();

  useEffect(() => {
    if (id !== chapterId && id >= 0 && id < nbrChapters) {
      (async () => {
        const data = await getChapter(chapters[id].contentFile);
        dispatch(updateChapter(data));
        resetScroll();
      })();
    } else {
      navigate('/');
    }
  }, [id, chapterId, nbrChapters]);

  const menuButtons = (
    <div className={classes.bottomButtons}>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        <Button
          component={Link}
          to={chapterId !== 0 ? `/chapitre/${chapterId - 1}` : '/'}
        >
          <KeyboardArrowLeftIcon />
        </Button>
        <Button>
          Chapitre
          {' '}
          {chapterId + 1}
        </Button>
        <Button
          component={Link}
          to={chapterId < nbrChapters ? `/chapitre/${chapterId + 1}` : '/'}
        >
          <KeyboardArrowRightIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
  return (
    <Container maxWidth="sm">
      <Toolbar id="back-to-top-anchor" />
      <Typography component="h2" className={classes.title}>
        {title}
      </Typography>
      <Fade>{menuButtons}</Fade>
      {chapterContent.map((paragraph, index) => <ContentElement key={index} paragraph={paragraph} />)}
      <Fade bottom>{menuButtons}</Fade>
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Container>
  );
}
export default Reader;
