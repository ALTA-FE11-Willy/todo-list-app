import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import DetailTask from "../pages/Detail";
import { Index } from "../pages/Index";
import "../styles/App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/task/:id", // Path param
    element: <DetailTask />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
