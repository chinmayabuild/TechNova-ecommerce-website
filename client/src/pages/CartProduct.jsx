import React from "react";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector
import { Minus, Plus } from "lucide-react";
import { Colors } from "../component/constants/Color";
import { removeFromCart, addToCart } from "../redux/slices/cartSlice";
import { toast } from "sonner";
import useRazorpay from "@/component/hooks/use-razorpay";
import { useNavigate } from "react-router-dom"; // Added for navigation

const CartProduct = ({ name, price, _id, image, quantity, stock, blacklisted }) => {
  const dispatch = useDispatch();
  const { generatePayment, verifyPayment } = useRazorpay(); // Fixed typo in hook name
  const navigate = useNavigate(); // Added for navigation
  const { isAuthenticated } = useSelector((state) => state.auth); // Fixed import issue

  // Action handlers
  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(removeFromCart({ _id, quantity: 1, price }));
    } else {
      dispatch(removeFromCart({ _id }));
      toast("Item removed from cart", {
        style: { background: "green", color: "white" },
      });
    }
  };

  const handleIncrease = () => {
    if (quantity >= stock) {
      toast("Product is out of stock", {
        style: { background: "red", color: "white" },
      });
    } else {
      dispatch(addToCart({ _id, name, price, quantity: 1, image, stock }));
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate("/login"); // Fixed typo from Navigate to navigate
      return;
    }

    if (quantity > stock) {
      toast("Product out of Stock");
      return;
    }

    if (blacklisted) {
      toast("Product is not available for purchase");
      return;
    }

    const order = await generatePayment(price * quantity);
    if (order) { // Added check to ensure order exists
      await verifyPayment(order, [{ id: _id, quantity }], "");
    }
  };

  return (
    <div className="border w-full max-w-[20rem] sm:max-w-[24rem] rounded-2xl overflow-hidden grid hover:shadow-md transition-shadow duration-300">
      <img
        src={image || "https://via.placeholder.com/150"}
        alt={name}
        className="w-full h-48 sm:h-56 object-cover rounded-t-2xl"
      />
      <div className="px-3 py-2 bg-white dark:bg-zinc-900 grid gap-1">
        <h2 className="text-md sm:text-lg font-semibold">{name}</h2>
        <span className="font-semibold text-md sm:text-lg text-customYello">
          ₹{price ? price.toLocaleString() : "N/A"}
        </span>
        <div className="flex justify-between my-2">
          <div className="flex items-center gap-3 sm:gap-5 bg-[#32363B] rounded-lg px-2 sm:px-3 py-1 sm:py-2">
            <Minus
              size={15}
              stroke={Colors.customGray}
              className="cursor-pointer text-[#e9660d]"
              onClick={handleDecrease}
            />
            <span className="text-slate-950 dark:text-white text-sm sm:text-md w-6 text-center">
              {quantity}
            </span>
            <Plus
              size={15}
              stroke={Colors.customGray}
              className="cursor-pointer text-[#e9660d]" // Fixed missing quote
              onClick={handleIncrease}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CartProduct;