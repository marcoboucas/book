import sanitizeHtml from "sanitize-html";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { Divider } from "@material-ui/core";
import Fade from "react-reveal/Fade";

const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: "justify",
    whiteSpace: "pre-wrap",
    textIndent: theme.spacing(2),
  },
  separator: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    margin: theme.spacing(2, 0),
    maxWidth: "100%",
  },
}));
const ContentElement = ({ paragraph }) => {
  const classes = useStyles();
  if (paragraph.type === "text") {
    // Split at br to make some tab for new paragraphs
    return (
      <React.Fragment>
        {paragraph.content.split("<br/>").map((line, index) => {
          const cleanContent = sanitizeHtml(line, {
            allowedTags: ["b", "i", "em", "strong", "center"],
          });
          return (
            <Fade opposite cascade key={index}>
              <Typography
                component="p"
                variant="body1"
                display="block"
                className={classes.text}
                dangerouslySetInnerHTML={{ __html: cleanContent }}
              ></Typography>
            </Fade>
          );
        })}
      </React.Fragment>
    );
  } else if (paragraph.type === "separator") {
    return (
      <Fade bottom>
        <Divider variant="middle" className={classes.separator} />
      </Fade>
    );
  } else if (paragraph.type === "image") {
    return (
      <Fade bottom>
        <img
          src={paragraph.path}
          className={classes.image}
          alt={paragraph.alt || "No description found for this image, sorry 😥"}
        />
      </Fade>
    );
  } else {
    return <div>Unknown</div>;
  }
};

export default ContentElement;
