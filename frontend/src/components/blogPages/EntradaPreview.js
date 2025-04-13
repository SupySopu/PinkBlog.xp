import React from 'react';
import { useNavigate } from 'react-router-dom';

function EntradaPreview({ id, titulo, fecha, tags }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/entrada/${id}`);
  };

  return (
    <div onClick={handleClick}>
      <h2>{titulo}</h2>
      <p>{fecha}</p>
      <p>{tags}</p>
    </div>
  );
}

export default EntradaPreview;