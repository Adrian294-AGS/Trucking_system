import { UserAuthContext } from "../context/UserAuthProvider";
import { useContext } from "react";

export const useUserAuth = () => useContext(UserAuthContext);