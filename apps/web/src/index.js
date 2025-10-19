import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

console.log("index file loaded");
console.log("=== CLIENT ID ===");
console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
console.log("=================");
const rootElement = document.getElementById("root");

if (rootElement) {
  console.log("rendering app...");

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {console.log("index component rendered")}
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
