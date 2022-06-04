import React from 'react';
import { makeStyles, Divider } from '@material-ui/core';
import Fade from 'react-reveal/Fade';

const useStyles = makeStyles((theme) => ({
  separator: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
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
export default Separator;
