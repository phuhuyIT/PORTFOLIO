import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Suppress THREE.Clock deprecation warning until @react-three/fiber updates to THREE.Timer
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0] &&
    typeof args[0] === "string" &&
    args[0].includes("THREE.Clock: This module has been deprecated")
  ) {
    return;
  }
  originalWarn(...args);
};

createRoot(document.getElementById("root")!).render(<App />);
