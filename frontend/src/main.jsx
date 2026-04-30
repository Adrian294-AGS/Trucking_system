import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserAuthProvider } from "./context/UserAuthContext.jsx";
import AdminAuthProvider from "./context/AdminAuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminAuthProvider>
      <UserAuthProvider>
        <App />
      </UserAuthProvider>
    </AdminAuthProvider>
  </StrictMode>,
);
