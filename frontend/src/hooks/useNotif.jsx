import React from "react";
import { useSocket } from "./useSocket";
import { useEffect } from "react";
import { useState } from "react";
import { useToast } from "../context/ToastContext";

export default function useNotif() {
  const { socket } = useSocket();
  const { showToast } = useToast();
  const [update, setUpdate] = useState(false);

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

    return () => {
      socket.off("update", handleUpdate);
      socket.off("order:update", handleOrderUpdate);
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

  return { update, sendUpdate, sendOrderUpdate };
}
