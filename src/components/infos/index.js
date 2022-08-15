/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import {
  Typography, makeStyles, Grid, TableContainer, Paper, Table, TableBody, TableRow, TableCell, Modal,
} from "@material-ui/core";
import { Fade } from "react-reveal";
import { useNavigate } from "react-router-dom";
import CharacterInfos from "./CharacterInfos";

function GeneralInfos({ infos }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!infos || !infos.type) {
      navigate('/');
    }
  }, [infos, navigate]);

  switch (infos.type) {
    case "character":
      return <CharacterInfos infos={infos} />;

    default:
      throw new Error(`Unknown element type: ${infos.type}`);
  }
}
export default GeneralInfos;
