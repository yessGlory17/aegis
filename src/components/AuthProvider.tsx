"use client";
import { SessionProvider } from "next-auth/react";

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
