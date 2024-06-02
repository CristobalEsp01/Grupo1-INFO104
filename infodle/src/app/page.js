"use client";
import React, { useEffect, useState } from "react";
import profesores from "/src/data/profesores.json"; // Asegúrate de que la ruta sea correcta
import ProfesorCard from "/src/components/profesorCard.js"; // Asegúrate de que la ruta sea correcta

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [nombreIngresado, setNombreIngresado] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [adivinanzas, setAdivinanzas] = useState([]);
  const [profesorDelDia, setProfesorDelDia] = useState(null);

  useEffect(() => {
    setSugerencias(profesores.map(profesor => profesor.nombre));
    seleccionarProfesorDelDia();
  }, []);

  const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const seleccionarProfesorDelDia = () => {
    const hoy = new Date().toISOString().split('T')[0];
    const profesorAlmacenado = JSON.parse(localStorage.getItem('profesorDelDia'));

    if (profesorAlmacenado && profesorAlmacenado.fecha === hoy) {
      setProfesorDelDia(profesorAlmacenado.profesor);
    } else {
      const profesorAleatorio = profesores[Math.floor(Math.random() * profesores.length)];
      setProfesorDelDia(profesorAleatorio);
      localStorage.setItem('profesorDelDia', JSON.stringify({ profesor: profesorAleatorio, fecha: hoy }));
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNombreIngresado(value);
    if (value.length > 0) {
      const normalizedValue = normalizeString(value.toLowerCase());
      const filteredSugerencias = profesores
        .map(profesor => profesor.nombre)
        .filter(nombre =>
          normalizeString(nombre.toLowerCase()).includes(normalizedValue)
        );
      setSugerencias(filteredSugerencias);
    } else {
      setSugerencias([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setNombreIngresado(suggestion);
    setSugerencias([]);
    const profesor = profesores.find(profesor => profesor.nombre === suggestion);
    setAdivinanzas([profesor, ...adivinanzas]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 text-white">
          <div className="bg-pink-700 p-10 rounded-lg max-w-md mx-auto text-center shadow-lg">
            <h1 className="text-2xl font-bold mb-4">¿Cómo jugar?</h1>
            <div className="text-lg mb-6">Instrucciones</div>
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              onClick={handleCloseModal}
            >
              Jugar
            </button>
          </div>
        </div>
      )}
      {!showModal && (
        <div className="main-content min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <h1 className="bg-red-400 text-white w-96 h-12 rounded-lg flex items-center justify-center text-2xl mb-10 shadow-lg">Infodle</h1>
          <div className="w-full max-w-md mx-auto relative">
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 shadow-sm"
              placeholder="Ingrese un Nombre"
              value={nombreIngresado}
              onChange={handleInputChange}
            />
            {nombreIngresado.length > 0 && sugerencias.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 rounded-lg mt-2 w-full max-h-40 overflow-y-auto shadow-lg z-10">
                {sugerencias.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-100 transition duration-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className="fixed bottom-5 left-5 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-lg"
            onClick={handleOpenModal}
          >
            Volver a Instrucciones
          </button>
          <div className="mt-10 text-center">
            <h2 className="text-xl font-bold mb-4">Adivinanzas</h2>
            <div className="flex justify-center space-x-4 mb-4">
              <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center">Género</div>
              <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center">Grado Académico</div>
              <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center">Carrera</div>
              <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center">Universidad</div>
              <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center">Egreso</div>
              <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center">Asignaturas</div>
            </div>
            {adivinanzas.map((profesor, index) => (
              <ProfesorCard key={index} profesor={profesor} profesorDelDia={profesorDelDia} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}