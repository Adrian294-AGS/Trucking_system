import { UserAuthContext } from "../context/UserAuthContext";
import { useContext } from "react";

export const useUserAuth = () => useContext(UserAuthContext);