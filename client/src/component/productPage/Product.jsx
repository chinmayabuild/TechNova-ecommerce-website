import React from "react";
import { starGenerator } from "../constants/Helper";
import { Circle, Minus, Plus, Pointer } from "lucide-react";
import { Colors } from "../constants/Color";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ReviewsComponent from "../reviewSection/ReviewsComponent";

const imagesArray = [
  {
    url: "https://images.pexels.com/photos/532173/pexels-photo-532173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    id: 1,
  },
  {
    url: "https://images.pexels.com/photos/532173/pexels-photo-532173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    id: 2,
  },
  {
    url: "https://images.pexels.com/photos/532173/pexels-photo-532173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    id: 3,
  },
  {
    url: "https://images.pexels.com/photos/532173/pexels-photo-532173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    id: 4,
  },
];

const productStock = 10;

const Product = () => {
  const [productQuantity, setProductquantity] = useState(productStock);
  const [pincode, setPincode] = useState(" ");
  const [availibilityMessage, setAvailibilityMessage] = useState(" ");
  const [purchaseProduct, setPurchaseProduct] = useState(false);
  const [address, setAddress] = useState("");
  return (
    <div className="">
      <main className="w-[93vw] lg:w-[70vw]  flex  flex-col sm:flex-row justify-start items-start gap-10 mx-auto  my-10">
        {/* Left side - Main Image */}
        <div className="grid sm:w-[50%] gap-3">
          <img
            src={imagesArray[0].url}
            className="w-full lg:h-[30rem] rounded-xl border  object-center object-cover dark:border-none"
            alt="Product Main"
          />

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-3">
            {imagesArray.map(({ url, id }) => (
              <img
                src={url}
                key={id}
                className="rounded-xl filter hover:brightness-50 cursor-pointer transition-all ease-in-out duration-300 border dark:border-none"
                alt={`Thumbnail ${id}`}
              />
            ))}
          </div>
        </div>

        {/* Right-side-div */}
        <div className="sm:w-[50%] lg:w-[30%]">
          <div className="pb-5">
            <h2 className="font-extrabold text-2xl">Zebronics Keybord</h2>
            <p className=" text-sm" my-3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              tenetur libero consectetur quidem? Natus, accusamus.
            </p>
          </div>

          <div className="flex items-center ">
            {starGenerator(4.5, "0", 15)}
            <span className="text-md ml-1">(2)</span>
          </div>

          <div className="py-5 border-t border-b">
            <h3 className="font-bold text-xl">Rs.560 or rs.34/month</h3>
            <p className="text-md ml-1">Suggested payments with 6 months</p>
          </div>

          <div className="my-5 border-b">
            <h3 className="font-bold text-lg"> Choose Color</h3>
            <div className="flex items-center">
              <Circle
                fill={Colors.customIsabelline}
                strokeOpacity={0.3}
                strokeWidth={0.2}
              />
              <Circle
                fill={Colors.customYello}
                strokeOpacity={0.3}
                strokeWidth={0.2}
              />
              <Circle
                fill={Colors.customGray}
                strokeOpacity={0.3}
                strokeWidth={0.2}
              />
            </div>
          </div>

          <div className="py-5 ">
            <div className="flex gap-3 items-center">
              <div className="flex gap-5 items-center  bg-[#3C3C3C] rounded-full  p-2 w-fit">
                <Minus
                  cursor={"pointer"}
                  stroke={Colors.customGray}
                  onClick={() =>
                    setProductquantity((quantity) =>
                      quantity > 1 ? quantity - 1 : 1
                    )
                  }
                />

                <span className="text-slate-200">{productQuantity}</span>

                <Plus
                  cursor={"pointer"}
                  stroke={Colors.customGray}
                  onClick={() =>
                    setProductquantity((quantity) =>
                      quantity < productStock ? quantity + 1 : quantity
                    )
                  }
                />
              </div>

              {productStock - productQuantity > 0 && (
                <div className="grid text-sm font-semibold text-gray-400">
                  <span>
                    Only{" "}
                    <span className="text-customYello">
                      {" "}
                      {productStock - productQuantity} items{" "}
                    </span>
                    Left!
                  </span>

                  <span>Don't miss it </span>
                </div>
              )}
            </div>

            <div className="grid gap-3 my-5">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter your pincose here"
                  onChange={(e) => setPincode(e.target.value)}
                />
                <Button>Check Availability </Button>
              </div>
              <p className=" text-sm px-2 ">{availibilityMessage}</p>
            </div>
            <div className="flex gap-3 w-fit">
              <Button onClick={() => setPurchaseProduct(true)}>Buy Now</Button>
              <Button> Add to Cart </Button>
            </div>
            {purchaseProduct && (
              <div className="my-2 space-2 ">
                <Input
                  placeholder="Enter Your Address Here.."
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Button>Confirm Order</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Review Section */}
      <hr className="my-2" />
      <ReviewsComponent />
    </div>
  );
};

export default Product;
