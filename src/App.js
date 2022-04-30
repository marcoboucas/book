import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ProgressBar from 'react-scroll-progress-bar';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BookDrawer from './components/Drawer';
import { getBook } from './app/functions/data';
import Reader from './pages/Reader';
import Accueil from './pages/Accueil';
import { updateBook } from './app/slices/bookSlice';

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

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const title = useSelector((state) => state.book.title);

  useEffect(() => {
    (async () => {
      const data = await getBook();
      dispatch(updateBook(data));
    })();
  }, []);

  const theme = useTheme();
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
          {/* <Button color="inherit">Login</Button> */}
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
      </Routes>
    </div>
  );
}

export default App;
