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
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === newItem._id
      );

      const itemQuantity = newItem.quantity || 1; // Ensure quantity is defined

      if (existingItemIndex === -1) {
        state.cartItems.push({
          ...newItem,
          quantity: itemQuantity, // Set quantity
          totalItemPrice: itemQuantity * newItem.price,
        });
      } else {
        state.cartItems[existingItemIndex].quantity += itemQuantity;
        state.cartItems[existingItemIndex].totalItemPrice +=
          newItem.price * itemQuantity;
      }
      state.totalQuantity += itemQuantity;
      state.totalPrice += newItem.price * itemQuantity;
    },

    removeFromCart: (state, action) => {
      const itemToRemove = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === itemToRemove._id
      );
      if (existingItemIndex === -1) return;

      const existingItem = state.cartItems[existingItemIndex];
      const removeQuantity = itemToRemove.quantity || 1; // Default to 1 if missing

      existingItem.quantity -= removeQuantity;
      existingItem.totalItemPrice -= itemToRemove.price * removeQuantity;
      state.totalQuantity -= removeQuantity;
      state.totalPrice -= itemToRemove.price * removeQuantity;

      // Remove item if quantity reaches zero
      if (existingItem.quantity <= 0) {
        state.cartItems.splice(existingItemIndex, 1);
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
