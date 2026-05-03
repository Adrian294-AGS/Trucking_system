import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserAuthProvider } from "./context/UserAuthProvider.jsx";
import SocketContext from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <UserAuthProvider>
        <SocketContext>
          <App />
        </SocketContext>
      </UserAuthProvider>
  </StrictMode>,
);
