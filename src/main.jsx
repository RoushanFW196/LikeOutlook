import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MailContextProvider } from "./context/mailcontext.jsx";
import { MailStatuscontextProvider } from "./context/mailStatusContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MailStatuscontextProvider>
      <MailContextProvider>
        <App />
      </MailContextProvider>
    </MailStatuscontextProvider>
  </StrictMode>
);
