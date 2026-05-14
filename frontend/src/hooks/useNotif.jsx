import React from "react";
import { useSocket } from "./useSocket";
import { useEffect } from "react";
import { useState } from "react";
import { useToast } from "../context/ToastContext";

export default function useNotif() {
  const { socket } = useSocket();
  const { showToast } = useToast();
  const [update, setUpdate] = useState(false);
  const [userLogUpdate, setUserLogUpdate] = useState(false);
  const [userLogInfo, setUserLogInfo] = useState();

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = () => {
      setUpdate((prev) => !prev);
    };

    socket.on("update", handleUpdate);

    const handleOrderUpdate = ({ message }) => {
      showToast("success", "Order 🧺", message);
      setUpdate((prev) => !prev);
    };

    socket.on("order:update", handleOrderUpdate);

    const userLogHandler = async ({info}) => {
      info.Created_at = "Today";
      setUserLogInfo(info);
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

  const sendOrderUpdate = async (id, message) => {
    if (!socket) return;
    socket.emit("order:update", { id, message });
  };

  const sendUserLog = async (info) => {
    if(!socket) return;
    socket.emit("send:userLog", {info});
  };

  return { update, sendUpdate, sendOrderUpdate, sendUserLog, userLogUpdate, userLogInfo };
}
