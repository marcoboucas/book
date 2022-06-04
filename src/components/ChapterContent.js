/* eslint-disable no-unused-vars */
import React from 'react';
import { Typography, makeStyles, Divider } from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import { Trans } from 'react-i18next';
import sanitize from '../app/functions/text';

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

function Separator() {
  const classes = useStyles();
  return (
    <Fade bottom>
      <Divider variant="middle" className={classes.separator} />
    </Fade>
  );
}

function Image({ path, alt, width }) {
  const classes = useStyles();
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
          src={path}
          className={classes.image}
          alt={alt || 'No description found for this image, sorry 😥'}
          style={{
            width: width || '100%',
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}
        />
      </div>
    </Fade>
  );
}

function ChapterContent({ content, tagsInfos }) {
  const classes = useStyles();
  const components = {};
  Object.entries(tagsInfos ?? {}).forEach(([tag, info]) => {
    if (info.tag === 'img') {
      components[tag] = (
        <Image
          key={info.path}
          path={info.path}
          alt={info.alt}
          width={info.width}
        />
      );
    }
  });

  return (
    <Trans
      components={{
        hr: <Separator />,
        ...components,
      }}
    >
      {content}
    </Trans>
  );
}
export default ChapterContent;
