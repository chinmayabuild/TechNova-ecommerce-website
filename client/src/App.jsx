import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./component/home/Home";
import Navbar from "./component/header/Navbar";
import { ThemeProvider } from "./component/provider/theme-provider";
import Footer from './component/footer/Footer'
import SignUp from "./component/auth/SignUp";
import { LogIn } from "lucide-react";
import Login from "./component/auth/Login"
import Product from "./component/productPage/Product";
import Checkout from "./component/productPage/Checkout";
import AdminLogin from "./component/auth/AdminLogin"; 



export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
          <Footer/>
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar />
          <SignUp />
          <Footer/>
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login />
          <Footer/>
        </>
      ),
    },
    {
      path: "/product",
      element: (
        <>
          <Navbar />
          <Product />
          <Footer/>
        </>
      ),
    },
    {
      path: "/checkout",
      element: (
        <>
          <Navbar />
          <Checkout />
          <Footer/>
        </>
      )},
      {
        path: "/admin/login",
        element: (
          <>
            <Navbar />
            <AdminLogin/>
            <Footer/>
          </>
        ),
    } ]);

  return (
    <>
    <ThemeProvider>
    <RouterProvider router={router} />
    </ThemeProvider>
    </>
  )
 
}
