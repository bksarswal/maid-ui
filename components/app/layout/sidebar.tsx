"use client";

import Link from "next/link";
import Logo from "@/components/shared/logo";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { customerMenu } from "./menu/customer";
import { maidMenu } from "./menu/maid";

const AppSidebar = () => {


  const role =  localStorage.getItem("role")

  const menus = role === "maid" ? maidMenu : customerMenu;
  
  return (
    <Sidebar className="bg-white">
      <SidebarHeader className="border-b p-4">
        <Logo />
      </SidebarHeader>

      <SidebarContent className="p-3">
        <SidebarMenu>
          {menus.map((menu) => (
            <SidebarMenuItem key={menu.title}>
              <SidebarMenuButton
                
                className="h-11 rounded-lg"
              >
                <Link
                  href={menu.href}
                  className="flex items-center gap-3"
                >
                  <menu.icon className="h-5 w-5" />
                  <span>{menu.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 text-center text-xs text-muted-foreground">
        © 2026 MaidHire
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;