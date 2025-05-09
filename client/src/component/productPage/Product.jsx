import React, { useEffect } from "react";
import axios from "axios";
import { starGenerator } from "../constants/Helper";
import { Circle, Minus, Plus } from "lucide-react";
import { Colors } from "../constants/Color";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ReviewsComponent from "../reviewSection/ReviewsComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "sonner";

// Shimmer Component with Theme Support
const Shimmer = () => {
  return (
    <div className="w-[90vw] lg:w-[70vw] flex flex-col sm:flex-row justify-start items-start gap-10 mx-auto my-10">
      {/* Left Side Shimmer - Image */}
      <div className="grid sm:w-[50%] gap-3">
        <div className="w-full lg:h-[30rem] bg-[#E2E2E2] dark:bg-[#1D1E20] animate-pulse rounded-xl"></div>
        <div className="grid grid-cols-4 gap-3">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="h-20 w-20 sm:h-28 sm:w-28 lg:h-28 lg:w-32 bg-[#E2E2E2] dark:bg-[#1D1E20] animate-pulse rounded-xl"
              ></div>
            ))}
        </div>
      </div>

      {/* Right Side Shimmer - Product Details */}
      <div className="sm:w-[50%] lg:w-[30%]">
        <div className="pb-5">
          <div className="h-8 w-3/4 bg-[#E2E2E2] dark:bg-[#1D1E20] animate-pulse rounded"></div>
          <div className="h-4 w-full bg-[#E2E2E2] dark:bg-[#1D1E20] animate-pulse rounded mt-3"></div>
          <div className="h-4 w-2/3 bg-[#E2E2E2] dark:bg-[#1D1E20] animate-pulse rounded mt-2"></div>
        </div>
        <div className="h-6 w-1/2 bg-[#E2E2E2] dark:bg-[#1D1E20] animate-pulse rounded"></div>
        <div className="py-5 border-t border-b">
          <div className="h-6 w-1/3 bg-[#E2E2E2] dark:bg-[#1D1E20] animate-pulse rounded"></div>
          <div className="h-4 w-2/3 bg-[#E2E2E2] dark:bg-[#1D1E20] animate-pulse rounded mt-2"></div>
        </div>
        <div className="my-5 border-b">
          <div className="h-6 w-1/4 bg-[#E2E2E2] dark:bg-[#1D1E20] animate-pulse rounded"></div>
          <div className="flex gap-2 mt-2">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-6 w-6 bg-[#E2E2E2] dark:bg-[#1D1E20] animate-pulse rounded-full"
                ></div>
              ))}
          </div>
        </div>
        <div className="py-5">
          <div className="h-10 w-1/2 bg-[#E2E2E2] dark:bg-[#1D1E20] animate-pulse rounded-full"></div>
          <div className="h-10 w-full bg-[#E2E2E2] dark:bg-[#1D1E20] animate-pulse rounded mt-5"></div>
        </div>
      </div>
    </div>
  );
};

