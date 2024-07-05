import React, {useState} from 'react';

const CuadroPistas = ({intentos, profesorDelDia}) => {
    const[showPista, setShowPista] = useState(false);

    const openPista = () => setShowPista(true);
    const closePista = () => setShowPista(false);

    return (
    <div className = "w-full flex justify-end">
        <button onClick={openPista} 
                className={`fixed bottom-5 right-5 text-black transition duration-300 font-bold py-2 px-4 rounded-full z-10 ${
                    intentos !== 0 ? 'bg-stone-100 ' : 'bg-stone-100 hover:bg-stone-600 hover:text-white'
                }`}
                disabled={intentos !== 0}
            >
            <h1 className = "text-center">Pista</h1>
            {intentos !== 0 && <h2 className="text-xs">Intentos {intentos}</h2>}
           
        </button>
        {showPista && (
                <div className="fixed inset-0 flex items-center justify-center  z-50">
                    <div className="bg-stone-500 rounded-lg shadow-lg p-8 w-64 max-w-md fixed bottom-5 right-5">
                        <h2 className="text-center text-2xl font-bold mb-4 text-white">Pista</h2>
                        <div className = "text-center">{profesorDelDia.pista}</div>
                        <button
                            onClick={closePista}
                            className="mt-4 text-black bg-stone-100 hover:bg-stone-600 hover:text-white font-bold justify-end py-2 px-4 rounded-full"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CuadroPistas;