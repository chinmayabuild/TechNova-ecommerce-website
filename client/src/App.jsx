import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./component/home/Home";
import Navbar from "./component/header/Navbar";
import { ThemeProvider } from "./component/provider/theme-provider";
import Footer from "./component/footer/Footer";
import SignUp from "./component/auth/SignUp";
import { LogIn } from "lucide-react";
import Login from "./component/auth/Login";
import Product from "./component/productPage/Product";
import Checkout from "./component/productPage/Checkout";
import AdminLogin from "./component/auth/AdminLogin";
import Error from "./pages/Error";
import Sucess from "./pages/Sucess";
import { Root } from "postcss";
import RootLayout from "./component/admin-layouts/RootLayout";
import AdminLayout from "./component/admin-layouts/AdminLayout";
import CreateProducts from "./component/admin-layouts/CreateProducts";
import AllProducts from "./component/admin-layouts/AllProducts";
import Analytics from "./component/admin-layouts/Analytics";
import Orders from "./component/admin-layouts/Orders";
import Settings from "./component/admin-layouts/Settings";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout>
          <Home />
        </RootLayout>
      ),
    },
    {
      path: "/signup",
      element: (
       
         <RootLayout children={<SignUp />} />
        
      ),
    },
    {
      path: "/login",
      element: (
        <RootLayout children={<Login />} />
      ),
    },
    {
      path: "/product",
      element: (
        <RootLayout children={<Product />} />
      ),
    },
    {
      path: "/checkout",
      element: (
        <RootLayout children={<Checkout />} />
      ),
    },
    {
      path: "/admin/login",
      element: (
        <RootLayout children={<AdminLogin />} />
      ),
    },
    {
      path : "/admin/dashboard",
      element :<AdminLayout children={<CreateProducts/>}/>

    },
    {
      path : "/admin/dashboard/all-products",
      element :<AdminLayout children={<AllProducts/>}/>

    },
    {
      path : "/admin/dashboard/analytics",
      element :<AdminLayout children={<Analytics/>}/>

    },
    {
      path : "/admin/dashboard/orders",
      element :<AdminLayout children={<Orders/>}/>

    },
    {
      path : "/admin/dashboard/settings",
      element :<AdminLayout children={<Settings/>}/>

    },
    {
      path: "/*",
      element: (
        <>
          <Error/>
        </>
      ),
    },  {
      path: "/sucess",
      element: (
        <>
          <Sucess/>
        </>
      ),
    },

  ]);

  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}
