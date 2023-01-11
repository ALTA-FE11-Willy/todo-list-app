import React from "react";
import ReactDOM from "react-dom/client";
// import { Index } from "./pages/Index";
import App from "./routes/Index";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
