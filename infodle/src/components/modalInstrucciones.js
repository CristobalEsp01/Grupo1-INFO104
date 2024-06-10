import React from 'react';

const ModalInstrucciones = ({ showModal, handleCloseModal }) => (
  showModal ? (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-25 backdrop-blur-sm">
      <div className="bg-pink-700 p-10 rounded-lg max-w-auto mx-auto text-center shadow-lg">
        <h1 className="text-2xl font-bold mb-4">¿Cómo jugar?</h1>
        <h2 className="text-l mb-6">Instrucciones</h2>
        <h3 className="text-xl mb-4">Adivina el profesor misterioso del día de hoy</h3>
        <div className="flex flex-col items-center mb-6 text-sm">
          <ul>
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-green-500 mr-2 border-2 border-slate-600 border-solid"></div>
              Significa que el profesor misterioso comparte esta casilla con el profesor que seleccionaste, ¡sigue así!
            </div>
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-orange-500 mr-2 border-2 border-slate-600 border-solid"></div>
              El profesor misterioso comparte alguna de las opciones que están aquí dentro
            </div>
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-red-500 mr-2 border-2 border-slate-600 border-solid"></div>
              El profesor misterioso NO comparte esta casilla con el profesor que seleccionaste, probemos con otro
            </div>
          </ul>
        </div>
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          onClick={handleCloseModal}
        >
          Jugar
        </button>
      </div>
    </div>
  ) : null
);

export default ModalInstrucciones;
