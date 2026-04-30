import { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

export default function AdminAuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState("");
  const [admin, setadmin] = useState({
    username: "",
    email: "",
    photo: "",
    role: "",
    phoneNumber: "",
  });

  const logInAuth = async (token) => {
    setAccessToken(token);
    try {
      const res = await fetch("/api/admin/getUserInfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const adminInfo = await res.json();

      if (!adminInfo.success) {
        alert(adminInfo.message);
        return;
      }
      setUser({
        username: adminInfo.username,
        photo: adminInfo.photo,
        role: adminInfo.role,
        email: adminInfo.email,
        phoneNumber: adminInfo.phoneNumber,
      });
    } catch (error) {
      console.log("logInAuth ERROR: ", error);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/admin/logOut", {
        method: "POST",
        credentials: "include",
      });

      const result = await res.json();
      if (!result.success) {
        alert(result.message);
        return;
      }
      alert(result.message);
    } catch (error) {
      console.log("logOut ERROR: ", error);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await fetch("/api/admin/getToken", {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      if (!result.success) {
        alert(result.message);
        return;
      }
      setAccessToken(result.accessToken);
    } catch (error) {
      console.log("RefreshToken ERROR: ", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      logInAuth(accessToken);
    } else {
      refreshToken();
    }
  }, [accessToken]);
  return (
    <AdminAuthContext.Provider value={{ admin, logInAuth, accessToken, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
