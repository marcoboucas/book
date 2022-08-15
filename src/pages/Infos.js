/* eslint-disable react/no-unescaped-entities */
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import GeneralInfos from '../components/infos';

function Infos() {
  const navigate = useNavigate();

  const { id } = useParams();

  const element = useSelector(
    (state) => state.infos.elements.find((e) => e.id === id),
  );

  useEffect(() => {
    if (!element || !element.type) {
      navigate('/');
    }
  }, [element, navigate]);
  return (
    <Container maxWidth="sm">
      <GeneralInfos infos={element} />
    </Container>

  );
}
export default Infos;
