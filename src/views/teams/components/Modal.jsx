import React from "react";

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 z-50">
      <div className="bg-white text-green-600 p-6 rounded-lg shadow-lg w-[90%] md:w-[50%]">
        <button className="text-red-500 float-right" onClick={onClose}>
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
