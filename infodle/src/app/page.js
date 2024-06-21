"use client";
import React, { useEffect, useState } from "react";
import profesores from "/src/data/profesores.json";
import ModalInstrucciones from "/src/components/modalInstrucciones.js";
import BarraBusqueda from "/src/components/barraBusqueda.js";
import ProfesorGrid from "/src/components/profesorGrid.js";
import BotonVolver from "/src/components/botonVolver.js";
import TituloInfodle from "/src/components/tituloInfodle.js";
import CuadroPistas from "/src/components/cuadroPistas.js";

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [nombreIngresado, setNombreIngresado] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [adivinanzas, setAdivinanzas] = useState([]);
  const [profesorDelDia, setProfesorDelDia] = useState(null);
  const [intentos, setIntentos] = useState(3);

  useEffect(() => {
    setSugerencias(profesores.map(profesor => profesor.nombre));
    seleccionarProfesorDelDia();
  }, []);

  const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
  };

  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convierte a 32-bit int 
    }
    return hash;
  };

  const seleccionarProfesorDelDia = () => {
    const hoy = new Date().toISOString().split('T')[0];
    const profesorAlmacenado = JSON.parse(localStorage.getItem('profesorDelDia'));
    const historialProfesores = JSON.parse(localStorage.getItem('historialProfesores')) || [];

    if (profesorAlmacenado && profesorAlmacenado.fecha === hoy) {
      setProfesorDelDia(profesorAlmacenado.profesor);
    } else {
      let profesorAleatorio;
      const maxAttempts = 10;
      let attempts = 0;

      do {
        const hash = hashCode(hoy + attempts);
        const index = Math.abs(hash) % profesores.length;
        profesorAleatorio = profesores[index];
        attempts++;
      } while (historialProfesores.includes(profesorAleatorio.nombre) && attempts < maxAttempts);

      setProfesorDelDia(profesorAleatorio);

      const nuevoHistorial = [...historialProfesores, profesorAleatorio.nombre].slice(-5);
      localStorage.setItem('historialProfesores', JSON.stringify(nuevoHistorial));
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
    if(intentos > 0){
      setIntentos(intentos - 1);
    }
    setSugerencias([]);
    setAdivinanzas(prevAdivinanzas => [profesores.find(prof => prof.nombre === suggestion), ...prevAdivinanzas]);
    console.log("Profesor ingresado: ", suggestion);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  


  return (
    <>
      <div className={`fixed inset-0 ${showModal ? 'bg-gray-900 bg-opacity-10 backdrop-blur-sm' : ''} z-10`}>
        <ModalInstrucciones showModal={showModal} handleCloseModal={handleCloseModal} />
      </div>
      <div className={`p-6 ${showModal ? 'opacity-50' : ''}`}>
        <TituloInfodle/>
        <BarraBusqueda
          nombreIngresado={nombreIngresado}
          handleInputChange={handleInputChange}
          sugerencias={sugerencias}
          handleSuggestionClick={handleSuggestionClick}
        />
        <BotonVolver handleClick={handleOpenModal} text="Volver a Instrucciones" />
        <ProfesorGrid adivinanzas={adivinanzas} profesorDelDia={profesorDelDia} />
        <CuadroPistas intentos={intentos}/> 
      </div>
      
    </>
  );
}