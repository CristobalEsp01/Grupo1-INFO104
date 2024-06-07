// src/components/AttributeCard.js
import React from 'react';

const ElementoAtributos = ({valor, color }) => (
  <div className={`flex justify-center items-center ${color} text-white font-bold text-lg h-20 w-32 m-2 rounded-md text-center`}>
    {valor}
  </div>
);

export default ElementoAtributos;