const Product = () => {
  const { productName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [productQuantity, setProductQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [purchaseProduct, setPurchaseProduct] = useState(false);
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const checkAvailability = async () => {
    if (pincode.trim() === "") {
      setAvailabilityMessage("Please enter a valid pincode");
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-pincode/${pincode}`
      );
      const data = res.data;
      setAvailabilityMessage(data.message);
    } catch (error) {
      console.error("Error fetching pincode data:", error);
      setAvailabilityMessage("Product can't be delivered here.");
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (productQuantity <= 0) {
      toast("⚠️ Please select a valid quantity!");
      return;
    }
    const cartPayload = {
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: productQuantity,
      image: product.images?.[0]?.url,
      stock: product.stock,
    };
    dispatch(addToCart(cartPayload));
    setProductQuantity(1);
    toast("✅ Product added to cart");
  };

  useEffect(() => {
    const fetchProductByName = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-product-by-name/${productName
            ?.split("-")
            .join(" ")}`
        );
        setProduct(res.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    if (productName) {
      fetchProductByName();
    }
    window.scrollTo(0, 0);
  }, [productName]);

  const fallbackImages = [
    {
      url: "https://images.pexels.com/photos/532173/pexels-photo-532173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      id: 1,
    },
  ];

  const imagesToShow = product?.images || fallbackImages;
  const productStock = product?.stock || 10;

  // Render shimmer if product is not yet loaded
  if (!product) {
    return <Shimmer />;
  }

  return (
    <div className="">
      <main className="w-[90vw] lg:w-[70vw] flex flex-col sm:flex-row justify-start items-start gap-10 mx-auto my-10 pb-3 pl-2 dark:bg-black bg-[#F8F7F2]">
        {/* Left side - Main Image */}
        <div className="grid sm:w-[50%] gap-3 mt-5">
          <img
            src={imagesToShow[selectedImage]?.url}
            className="w-full lg:h-[30rem] rounded-xl border object-center object-cover dark:border-none"
            alt="Product Main"
          />
          <div className="grid grid-cols-4 gap-3">
            {imagesToShow.map(({ url, id }, index) => (
              <img
                src={url}
                key={id}
                className="rounded-xl filter hover:brightness-50 cursor-pointer transition-all ease-in-out duration-300 border dark:border-none h-15 w-15 sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-28 lg:w-32 object-cover"
                alt={`Thumbnail ${id}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Right-side-div */}
        <div className="sm:w-[50%] lg:w-[30%]">
          <div className="pb-5">
            <h2 className="font-extrabold text-2xl mt-5">{product?.name}</h2>
            <p className="text-sm my-3">
              {product?.description ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda tenetur libero consectetur quidem? Natus, accusamus."}
            </p>
          </div>

          <div className="flex items-center">
            {starGenerator(product?.rating || 4.5, "0", 15)}
            <span className="text-md ml-1">{product?.reviews?.length || 0}</span>
          </div>

          <div className="py-5 border-t border-b">
            <h3 className="font-bold text-xl">
              Rs.{product?.price || 560}{" "}
              <span className="text-sm font-medium text-gray-300">
                ₹{Math.round((product?.price || 560) / 6)}/month
              </span>
            </h3>
            <p className="text-md ml-1">Suggested payments with 6 months</p>
          </div>

          <div className="my-5 border-b">
            <h3 className="font-bold text-lg">Choose Color</h3>
            <div className="flex items-center">
              <Circle fill={Colors.customIsabelline} strokeOpacity={0.3} strokeWidth={0.2} />
              <Circle fill={Colors.customYello} strokeOpacity={0.3} strokeWidth={0.2} />
              <Circle fill={Colors.customGray} strokeOpacity={0.3} strokeWidth={0.2} />
            </div>
          </div>

          <div className="py-5">
            <div className="flex gap-3 items-center">
              <div className="flex gap-5 items-center bg-[#3C3C3C] rounded-full p-2 w-fit">
                <Minus
                  cursor="pointer"
                  stroke={Colors.customGray}
                  onClick={() =>
                    setProductQuantity((quantity) => (quantity > 1 ? quantity - 1 : 1))
                  }
                />
                <span className="text-slate-200">{productQuantity}</span>
                <Plus
                  cursor="pointer"
                  stroke={Colors.customGray}
                  onClick={() =>
                    setProductQuantity((quantity) =>
                      quantity < productStock ? quantity + 1 : quantity
                    )
                  }
                />
              </div>
              {productQuantity > 1 && productStock - productQuantity >= 0 && (
                <div className="grid text-sm font-semibold text-gray-400">
                  <span>
                    Only <span className="text-customYello">{productStock - productQuantity} items</span> Left!
                  </span>
                  <span>Don't miss it</span>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <div className="grid gap-3 my-5">
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter your pincode here"
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <Button onClick={checkAvailability}>Check Availability</Button>
                </div>
                <p className="text-sm px-2 text-green-500">{availabilityMessage}</p>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-[#D9190E] text-white hover:bg-white hover:text-black transition-colors duration-300"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      <hr className="my-2" />
      <ReviewsComponent />
    </div>
  );
};

export default Product;