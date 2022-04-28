import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useState, useEffect } from "react";
import { getBook } from "../functions/data";
import BookDrawer from "../components/Drawer";
import Reader from "../components/Reader";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Accueil from "../pages/accueil";

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

  const [menuOpen, setMenuOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [chapters, setChapters] = useState([]);

  const [chapterId, setChapterId] = useState("accueil");
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getBook();
      setTitle(data.title);
      setChapters(data.chapters);
    })();
  }, []);

  const changeChapter = (newChapterId) => {
    if (
      (newChapterId >= 0 && newChapterId < chapters.length) ||
      newChapterId === "accueil"
    ) {
      setChapterId(newChapterId);
    }
  };

  useEffect(() => {
    if (
      Number.isInteger(chapterId) &&
      chapters.length > 0 &&
      chapterId >= 0 &&
      chapterId < chapters.length
    ) {
      setChapterTitle(chapters[chapterId].title);
      setChapterContent(chapters[chapterId].content);
    }
  }, [chapterId, chapters]);
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
            {title || "Loading ..."}
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <BookDrawer
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        chapters={chapters || []}
        changeChapter={changeChapter}
      />
      <nav></nav>
      {Number.isInteger(chapterId) && (
        <Reader
          title={chapterTitle}
          chapterContent={chapterContent}
          chapterId={chapterId}
          changeChapter={changeChapter}
        />
      )}
      {chapterId === "accueil" && <Accueil changeChapter={changeChapter} />}
    </div>
  );
}

export default App;
