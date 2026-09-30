"use client";

import React, { FC, useEffect, useState } from "react";
import ChildrenInterface from "@/interfaces/children-interface";
import { AntdRegistry } from "@ant-design/nextjs-registry";
// import "@ant-design/v5-patch-for-react-19";
import "animate.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./sidebar";
import AppNavbar from "./navbar";
import {
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { usePathname } from "next/navigation";

const AppLayout: FC<ChildrenInterface> = ({ children }) => {
  const pathname = usePathname();

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  console.log(role)

  const hideRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];

  const hideLayout = hideRoutes.includes(pathname);

  // Auth Pages
  if (hideLayout) {
    return (
      <AntdRegistry>
        {children}
      </AntdRegistry>
    );
  }

  // Wait until role is loaded
  if (role === null) {
    return null;
  }

  // Dashboard Layout
  if (role === "customer" || role === "maid") {
    return (
      <AntdRegistry>
        <SidebarProvider className="bg-[#F5F5F5]">
          <AppSidebar />

          <main className="w-full">
            <AppNavbar />

            <CardContent className="px-16 py-6">
              <CardTitle className="text-xl font-semibold capitalize">
                {pathname.split("/").pop()}
              </CardTitle>

              <CardDescription className="text-sm text-muted-foreground">
                Welcome back 👋
              </CardDescription>

              <CardContent className="mt-6 bg-[#F5F5F5]">
                {children}
              </CardContent>
            </CardContent>
          </main>
        </SidebarProvider>
      </AntdRegistry>
    );
  }

  // Default
  return (
    <AntdRegistry>
      {children}
    </AntdRegistry>
  );
};

export default AppLayout;