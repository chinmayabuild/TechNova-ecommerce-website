import { Button } from "../ui/button";

const Category = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 w-[93vw]">

      {/* Small Cards */}
      <div className="md:col-span-1 flex flex-col md:flex-row gap-4">
        <div className="bg-black text-white p-6 rounded-2xl flex-1 relative">
          <img src="https://via.placeholder.com/150" alt="Earphone" className="absolute right-2 top-2 w-24 h-24 object-cover" />
          <p className="text-sm">Enjoy</p>
          <h2 className="text-xl font-bold">With Earphone</h2>
          <Button className="mt-4">Browse</Button>
        </div>
        <div className="bg-yellow-400 text-black p-6 rounded-2xl flex-1 relative">
          <img src="https://via.placeholder.com/150" alt="Gadget" className="absolute right-2 top-2 w-24 h-24 object-cover" />
          <p className="text-sm">New</p>
          <h2 className="text-xl font-bold">Wearable Gadget</h2>
          <Button className="mt-4">Browse</Button>
        </div>
      </div>

      {/* Large Card */}
      <div className="bg-[#D9190E] text-white p-6 rounded-2xl md:col-span-2 relative">
        <img src="https://via.placeholder.com/250" alt="Laptop" className="absolute right-2 top-2 w-40 h-40 object-cover" />
        <p className="text-sm">Trend</p>
        <h2 className="text-2xl font-bold">Devices & Laptop</h2>
        <Button className="mt-4">Browse</Button>
      </div>
    </div>
  );
};

export default Category;
