'use client'
import React, {useState} from 'react';
export default function Home() {
  const [showModal, setShowModal] = useState(true); 
  const handleCloseModal = () => {setShowModal(false)};
  const handleOpenModal = () => {setShowModal(true)};

  return(
    <>
      {showModal && ( 
      <div className="modal-overlay">
        <h1>¿Como jugar?</h1>
        <div className="modal-content">
          <h1>Instrucciones</h1>
          <button class="bg-pink-500
                         hover:bg-pink-600
                         text-gray-800 font-bold 
                           py-2 px-4 rounded-full 
                           next-button
                           "
                  onClick={handleCloseModal}>
                  Jugar
          </button>
        </div>  
      </div>
      )}
      {!showModal && (
        <div className="main-content">
          <center>
            <h1 className = "title">Infodle</h1>
          </center>
          <div className="absolute top-5 left-5 bg-pink-800 p-5 w-96 h-64 rounded-lg shadow-lg text-center border border-solid">
          <p className="mb-4 font-medium">Para volver a las instrucciones</p>
            <button class="bg-pink-500
                          hover:bg-pink-600
                          text-black font-bold 
                          py-2 px-4 rounded-full
                          next-button"
                      onClick={handleOpenModal}>
                      Atras
            </button>
          </div>
        </div> 
       )}
    </>
    );
}
