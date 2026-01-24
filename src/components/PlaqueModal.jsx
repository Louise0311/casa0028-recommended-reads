import React from 'react';

function PlaqueModal(props) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">

        <button 
          onClick={props.onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">
          Modal Title
        </h2>

        <div className="mt-4">
          <p className="text-pretty text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod.
          </p>
        </div>
      </div>
    </div>
  );
}

// 别忘了这一行，否则 App.jsx 找不到它
export default PlaqueModal;