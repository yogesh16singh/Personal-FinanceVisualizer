"use client";
import { FaTimes } from "react-icons/fa";

const CustomDialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-[11] inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-[400px] w-[90%] relative">
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        {children}
      </div>
    </div>
  );
};

export default CustomDialog;
