import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./component/home/Home";
import Navbar from "./component/header/Navbar";
import { ThemeProvider } from "./component/provider/theme-provider";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
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
  )
 
}
