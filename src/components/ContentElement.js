import sanitizeHtml from "sanitize-html";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: "justify",
    whiteSpace: "pre-wrap",
    textIndent: theme.spacing(2),
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
            allowedTags: ["b", "i", "em", "strong", "a"],
          });
          return (
            <Typography
              key={index}
              component="p"
              variant="body1"
              display="block"
              className={classes.text}
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            ></Typography>
          );
        })}
      </React.Fragment>
    );
  } else {
    return <div>Unknown</div>;
  }
};

export default ContentElement;
