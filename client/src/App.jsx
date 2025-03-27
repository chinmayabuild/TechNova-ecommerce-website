import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./component/provider/theme-provider";
import { Toaster } from "./components/ui/sonner";
import Home from "./component/home/Home";
import SignUp from "./component/auth/SignUp";
import Login from "./component/auth/Login";
import Product from "./component/productPage/Product";
import Checkout from "./component/productPage/Checkout";
import AdminLogin from "./component/auth/AdminLogin";
import Error from "./pages/Error";
import Success from "./pages/Success";
import MyOrders from "./pages/MyOrders";
import ProtectedRoute from "./component/custom/ProtectedRoute";

// Admin Layouts
import RootLayout from "./component/admin-layouts/RootLayout";
import AdminLayout from "./component/admin-layouts/AdminLayout";
import CreateProducts from "./component/admin-layouts/CreateProducts";
import AllProducts from "./component/admin-layouts/AllProducts";
import Analytics from "./component/admin-layouts/Analytics";
import Orders from "./component/admin-layouts/Orders";
import Settings from "./component/admin-layouts/Settings";
import ProductPage from "./pages/ProductPage";
import LogoutToggle from "./component/header/LogoutToggle";



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout>
          <Home />
        </RootLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <RootLayout children={<SignUp />} />,
  },
  {
    path: "/login/:productName?",
    element: <RootLayout children={<Login />} />,
  },
  {
    path: "/logout",
    element: <ProtectedRoute><RootLayout children={<LogoutToggle />} /> </ProtectedRoute>,
  },
  {
    path: "/product/:productName",
    element: <RootLayout children={<Product />} />,
  },
  {
    path: "/product/page",
    element: <RootLayout children={<ProductPage/>} />,
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <RootLayout children={<Checkout />} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <RootLayout children={<MyOrders />} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/login",
    element: <RootLayout children={<AdminLogin />} />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminLayout children={<CreateProducts />} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/dashboard/all-products",
    element: (
      <ProtectedRoute>
        <AdminLayout children={<AllProducts />} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/dashboard/analytics",
    element: (
      <ProtectedRoute>
        <AdminLayout children={<Analytics />} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/dashboard/orders",
    element: (
      <ProtectedRoute>
        <AdminLayout children={<Orders />} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/dashboard/settings",
    element: (
      <ProtectedRoute>
        <AdminLayout children={<Settings />} />
      </ProtectedRoute>
    ),
  },
  { path: "/*", element: <Error /> },
  { path: "/success", element: <Success /> },
]);

export default function App() {
  return (
    <ThemeProvider>
      <Toaster />
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
