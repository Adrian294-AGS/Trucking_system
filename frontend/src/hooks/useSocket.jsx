import { useContext } from "react";
import { SocketCreateContext } from "../context/SocketContext";

export const useSocket = () => useContext(SocketCreateContext);
