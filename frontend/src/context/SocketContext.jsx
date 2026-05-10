import { createContext, useEffect, useState } from "react";
import { useUserAuth } from "../hooks/useUserAuth";
import { io } from "socket.io-client";

export const SocketCreateContext = createContext();

export default function SocketContext({ children }) {
  const { accessToken, user } = useUserAuth();
  const [socket, setSocket] = useState(null);
  const userId = user?.fullName;

  useEffect(() => {
    if (!accessToken || !userId) return;

    const tempSocket = io({
      autoConnect: false,
      withCredentials: true,
    });

    tempSocket.connect();

    tempSocket.emit("user:connect", { userId });

    setSocket(tempSocket);
  }, [accessToken, user]);

  return (
    <SocketCreateContext.Provider value={{ socket }}>
      {children}
    </SocketCreateContext.Provider>
  );
}
