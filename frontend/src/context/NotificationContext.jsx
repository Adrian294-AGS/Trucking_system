import React from "react";
import { useContext, createContext, useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { useToast } from "./ToastContext";
import { useUserAuth } from "../hooks/useUserAuth";

const NotificationContextProvider = createContext();

export default function NotificationContext({ children }) {
  const socket = useSocket();
  const { showToast } = useToast();
  const { user } = useUserAuth();
  const [update, setUpdate] = useState(false);
  const [userLogUpdate, setUserLogUpdate] = useState(false);
  const [userLogInfo, setUserLogInfo] = useState(null);

  useEffect(() => {
    if (!user) return;
    setUserLogInfo({
      UID: user.UID,
      email: user.email,
    });
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = () => {
      setUpdate((prev) => !prev);
    };

    socket.on("update", handleUpdate);

    const handleOrderUpdate = ({ message }) => {
      showToast("success", "SSK-TRUCKING", message);
      setUpdate((prev) => !prev);
    };

    socket.on("order:update", handleOrderUpdate);

    const userLogHandler = async ({ userLogInfo }) => {
      userLogInfo.Created_at = "Today";
      setUserLogInfo(userLogInfo);
      setUserLogUpdate((prev) => !prev);
    };

    socket.on("recieve:userLog", userLogHandler);

    return () => {
      socket.off("update", handleUpdate);
      socket.off("order:update", handleOrderUpdate);
      socket.off("recieve:userLog", userLogHandler);
    };
  }, [socket]);

  const sendUpdate = async () => {
    if (!socket) return;
    socket.emit("update");
  };

  const sendOrderUpdate = async (id, message, UID, status) => {
    if (!socket) return;

    const notifInfo = {
      UID: UID,
      text: message,
      type: "request",
      tag: status.toUpperCase(),
      tagType: status.toLowerCase(),
    };
    socket.emit("order:update", { id, message, notifInfo });
  };

  const sendDeleteOrder = async (message) => {
    if (!socket) return;
  
    socket.emit("order:delete", {message});
  };

  const sendUserLog = async (action, status, brand, plateNumber) => {
    if (!socket || !userLogInfo?.UID) return;
    const date = new Date();
    const updateLog = {
      ...userLogInfo,
      Created_at: date.toLocaleString(),
      truck_info: `${brand} - ${plateNumber}` || null, 
      action: action,
      status: status,
    };
    setUserLogInfo(updateLog);
    socket.emit("send:userLog", { userLogInfo: updateLog });
  };

  return (
    <NotificationContextProvider
      value={{
        update,
        sendUpdate,
        sendOrderUpdate,
        sendUserLog,
        userLogUpdate,
        userLogInfo,
        sendDeleteOrder
      }}
    >
      {children}
    </NotificationContextProvider>
  );
}

export const useNotif = () => useContext(NotificationContextProvider);
