import { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

import heroBanner from "../../../assets/1.jpg";
import heroBanner2 from "../../../assets/2.jpg";
import { Button } from "../ui/button";

const imagesData = [
  { src: heroBanner, alt: "Sonix Hero Banner 1" },
  { src: heroBanner2, alt: "Sonix Hero Banner 2" },
];

// Clone the first image at the end for infinite loop
const extendedImages = [...imagesData, imagesData[0]];

const HeaderDisplay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const transitionRef = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Reset to 0 if reaching the cloned image (for infinite loop)
        if (prevIndex === extendedImages.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle dot click to navigate to specific slide
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative mx-auto w-[95vw] overflow-hidden rounded-b-xl">
      <Carousel className="w-full">
        <CarouselContent
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: currentIndex === 0 && transitionRef.current ? "none" : "transform 0.5s ease-in-out",
          }}
        >
          {extendedImages.map((image, index) => (
            <CarouselItem key={index} className="w-full">
              <img
                src={image.src}
                loading="lazy"
                alt={image.alt}
                className="object-cover w-full h-[100vh] sm:h-[20vh] md:h-[30vh] lg:h-[85vh] max-sm:h-[50vh]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious onClick={() => setCurrentIndex((prevIndex) => (prevIndex === 0 ? imagesData.length - 1 : prevIndex - 1))} />
        <CarouselNext onClick={() => setCurrentIndex((prevIndex) => (prevIndex === imagesData.length - 1 ? 0 : prevIndex + 1))} />
      </Carousel>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {imagesData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* View Product Button */}
      {/* <Link to="/product/page">
        <Button className="bg-black text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors duration-300 font-semibold">
          View Product
        </Button>
      </Link> */}
    </div>
  );
};

export default HeaderDisplay;