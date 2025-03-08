import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import useErrorLogout from "../hooks/use-error-logout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserLogin } from "@/redux/slices/authSlice";

const Settings = () => {
  const { handleErrorLogout } = useErrorLogout();
  const dispatch = useDispatch();

  const changeUsername = async (e) => {
    e.preventDefault();
    const previousUsername = e.target.previousUsername.value.trim();
    const newUsername = e.target.newUsername.value.trim();

    if (!previousUsername || !newUsername) { // Enhanced validation
      toast("Both previous and new usernames are required", {
        style: { backgroundColor: "red", color: "white", fontWeight: "bold" },
      });
      return;
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/change-username`,
        { previousUsername, newUsername },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = res.data;

      // Update localStorage and Redux state
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role); // Ensure role is updated
      dispatch(setUserLogin({ admin: data.user, token: localStorage.getItem("token") }));

      e.target.reset();

      toast(data.message, {
        style: { backgroundColor: "green", color: "white", fontWeight: "bold" },
      });
    } catch (error) {
      handleErrorLogout(error);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const previousPassword = e.target.previousPassword.value.trim();
    const newPassword = e.target.newPassword.value.trim();

    if (!previousPassword || !newPassword) { // Enhanced validation
      toast("Both previous and new passwords are required", {
        style: { backgroundColor: "red", color: "white", fontWeight: "bold" },
      });
      return;
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/change-password`,
        { previousPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = res.data;

      e.target.reset();

      toast(data.message, {
        style: { backgroundColor: "green", color: "white", fontWeight: "bold" },
      });
    } catch (error) {
      handleErrorLogout(error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-screen sm:w-[80vw] sm:justify-start">
      {/* Change Username */}
      <div>
        <h2 className="text-2xl font-bold sm:text-xl mb-3">Change Username</h2>
        <form className="grid gap-3 w-[80vw] sm:w-[30vw]" onSubmit={changeUsername}>
          <Input
            type="text"
            placeholder="Enter previous username"
            name="previousUsername"
            autoComplete="username" // Standardized autocomplete value
          />
          <Input
            type="text"
            placeholder="Enter new username"
            name="newUsername"
            autoComplete="new-username" // Standardized autocomplete value
          />
          <Button type="submit" className="w-fit">
            Change Username
          </Button>
        </form>
      </div>

      {/* Change Password */}
      <div>
        <h2 className="text-2xl font-bold sm:text-xl mb-3">Change Password</h2>
        <form className="grid gap-3 w-[80vw] sm:w-[30vw]" onSubmit={changePassword}>
          <Input
            type="password"
            placeholder="Enter previous password"
            name="previousPassword"
            autoComplete="current-password" // Standardized autocomplete value
          />
          <Input
            type="password"
            placeholder="Enter new password"
            name="newPassword"
            autoComplete="new-password" // Standardized autocomplete value
          />
          <Button type="submit" className="w-fit">
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;