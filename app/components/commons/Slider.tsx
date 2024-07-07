/* eslint-disable @next/next/no-img-element */
// components/Slider.tsx
import React, { useState, useEffect } from "react";
import classNames from "classnames";

type SliderProps = {
  images: string[];
  showModal: boolean;
  closeModal: () => void;
};

const Slider: React.FC<SliderProps> = ({ images, showModal, closeModal }) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  const closeOverlay = () => {
    setCurrentIndex(null);
    closeModal();
  };

    useEffect(() => {
      if (showModal) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }

      // Clean up the effect when the component unmounts
      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    }, [showModal]);

    if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
    >
      <div className="absolute bg-white rounded-[4px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg w-[90%] lg:w-[500px] py-3">
      <p className="text-center text-[14px]">Click to view image</p>
        <button
          className="absolute z-40 top-0 right-0 mt-1 mr-2 text-[20px] text-gray-600"
          onClick={closeOverlay}
        >
          ×
        </button>
        <div className="slider-buttons">
          {images.map((image, index) => (
            <button key={index} onClick={() => handleClick(index)}>
              {`Image ${index + 1}`}
            </button>
          ))}
        </div>

        <div className="flex justify-center items-center w-full">
            {currentIndex !== null && (
              <>
                <div className=" flex justify-center items-center" onClick={closeOverlay}>
                  <div className="slider flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
                    <img
                      src={images[currentIndex]}
                      alt={`Slide ${currentIndex}`}
                      className="slider-image rounded-xl"
                    />
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Slider;
