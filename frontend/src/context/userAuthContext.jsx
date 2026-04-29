import {createContext, useContext, useEffect, useState} from "react";

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isLoggedin = localStorage.getItem('isloggedin');
  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <UserAuthContext.Provider value={{ user, login, logout, isLoggedin}}>
      {children}
    </UserAuthContext.Provider>
  )
};

export const useUserAuth = () => useContext(UserAuthContext);
