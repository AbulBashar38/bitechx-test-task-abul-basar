"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useAppSelector } from "@/hooks/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const authRoutes = ["/login"];

const PrivateRouteProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If user is not authenticated and trying to access protected route
    if (!token && !authRoutes.includes(pathname)) {
      router.push("/login");
    }
  }, [token, pathname, router]);

  // Show loading or nothing while redirecting
  if (!token && !authRoutes.includes(pathname)) {
    return <LoadingSpinner />;
  }

  return <div>{children}</div>;
};

export default PrivateRouteProvider;
