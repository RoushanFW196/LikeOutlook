import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MailContextProvider } from "./context/mailcontext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MailContextProvider>
      <App />
    </MailContextProvider>
  </StrictMode>
);
