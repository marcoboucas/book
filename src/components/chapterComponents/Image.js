import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Fade from 'react-reveal/Fade';

const useStyles = makeStyles((theme) => ({
  image: {
    margin: theme.spacing(2, 0),
    maxWidth: '100%',
  },
}));
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
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}
        />
      </div>
    </Fade>
  );
}

export default Image;
