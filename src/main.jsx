import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./components/Login/LoginForm.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="relative overflow-x-hidden">
      <ToastContainer />
      <App />
    </div>
  </StrictMode>
);
