import React, { useState } from "react";
import { Button } from "../ui/button";
import heroBanner from "../../../assets/p1.png";
import heroBanner2 from "../../../assets/p2.png";
import heroBanner3 from "../../../assets/p3.png";
import "../style/slider.css";

const products = [
  { id: 1, image: heroBanner, model: "Model No - Sonix Blue 242", price: 3499 },
  {
    id: 2,
    image: heroBanner2,
    model: "Model No - Sonix Black 243",
    price: 5499,
  },
  {
    id: 3,
    image: heroBanner3,
    model: "Model No - Sonix Rose 244",
    price: 2345,
  },
];

const SlidingProduct = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  return (
    <div className="relative flex flex-col items-center mt-10 lg:h-[85vh] sm:h-[38vh] mt- overflow-hidden dark:bg-[#1D1D1D] mx-auto w-[95vw] justify-center rounded-xl">
      {/* Header */}
      <div className="text-center  sm:mb-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D9190E] font-[Acumin-Pro] ">
          BEATS OTHER MODELS
        </h1>
        <p className="typewriter-animation text-sm sm:text-xs md:text-lg text-gray-400 relative mx-auto text-center px-4 font-[Acumin-Pro]">
          Sonix Beats is one of the most popular headphone makers in the world.
        </p>
      </div>
      <h2 className="text-base sm:text-lg md:text-xl mb-4 font-semibold text-white">
        {products[currentIndex].model}
      </h2>

      {/* Carousel */}
      <div className="relative flex justify-center items-center w-full h-64 sm:h-72 md:h-80">
        {products.map((headphone, index) => {
          const isActive = index === currentIndex;
          const isNext = index === (currentIndex + 1) % products.length;
          const isPrevious =
            index === (currentIndex - 1 + products.length) % products.length;

          return (
            <div
              key={headphone.id}
              className={`absolute transition-all duration-500 ease-in-out ${
                isActive
                  ? "scale-150 sm:scale-[300] z-10 opacity-100"
                  : "scale-50 z-0 opacity-60 sm:opacity-35"
              }`}
              style={{
                left: isActive ? "50%" : isNext ? "75%" : "25%",
                transform: "translateX(-50%)",
                transition: "all 0.5s ease-in-out",
              }}
            >
              <img
                src={headphone.image}
                alt={headphone.model}
                className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 rounded-lg object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Model & Price */}
      <div className="text-center mt-2 text-white sm:mt-2">
        <p className="text-sm sm:text-lg">
          Price - ₹{products[currentIndex].price}
        </p>
      </div>

      {/* Navigation Buttons */}
      <button
        id="prev"
        onClick={goToPrevious}
        className="  absolute left-2 sm:left-4 md:left-10 lg:left-20 top-1/2 transform -translate-y-1/2 text-xl sm:text-2xl md:text-3xl lg:text-5xl rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white z-20"
      >
        &lt;
      </button>
      <button
        id="next"
        onClick={goToNext}
        className="absolute right-2 sm:right-4 md:right-10 lg:right-20 top-1/2 transform -translate-y-1/2 text-xl sm:text-2xl md:text-3xl lg:text-5xl rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white  hover:translate-x-1 z-20"
      >
        &gt;
      </button>

      {/* View Product Button */}
      <Button className="mt-2 sm:mt-4 rounded px-3 py-1 sm:px-6 sm:py-2 bg-[#D9190E] hover:bg-white hover:text-black text-white text-xs sm:text-base ">
        View Product
      </Button>
    </div>
  );
};

export default SlidingProduct;
