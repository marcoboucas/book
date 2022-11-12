/* eslint-disable no-unused-vars */
import {
  Button,
  Grid, makeStyles, Table, TableBody, TableCell, TableContainer, TableRow, Typography,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'none',
  },
  name: {
    paddingTop: theme.spacing(2),
  },
  tableContainer: {
    margin: theme.spacing(2, 1),
  },
  image: {
    borderRadius: '50%',
    padding: theme.spacing(2),
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: "absolute",
    right: 0,
  },
}));

function CharacterInfos({ infos, onClose }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.closeButton}>
        <Button type="button" onClick={onClose}>
          <CloseIcon />
        </Button>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div
            style={{
              width: '100%',
              maxWidth: 300,
              display: 'flex',
              margin: "auto",
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={infos.img}
              className={classes.image}
              alt={infos.name || 'No description found for this image, sorry 😥'}
              style={{
                width: '100%',
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" component="h2" className={classes.name}>
            {infos.name}
          </Typography>
          <TableContainer className={classes.tableContainer}>
            <Table className={classes.table} aria-label={`Informations à propos de ${infos.name}`}>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Age
                  </TableCell>
                  <TableCell align="right">{infos.details.age}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Activité
                  </TableCell>
                  <TableCell align="right">{infos.details.job}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {infos.description && (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" className={classes.name}>
            Description
          </Typography>
          <Typography variant="body1" component="p" style={{ paddingTop: 8 }}>
            {infos.description}
          </Typography>
        </Grid>
      </Grid>
      )}
    </div>
  );
}
export default CharacterInfos;
