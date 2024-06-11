import React from 'react';

const ElementoAtributos = ({valor, color }) => (
  <div className={`flex justify-center items-center ${color} text-white font-bold text-lg h-20 w-32 m-2 rounded-md text-center border-solid border-2 border-slate-950`}>
    {valor}
  </div>
);

export default ElementoAtributos;
