import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserLogin } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

  const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();

    if (!username || !password) {
      toast("⚠️ Please fill in all the fields!", {
        style: { backgroundColor: "red", color: "white", fontWeight: "bold" },
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/admin-login",
        { username, password }
      );
      const data = res.data;

      dispatch(setUserLogin(data));
      toast.success(data.message);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[50vh] lg:w-[25vw] mx-auto my-32 grid gap-10">
      <h1 className="text-2xl font-bold">Login into your Account</h1>
      <form className="grid gap-3" onSubmit={handleLogin}>
        <Input
          placeholder="Username Here..."
          type="text"
          name="username"
          autoComplete="username"
        />
        <Input
          placeholder="Password Here..."
          type="password"
          name="password"
          autoComplete="password"
        />
        <Button disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
