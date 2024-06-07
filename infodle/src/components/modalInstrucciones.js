import React from 'react';

const ModalInstrucciones = ({ showModal, handleCloseModal }) => (
  showModal ? (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Instrucciones</h2>
        <p>chago las instrucciones van aca uwu</p>
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mt-4"
          onClick={handleCloseModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  ) : null
);

export default ModalInstrucciones;
