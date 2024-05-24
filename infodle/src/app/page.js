"use client";
import React, { useState } from "react";
export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const [nombreIngresado, setNombreIngresado] = useState("");

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <h1>¿Como jugar?</h1>
          <div className="modal-content">
            <h1>Instrucciones</h1>
            <button
              class="bg-pink-500
                         hover:bg-pink-600
                         text-gray-800 font-bold 
                           py-2 px-4 rounded-full 
                           next-button
                           "
              onClick={handleCloseModal}
            >
              Jugar
            </button>
          </div>
        </div>
      )}
      {!showModal && (
        <div className="main-content">
          <center>
            <h1 className="title">Infodle</h1>
            <div className="w-full max-w-md mx-auto mt-10">
              <input
                type="text"
                className="w-full p-2 border border-solid rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                placeholder="Ingrese un Nombre"
                value={nombreIngresado}
                onChange={(e) => setNombreIngresado(e.target.value)}
              />
            </div>
          </center>
          <div className="absolute top-5 left-5 bg-pink-800 p-5 w-96 h-64 rounded-lg shadow-lg text-center border border-solid">
            <p className="mb-4 font-medium">Para volver a las instrucciones</p>
            <button
              class="bg-pink-500
                          hover:bg-pink-600
                          text-black font-bold 
                          py-2 px-4 rounded-full
                          next-button"
              onClick={handleOpenModal}
            >
              Atras
            </button>
          </div>
        </div>
      )}
    </>
  );
}
