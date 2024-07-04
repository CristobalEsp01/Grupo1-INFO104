import React from "react";

const ElementoAtributos = ({
  valor,
  color,
  tamanoTexto = "text-lg",
  alto = "h-20",
}) => (
  <div
    className={`flex justify-center items-center ${color} text-white font-bold ${tamanoTexto} ${alto} w-32 m-2 rounded-md text-center`}
  >
    {valor}
  </div>
);

export default ElementoAtributos;