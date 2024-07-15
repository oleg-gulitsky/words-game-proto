import React from "react";
import ReactDOM from "react-dom/client";

import { PersistStateProvider } from "./state/index.jsx";
import { App } from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PersistStateProvider>
      <App />
    </PersistStateProvider>
  </React.StrictMode>
);
