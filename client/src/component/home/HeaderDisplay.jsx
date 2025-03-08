import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import heroBanner from "../../../assets/1.jpg";
import heroBanner2 from "../../../assets/2.jpg";


const HeaderDisplay = () => {
  const imagesData = [
    { src: heroBanner, alt: "Sonix Hero Banner" }, // Add alt text for accessibility
    {
      src: heroBanner2,
      alt: "Sonix Hero Banner",
    },
  ];

  return (
    <Carousel className="mt-4  mb- mx-auto w-[95vw] overflow-x-clip">
      <CarouselContent>
        {imagesData.map((image, index) => (
          <CarouselItem key={index}>
            <img
              src={image.src} // Corrected to use image.src
              loading="lazy"
              alt={image.alt} // Corrected to use image.alt
              className="object-cover w-full h-[80vh] md:h-[70vh] sm:h-[60vh] max-sm:h-[30vw]"
              />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HeaderDisplay;