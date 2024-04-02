"use client";
import { useState, useEffect, createContext, Dispatch, SetStateAction } from "react";

type IstateContext = {
  // name: string;
  // email?: string;
  // wallet: string;
  // image?: string;
  user: any,
  setUser: Function,
};

interface Children {
  children: React.ReactNode;
} 

const initialState = {
  user: {},
  setUser: () => {},
};

export const UserContext = createContext<IstateContext>(initialState);

export const UserProvider: React.FC<Children> = ({ children }) => {
  const [user, setUser] = useState();
  console.log(user)

  // useEffect(() => {
    
  // }, [])
  
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children} 
    </UserContext.Provider>
  );
};

//Dispatch<SetStateAction<any>>