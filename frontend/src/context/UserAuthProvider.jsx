import { createContext, useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState({
    UID: '',
    fullName: "",
    email: "",
    photo: "",
    role: "",
    phone: "",
    address: 'Santiago City, Isabela'
  });

  const fetchUserInfo = async (token) => {
    try {
      const res = await fetch("/api/user/getUserInfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const userInfo = await res.json();

      if (!userInfo.success) {
        alert(userInfo.message);
        return;
      }
      setUser({...user,  UID: userInfo.UID,
        fullName: userInfo.username,
        photo: userInfo.photo,
        role: userInfo.role,
        email: userInfo.email,
        phone: userInfo.phoneNumber});
    } catch (error) {
      console.log("logInAuth ERROR: ", error);
    }
  };

  const logInAuth = async (token) => {
    setAccessToken(token);
    await fetchUserInfo(token);
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/user/logOut", {
        method: "POST",
        credentials: "include",
      });

      const result = await res.json();
      alert(result.message);
    } catch (error) {
      console.log("logOut ERROR: ", error);
    }
  };

  useEffect(() => {
    if(window.location.pathname === "/" || window.location.pathname === "/login" || window.location.pathname === "/admin") {
      setAuthLoading(false)
      return;
    };
    const getToken = async () => {
      try {
        const res = await fetch("/api/user/getToken", {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();
        const token = result.accessToken;
        if (result.success) {
          setAccessToken(token);
          await fetchUserInfo(token);
        }
      } catch (error) {
        console.log("RefreshToken ERROR: ", error);
      } finally {
        setAuthLoading(false);
      }
    };
    getToken();
  }, []);

  return (
    <UserAuthContext.Provider
      value={{ user, setUser, logInAuth, logout, accessToken, authLoading, logout, setAccessToken }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
