"use client";
import React, { useEffect, useState } from "react";
import profesores from "/src/data/profesores.json";
import ModalInstrucciones from "/src/components/modalInstrucciones.js";
import BarraBusqueda from "/src/components/barraBusqueda.js";
import ProfesorGrid from "/src/components/profesorGrid.js";
import BotonVolver from "/src/components/botonVolver.js";

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
    setAdivinanzas(prevAdivinanzas => [profesores.find(prof => prof.nombre === suggestion), ...prevAdivinanzas]);
    console.log("Profesor ingresado: ", suggestion);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <ModalInstrucciones showModal={showModal} handleCloseModal={handleCloseModal} />
      {!showModal && (
        <div className="p-6">
          <BarraBusqueda
            nombreIngresado={nombreIngresado}
            handleInputChange={handleInputChange}
            sugerencias={sugerencias}
            handleSuggestionClick={handleSuggestionClick}
          />
          <BotonVolver handleClick={handleOpenModal} text="Volver a Instrucciones" />
          <ProfesorGrid adivinanzas={adivinanzas} profesorDelDia={profesorDelDia} />
        </div>
      )}
    </>
  );
}
