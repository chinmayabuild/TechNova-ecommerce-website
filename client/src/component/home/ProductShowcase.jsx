import { Button } from "../ui/button";
import { Headphones, Mouse, Keyboard } from "lucide-react";

const ServiceCards = () => {
  return (
    <div className="py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 max-w-7xl mx-auto">
      {/* Headphone Card */}
      <div className="bg-[#1E1E1E] text-white p-4 sm:p-6 rounded-lg w-full max-w-[320px] min-h-[280px] sm:h-[300px] flex flex-col justify-between items-center relative">
        <Headphones className="w-10 h-10 sm:w-12 sm:h-12 text-[#D9190E] mb-3 sm:mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold">Headphones</h3>
        <p className="text-center text-xs sm:text-sm text-gray-300 px-2">
          Lorem ipsum is simply text of the printing type.
        </p>
        <Button className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#D9190E] bg-transparent border border-[#D9190E] hover:bg-[#D9190E] hover:text-white transition-colors px-3 sm:px-4 py-1 sm:py-2">
          KNOW MORE →
        </Button>
      </div>

      {/* Mouse Card */}
      <div className="bg-[#D9190E] text-white p-4 sm:p-6 rounded-lg w-full max-w-[320px] min-h-[280px] sm:h-[300px] flex flex-col justify-between items-center relative">
        <Mouse className="w-10 h-10 sm:w-12 sm:h-12 text-white mb-3 sm:mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold">Mouse</h3>
        <p className="text-center text-xs sm:text-sm text-gray-300 px-2">
          Lorem ipsum is simply text of the printing type.
        </p>
        <Button className="mt-3 sm:mt-4 text-xs sm:text-sm text-white bg-transparent border border-white hover:bg-white hover:text-[#D9190E] transition-colors px-3 sm:px-4 py-1 sm:py-2">
          KNOW MORE →
        </Button>
      </div>

      {/* Keyboard Card */}
      <div className="bg-[#1E1E1E] text-white p-4 sm:p-6 rounded-lg w-full max-w-[320px] min-h-[280px] sm:h-[300px] flex flex-col justify-between items-center relative">
        <Keyboard className="w-10 h-10 sm:w-12 sm:h-12 text-[#D9190E] mb-3 sm:mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold">Keyboard</h3>
        <p className="text-center text-xs sm:text-sm text-gray-300 px-2">
          Lorem ipsum is simply text of the printing type.
        </p>
        <Button className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#D9190E] bg-transparent border border-[#D9190E] hover:bg-[#D9190E] hover:text-white transition-colors px-3 sm:px-4 py-1 sm:py-2">
          KNOW MORE →
        </Button>
      </div>
    </div>
  );
};

export default ServiceCards;