import { createContext, useEffect, useState } from "react";
import { useUserAuth } from "../hooks/useUserAuth";
import socket from "../lib/socket";

export const SocketCreateContext = createContext();

export default function SocketContext({ children }) {
  const { accessToken, user } = useUserAuth();

  useEffect(() => {
    if (!accessToken || !user){
      socket.disconnect();
      return;
    };

    socket.connect();

    socket.on("connect", () => {
      socket.emit("user:connect", { userId: user.fullName });
    });

    return () => {
      socket.off("connect");
    }

  }, [accessToken, user]);

  return (
    <SocketCreateContext.Provider value={ socket }>
      {children}
    </SocketCreateContext.Provider>
  );
}
