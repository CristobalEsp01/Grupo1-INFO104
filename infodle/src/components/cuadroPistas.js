import React, {useState} from 'react';

const CuadroPistas = () => {
    const[showPista, setShowPista] = useState(false);

    const openPista = () => setShowPista(true);
    const closePista = () => setShowPista(false);

    return (
    <div className = "w-full flex justify-end">
        <button onClick = {openPista} 
                className= "fixed bottom-5 right-5 bg-pink-700 hover:bg-pink-600 text-white  transition duration-300 font-bold py-2 px-4 rounded-full z-10"
                >
            <h1 className = "text-center">Pista</h1>
        </button>
        {showPista && (
                <div className="fixed inset-0 flex items-center justify-center  z-50">
                    <div className="bg-pink-700 rounded-lg shadow-lg p-8 w-64 max-w-md fixed bottom-5 right-5">
                        <h2 className="text-center text-2xl font-bold mb-4">Pistas</h2>
                        <div className = "text-center">Este profe roba</div>
                        <button
                            onClick={closePista}
                            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full"
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