import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppErrorBoundary from "./ErrorBoundary";
import "./app.css";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

const container = document.getElementById("root");
if (!container) throw new Error("Root container #root is missing");

createRoot(container).render(
  <BrowserRouter basename={basename}>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </BrowserRouter>,
);
