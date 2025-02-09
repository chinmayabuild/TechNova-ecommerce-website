import React from 'react'
import { Button } from '../ui/button';
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
import { ShoppingCart } from 'lucide-react';
import { Badge } from '../ui/badge';
  

const CartDrawer = () => {

let cartItems = [
  {
    id : 1,
    name : "product-1",
    price: 100,
    quantity: 3
  },
  {
    id : 2,
    name : "product-2",
    price: 200,
    quantity: 34

  }
];
const totalQuantity = 0;

const totalPrice = 0;

  return (
    <Drawer>
  <DrawerTrigger className='relative'>
    {
      totalQuantity > 0 && <Badge className={'absolute px-1 py-0'}>{totalQuantity}</Badge>
    }
    <ShoppingCart className='text-gray-800 dark:text-white hover:scale-105 transition-all ease-in-out cursor-pointer' strockWidth={1.3} size={28}>

    </ShoppingCart>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>Total Items : {totalQuantity},T Total Price : ₹{totalPrice}</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Checkout</Button>
      
    </DrawerFooter>
  </DrawerContent>
</Drawer>

  )
}

export default CartDrawer
