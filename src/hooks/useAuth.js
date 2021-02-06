import { useContext, useEffect } from "react";
import UserContext from "../UserContext";

export default function useAuth() {
  const {currentUser, setCurrentUser} = useContext(UserContext);

  function saveToken(token) {
    localStorage.setItem('token', token);
    setCurrentUser({
      token
    });
  }

  return {
    isLoggedIn: !!currentUser.token,
    token: currentUser.token,
    saveToken
    
  }
}