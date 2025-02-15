import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
  },

  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload; //action.payload represents the data sent when you dispatch an action.
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === newItem._id
      );
      if (existingItemIndex === -1) {
        //-1 means the item not exists
        state.cartItems.push({
          ...newItem,
          quantity: newItem.quantity,
          totalItemPrice: newItem.quantity * newItem.price,
        });
      } else {
        state.cartItems[existingItemIndex].quantity += newItem.quantity;
        state.cartItems[existingItemIndex].totalprice +=
          newItem.price * newItem.quantity;
      }

      state.totalQuantity += newItem.quantity;

      state.totalPrice = Number(
        (state.totalPrice += newItem.quantity * newItem.quantity.toFixed(2)) //.toFixed(2) converts a number to a string, rounding it to 2 decimal places.
      );
    },

    /* 
    let quantity = 3.456;
     console.log(quantity.toFixed(2));  // "3.46" (string)
    console.log(Number(quantity.toFixed(2)));  // 3.46 (number)
    */

    removeFromCart: (state, action) => {
      const itemToRemove = action.payload;

      const existingItemIndex = state.cartItems.findIndex(
        (items) => items._id === itemToRemove._id
      );
      if (existingItemIndex === -1) return;

      const existingItem = state.cartItems[existingItemIndex];
      existingItem.quantity -= itemToRemove.quantity;
      existingItem.totalItemPrice -= itemToRemove.price * itemToRemove.quantity;

      state.totalQuantity -= itemToRemove.quantity;
      state.totalPrice = Number(
        state.totalPrice -
          (itemToRemove.price * itemToRemove.quantity).toFixed(2)
      );

      if (existingItem.quantity <= 0) {
        state.cartItems = state.cartItems.splice(existingItemIndex, 1);
      }
    },

    
    emptyCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
