"use client";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const session = useSession();
  const path = usePathname();
  const router = useRouter();
    
  useEffect(() => {
    console.log("SESSION LOG: ", session, path);
    if (session.status === "unauthenticated") {
      console.log("REDIRECTING...");
      router.replace("/login");
    }

    if (session.status === "authenticated" && path === "/login") {
      router.replace("/vault");
    }
  }, [session, router]);

  return <>{children}</>;
}
