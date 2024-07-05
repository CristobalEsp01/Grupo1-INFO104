import React from 'react';

const ModalInstrucciones = ({ showModal, handleCloseModal }) => (
  showModal ? (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-25 backdrop-blur-sm">
      <div className="bg-stone-400 p-10 rounded-lg max-w-auto mx-auto text-center shadow-lg">
        <h1 className="text-3xl font-bold  mb-4">¿Cómo jugar?</h1>
        <h2 className="text-l mb-6">Adivina el profesor misterioso del día de hoy</h2>
        <h3 className="text-xl mb-4">Instrucciones</h3>
        <div className="flex flex-col items-center mb-6 text-sm">
          <ul>
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-green-600 mr-2 border-2 border-slate-800 border-solid"></div>
              Significa que el profesor misterioso comparte esta casilla con el profesor que seleccionaste, ¡sigue así!!
            </div>
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-orange-600 mr-2 border-2 border-slate-800 border-solid"></div>
              El profesor misterioso comparte alguna de las opciones que están aquí dentro
            </div>
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-red-600 mr-2 border-2 border-slate-800 border-solid"></div>
              El profesor misterioso NO comparte esta casilla con el profesor que seleccionaste, probemos con otro
            </div>
          </ul>
          <div className="flex items-center mt-5 mb-2 text-center text-lg">
            Tendrás 5 intentos para poder activar el botón que te dará una pista sobre el profesor misterioso.
          </div>
        </div>
        <button
          className=" bg-stone-100 hover:bg-stone-600 hover:text-white text-black font-bold py-2 px-4 rounded-full transition duration-300"
          onClick={handleCloseModal}
        >
          Jugar
        </button>
      </div>
    </div>
  ) : null
);

export default ModalInstrucciones;
