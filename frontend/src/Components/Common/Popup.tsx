import React, { useState } from "react";

interface LogoutModalProps {
  onClick: () => void;
  message: string;
  buttonText: string;
  closable: boolean;
}

const PopUp: React.FC<LogoutModalProps> = ({
  onClick,
  message,
  buttonText,
  closable = true,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleProceedToLogin = () => {
    onClick();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return isOpen ? (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-slate-200 p-12 rounded text-center">
        <p>{message}</p>
        <button
          onClick={handleProceedToLogin}
          className="mt-6 px-6 py-2 text-white rounded focus:outline-none focus:ring transition hover:bg-green-700 focus:border-green-700 bg-green-600"
        >
          {buttonText}
        </button>
        {closable && (
          <button
            onClick={handleClose}
            className=" ml-5 mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring focus:border-red-700 transition"
          >
            Close
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default PopUp;
