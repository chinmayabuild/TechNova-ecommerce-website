import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely parse user from localStorage
const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: localStorage.getItem("role") || null,
    user: getStoredUser(),
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.role = action.payload.role; // Use root-level role
      state.user = action.payload.user; // Use root-level user
      state.isAuthenticated = true;

      // Store in localStorage
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    setUserLogout: (state) => {
      state.role = null;
      state.user = null;
      state.isAuthenticated = false;

      // Remove from localStorage
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUserLogin, setUserLogout } = authSlice.actions;
export default authSlice.reducer;