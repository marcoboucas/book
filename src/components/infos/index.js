/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CharacterInfos from "./CharacterInfos";

function GeneralInfos({ infos, onClose }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!infos || !infos.type) {
      navigate('/');
    }
  }, [infos, navigate]);

  switch (infos.type) {
    case "character":
      return <CharacterInfos infos={infos} onClose={onClose} />;

    default:
      throw new Error(`Unknown element type: ${infos.type}`);
  }
}
export default GeneralInfos;
