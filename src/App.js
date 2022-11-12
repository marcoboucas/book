import { IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LightIcon from '@material-ui/icons/Brightness4';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import ProgressBar from 'react-scroll-progress-bar';
import { getBook, getBookInfos } from './app/functions/data';
import { updateBook } from './app/slices/bookSlice';
import { updateBookInfos } from './app/slices/infosSlice';
import BookDrawer from './components/Drawer';
import Accueil from './pages/Accueil';
import Infos from './pages/Infos';
import Reader from './pages/Reader';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App({ toggleTheme }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const title = useSelector((state) => state.book.title);

  useEffect(() => {
    (async () => {
      // Get the book content
      const bookData = await getBook();
      dispatch(updateBook(bookData));

      // Get book additional details
      const bookInfos = await getBookInfos();
      dispatch(updateBookInfos(bookInfos));
    })();
  }, []);

  return (
    <div className="App">

      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={() => {
              setMenuOpen(true);
            }}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title || 'Loading ...'}
          </Typography>
          <IconButton
            onClick={toggleTheme}
          >
            <LightIcon color="action" />
          </IconButton>

        </Toolbar>
        <ProgressBar bgcolor={theme.palette.primary.main} />
      </AppBar>
      <BookDrawer
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <Routes>
        <Route
          path="/"
          element={(
            <Accueil />
          )}
        />
        <Route
          path="/chapitre/:id"
          element={(
            <Reader />
          )}
        />
        <Route
          path="/infos/:id"
          element={(
            <Infos />
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
