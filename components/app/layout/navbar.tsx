"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import HttpInterceptor from "@/lib/http-interseptor";

 interface UserInterface {
 auth:{ 
  name:string,
  email:string,
  role:string
}
 }
const AppNavbar = () => {

const [user,setUser] = useState<UserInterface |null>(null)
 
const getProfile = async (url:string)=>{
  try{
    const res = await HttpInterceptor.get(url)
    setUser(res.data.profile)
  }
  catch(err:unknown)
  {
    console.log(err)
  }

}

useEffect(()=>{
  const role = localStorage.getItem("role")

 if(role ==="customer")
  getProfile('/customer/profile')

if(role === "maid")
 getProfile('/maid/profile')

 
},[])

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />

        
      </div>

      {/* Center */}
      <div className="hidden w-full max-w-md md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="size-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        <Avatar className="h-10 w-10">
          <AvatarImage src="/avatar.png" />
          <AvatarFallback>{user?.auth?.name?.slice(0,2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="hidden md:block">
          <p className="text-sm font-medium">
            {user?.auth?.name}
          </p>

          <p className="text-xs text-muted-foreground">
            {user?.auth?.role }
          </p>
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;