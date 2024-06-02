import React, { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      console.log("closed");
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlayy"
      onClick={handleOverlayClick}
    >
      <div className="bg-white my-[150px] rounded-lg w-[40%] max-w-md mx-auto relative">
        <div className="p-4 absolute top-0 right-2 flex justify-center items-center">
          <button
            onClick={onClose}
            className=" text-gray-700 border-[#475156] text-center flex justify-center items-center rounded-full border-[2px] w-[20px] h-[20px]"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
