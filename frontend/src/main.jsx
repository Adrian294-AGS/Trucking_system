import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserAuthProvider } from "./context/UserAuthProvider.jsx";
import SocketContext from "./context/SocketContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import NotificationContext from "./context/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <UserAuthProvider>
        <SocketContext>
          <NotificationContext>
            <App />
          </NotificationContext>
        </SocketContext>
      </UserAuthProvider>
    </ToastProvider>
  </StrictMode>,
);
