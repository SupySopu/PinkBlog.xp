import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Entrada({ id }) {
  const [entrada, setEntrada] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/entradas/${id}`)
      .then(response => {
        setEntrada(response.data);
      })
      .catch(error => {
        console.error('Error fetching the entrada:', error);
      });
  }, [id]);

  if (!entrada) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{entrada.titulo}</h1>
      <p>{entrada.contenido}</p>
    </div>
  );
}

export default Entrada;