import { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import heroBanner from "../../../assets/1.jpg";
import heroBanner2 from "../../../assets/2.jpg";
import heroBanner3 from "../../../assets/3.jpeg";

const imagesData = [
  { src: heroBanner, alt: "Sonix Hero Banner 1" },
  { src: heroBanner2, alt: "Sonix Hero Banner 2" },
  { src: heroBanner3, alt: "Sonix Hero Banner 3" },
];

// Clone the first image at the end
const extendedImages = [...imagesData, imagesData[0]]; // [1, 2, 3, 1]

const HeaderDisplay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const transitionRef = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle infinite looping
  // useEffect(() => {
  //   if (currentIndex === extendedImages.length - 1) {
  //     setTimeout(() => {
  //       transitionRef.current = false; // Disable transition
  //       setCurrentIndex(0); // Instantly jump to first image
  //     }, 5000);
  //   } else {
  //     transitionRef.current = true;
  //   }
  // }, [currentIndex]);

  return (
    <Carousel className="mt-4 mx-auto w-[95vw] overflow-hidden">
      <CarouselContent
        // style={{
        //   transform: `translateX(-${currentIndex * 100}%)`,
        //   transition: transitionRef.current ? "transform 0.5s ease-in-out" : "none",
        // }}
      >
        {extendedImages.map((image, index) => (
          <CarouselItem key={index} className="w-full">
            <img
              src={image.src}
              loading="lazy"
              alt={image.alt}
              className="object-cover w-full h-[100vh] md:h-[70vh] sm:h-[60vh] max-sm:h-[30vw]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious onClick={() => setCurrentIndex((prevIndex) => prevIndex - 1)} />
      <CarouselNext onClick={() => setCurrentIndex((prevIndex) => prevIndex + 1)} />
    </Carousel>
  );
};

export default HeaderDisplay;
