import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserAuthProvider } from "./context/UserAuthProvider.jsx";
import SocketContext from "./context/SocketContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import NotificationContext from "./context/NotificationContext.jsx";
import NotificationInfoProvider from "./context/NotificationInfoContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <UserAuthProvider>
        <SocketContext>
          <NotificationContext>
            <NotificationInfoProvider>
              <App />
            </NotificationInfoProvider>
          </NotificationContext>
        </SocketContext>
      </UserAuthProvider>
    </ToastProvider>
  </StrictMode>,
);
