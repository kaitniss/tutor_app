import React from "react";
import { createRoot } from "react-dom/client";
import WOOPSuccessApp from "./WOOPSuccessApp";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WOOPSuccessApp />
  </React.StrictMode>,
);
