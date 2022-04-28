import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import { getBook } from '../functions/data'

import Reader from '../components/Reader'
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

  const [title, setTitle] = useState('');
  const [chapters, setChapters] = useState([]);

  const [chapterId, setChapterId] = useState(0);
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getBook()
      setTitle(data.title)
      setChapters(data.chapters)
      setChapterId(0)
    })()
  }, [])

  const changeChapter = (newChapterId) => {
    if (newChapterId >= 0 && newChapterId < chapters.length) {
      setChapterId(newChapterId)
    }
  }

  useEffect(() => {
    if (chapters.length > 0 && chapterId >= 0 && chapterId < chapters.length) {
      setChapterTitle(chapters[chapterId].title)
      setChapterContent(chapters[chapterId].content)
    }
  }, [chapterId, chapters])
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            {title || "Loading ..."}
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <nav>

      </nav>
      <header className="App-header">
        <Reader title={chapterTitle} chapterContent={chapterContent} chapterId={chapterId} changeChapter={changeChapter} />
      </header>
    </div>
  );
}

export default App;
