"use client"
import React, { useState, useEffect } from 'react';
import TituloInfodle from '../components/tituloInfodle';
import BarraBusqueda from '../components/barraBusqueda';
import BotonVolver from '../components/botonVolver';
import ProfesorGrid from '../components/profesorGrid';
import CuadroPistas from '../components/cuadroPistas';
import ModalInstrucciones from '../components/modalInstrucciones';
import DetalleProfesor from '../components/detallesProfesor';
import profesores from '../data/profesores.json';

const Page = () => {
  const [profesorDelDia, setProfesorDelDia] = useState(null);
  const [nombreIngresado, setNombreIngresado] = useState('');
  const [sugerencias, setSugerencias] = useState([]);
  const [intentos, setIntentos] = useState(5);
  const [adivinanzas, setAdivinanzas] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [showDetalle, setShowDetalle] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  useEffect(() => {
    seleccionarProfesorDelDia();
    setShowModal(true);

    // Exponer la función a la consola
    window.sortearNuevoProfesor = sortearNuevoProfesor;
  }, []);

  const seleccionarProfesorDelDia = () => {
    const hoy = new Date().toLocaleDateString();
    const profesorGuardado = localStorage.getItem('profesorDelDia');

    if (profesorGuardado) {
      const { profesor, fecha } = JSON.parse(profesorGuardado);
      if (fecha === hoy) {
        setProfesorDelDia(profesor);
      } else {
        const profesorAleatorio = profesores[Math.floor(Math.random() * profesores.length)];
        setProfesorDelDia(profesorAleatorio);
        localStorage.setItem('profesorDelDia', JSON.stringify({ profesor: profesorAleatorio, fecha: hoy }));
      }
    } else {
      const profesorAleatorio = profesores[Math.floor(Math.random() * profesores.length)];
      setProfesorDelDia(profesorAleatorio);
      localStorage.setItem('profesorDelDia', JSON.stringify({ profesor: profesorAleatorio, fecha: hoy }));
    }
  };

  const sortearNuevoProfesor = () => {
    const profesorAleatorio = profesores[Math.floor(Math.random() * profesores.length)];
    setProfesorDelDia(profesorAleatorio);
    console.log('Nuevo profesor sorteado:', profesorAleatorio);
  };

  useEffect(() => {
    console.log('Profesor del día:', profesorDelDia); // Verificar que el profesor del día se selecciona correctamente
  }, [profesorDelDia]);

  const handleInputChange = (e) => {
    if (showDetalle) return;
    const value = e.target.value;
    setNombreIngresado(value);
    setSelectedSuggestionIndex(-1);
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (selectedSuggestionIndex >= 0) {
        const suggestion = sugerencias[selectedSuggestionIndex];
        if (suggestion) {
          handleSuggestionClick(suggestion);
        }
      } else {
        const suggestion = sugerencias[0];
        if (suggestion) {
          handleSuggestionClick(suggestion);
        }
      }
    } else if (e.key === 'ArrowDown') {
      setSelectedSuggestionIndex((prevIndex) => Math.min(prevIndex + 1, sugerencias.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (showDetalle) return;
    setNombreIngresado(suggestion);
    if (intentos > 0) {
      setIntentos(intentos - 1);
    }
    setSugerencias([]);
    const adivinadoProfesor = profesores.find(prof => prof.nombre === suggestion);
    console.log('Adivinado profesor:', adivinadoProfesor); // Verificar que el profesor adivinado contiene bio
    setAdivinanzas(prevAdivinanzas => [adivinadoProfesor, ...prevAdivinanzas]);
    if (adivinadoProfesor.nombre === profesorDelDia.nombre) {
      setShowDetalle(true);
      setProfesorDelDia(adivinadoProfesor); // Asegurarse de que el profesor del día tenga toda la información
    }
  };

  const handleOpenModal = () => {
    if (!showDetalle) setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseDetalle = () => setShowDetalle(false);

  return (
    <>
      <div className={`fixed inset-0 ${showModal ? 'bg-gray-900 bg-opacity-10 backdrop-blur-sm' : ''} z-10`}>
        <ModalInstrucciones showModal={showModal} handleCloseModal={handleCloseModal} />
      </div>
      <div className={`p-6 ${showModal ? 'opacity-50' : ''}`}>
        <TituloInfodle />
        <BarraBusqueda
          nombreIngresado={nombreIngresado}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          sugerencias={sugerencias}
          selectedSuggestionIndex={selectedSuggestionIndex}
          handleSuggestionClick={handleSuggestionClick}
          disabled={showDetalle}
        />
        {!showDetalle && <BotonVolver handleClick={handleOpenModal} text="Volver a Instrucciones" />}
        {!showDetalle && <CuadroPistas intentos={intentos} profesorDelDia={profesorDelDia}/>}
        <ProfesorGrid adivinanzas={adivinanzas} profesorDelDia={profesorDelDia} />
      </div>
      {showDetalle && profesorDelDia && <DetalleProfesor profesor={profesorDelDia} onClose={handleCloseDetalle} />}
    </>
  );
};

const normalizeString = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export default Page;