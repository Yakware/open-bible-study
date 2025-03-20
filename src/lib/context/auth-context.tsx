"use client";
import { createContext, ReactNode, useContext } from "react";

type AuthContext = {
  isAuthenticated: boolean;
};

const authContext = createContext<AuthContext | undefined>(undefined);

const { Provider } = authContext;

type AuthContextProviderProps = {
  isAuthenticated: boolean;
  children: ReactNode;
};

export function AuthContextProvider({
  children,
  isAuthenticated,
}: AuthContextProviderProps) {
  return <Provider value={{ isAuthenticated }}>{children}</Provider>;
}

export function useIsAuthenticated() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error(
      "useIsAuthenticated must be used inside of an AuthContextProvider"
    );
  }
  return context.isAuthenticated;
}
