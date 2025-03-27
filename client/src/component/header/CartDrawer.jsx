import React from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux"; // Removed duplicate import
import CartProduct from "../../pages/CartProduct";
import { DialogTitle } from "@radix-ui/react-dialog";
import LinkButton from "../productPage/LinkButton";

const CartDrawer = () => {
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  return (
    <Drawer>
      <DrawerTrigger className="relative">
        {totalQuantity > 0 && (
          <Badge className="absolute px-1 py-0">{totalQuantity}</Badge>
        )}
        <ShoppingCart
          className=" hover:scale-105 transition-all ease-in-out cursor-pointer"
          strokeWidth={1.3}
          size={28}
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle> {/* Changed DialogTitle to DrawerTitle */}
          <DrawerDescription className="text-white">
            Total Items: {totalQuantity}, Total Price: ₹{totalPrice}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col sm:flex-row justify-start gap-3 h-[70vh]  overflow-y-scroll sm:overflow-hidden sm:h-auto mx-3">
          {cartItems.length === 0 ? (
            <h2 className="text-primary text-3xl">Your Cart is Empty...</h2>
          ) : (
            cartItems.map((item) => (
              <CartProduct
                key={item._id}
                _id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
                stock={item.stock}
                blacklisted={item.blacklisted}
              />
            ))
          )}
        </div>
        <DrawerFooter>
          <LinkButton
            to="/checkout"
            text="Checkout"
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;