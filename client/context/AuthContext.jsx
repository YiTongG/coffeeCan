import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const updateUser = (data) => {
    setCurrentUser(data);
  };
//call local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    //const current user
    <AuthContext.Provider value={{ currentUser,updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};