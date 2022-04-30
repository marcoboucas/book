import sanitizeHtml from 'sanitize-html';
import { Typography, makeStyles, Divider } from '@material-ui/core';

import React from 'react';

import Fade from 'react-reveal/Fade';

const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: 'justify',
    whiteSpace: 'pre-wrap',
    textIndent: theme.spacing(2),
  },
  separator: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image: {
    margin: theme.spacing(2, 0),
    maxWidth: '100%',
  },
}));
function ContentElement({ paragraph }) {
  const classes = useStyles();
  if (paragraph.type === 'text') {
    // Split at br to make some tab for new paragraphs
    return (
      <>
        {paragraph.content.split('<br/>').map((line, index) => {
          const cleanContent = sanitizeHtml(line, {
            allowedTags: ['b', 'i', 'em', 'strong', 'center'],
          });
          return (
            <Fade opposite cascade key={index}>
              <Typography
                component="p"
                variant="body1"
                display="block"
                className={classes.text}
                dangerouslySetInnerHTML={{ __html: cleanContent }}
                style={paragraph.style || {}}
              />
            </Fade>
          );
        })}
      </>
    );
  } if (paragraph.type === 'separator') {
    return (
      <Fade bottom>
        <Divider variant="middle" className={classes.separator} />
      </Fade>
    );
  } if (paragraph.type === 'image') {
    return (
      <Fade left>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={paragraph.path}
            className={classes.image}
            alt={
              paragraph.alt || 'No description found for this image, sorry 😥'
            }
            style={{
              width: paragraph.width || '100%',
            }}
          />
        </div>
      </Fade>
    );
  }
  return <div>Unknown</div>;
}

export default ContentElement;
