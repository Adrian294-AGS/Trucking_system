import React from "react";
import { useEffect, useState, useContext, createContext } from "react";
import { useUserAuth } from "../hooks/useUserAuth";
import { useNotif } from "./NotificationContext";

const NotificationInfo = createContext();

export default function NotificationInfoProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const { user, accessToken} = useUserAuth();
  const { update } = useNotif();

  useEffect(() => {
    if(!accessToken) return;
    const fetchNotif = async () => {
      try {
        const res = await fetch("/api/user/getNotif", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });
        const result = await res.json();
        if (!result.success) {
          return;
        }
        setNotifications(result.notifInfo);
      } catch (error) {
        console.log("FetchNotif ERROR: ", error);
      }
    };
    fetchNotif();
  }, [user, accessToken, update]);

  return (
    <NotificationInfo.Provider value={{notifications, setNotifications}}>{children}</NotificationInfo.Provider>
  );
}

export const useNotifBell = () => useContext(NotificationInfo);
