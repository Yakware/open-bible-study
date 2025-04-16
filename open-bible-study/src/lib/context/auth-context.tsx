"use client";
import { Session, User } from "better-auth";
import { createContext, ReactNode, useContext } from "react";

type AuthContext = {
  session: Session;
  user: User;
};

const authContext = createContext<AuthContext | undefined>(undefined);

const { Provider } = authContext;

type AuthContextProviderProps = {
  session: Session;
  user: User;
  children: ReactNode;
};

export function AuthContextProvider({
  children,
  session,
  user,
}: AuthContextProviderProps) {
  return <Provider value={{ session, user }}>{children}</Provider>;
}

export function useSession() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useSession must be used inside of an AuthContextProvider");
  }
  return context.session;
}

export function useUser() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useUser must be used inside of an AuthContextProvider");
  }
  return context.user;
}
