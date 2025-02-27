import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement | null;
if (!rootElement) {
  console.error("Root element #root not found. Make sure index.html has <div id='root'></div>");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error("Error rendering React app:", error);
  }
}