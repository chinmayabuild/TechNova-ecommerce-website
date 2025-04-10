import { Button } from "../ui/button";
import { Headphones, Mouse, Keyboard } from "lucide-react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
  }),
};

const ServiceCards = () => {
  const services = [
    { Icon: Headphones, title: "Headphones" },
    { Icon: Mouse, title: "Mouse" },
    { Icon: Keyboard, title: "Keyboard" },
  ];

  return (
    <div className="py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 max-w-7xl mx-auto">
      {services.map(({ Icon, title }, index) => (
        <motion.div
          key={index}
          className="group bg-[#1E1E1E] hover:bg-[#D9190E] text-white p-4 sm:p-6 rounded-lg w-full max-w-[400px] min-h-[280px] sm:h-[300px] flex flex-col justify-between items-center relative transition-all duration-300 ease-in-out hover:scale-[1.03]"
          initial="hidden"
          animate="visible"
          custom={index}
          variants={cardVariants}
          whileHover={{ scale: 1.05 }}
        >
          <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#D9190E] group-hover:text-white mb-3 sm:mb-4 transition-colors duration-300" />
          <h3 className="text-lg sm:text-xl font-semibold group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
          <p className="text-center text-xs sm:text-sm text-gray-300 px-2">
            Lorem ipsum is simply text of the printing type.
          </p>
          <Button className="mt-3 sm:mt-4 text-xs sm:text-sm bg-transparent text-[#D9190E] border border-[#D9190E] group-hover:bg-white group-hover:text-black transition-colors px-3 sm:px-4 py-1 sm:py-2">
            KNOW MORE →
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceCards;
