"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, LogOut, User, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {useAppSelector} from "@/features/type/hooks"
import {useLogoutMutation} from "@/features/api/authApi"
export function Header() { 
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const user = useAppSelector((state) => state.userslice.user);
  const [logout,{isError}] = useLogoutMutation();

  const handleLogout = () => {
    logout();

if(!isError){
  router.push("/login");
}
  };

  return (
    <header className="flex gap-5 items-center justify-between px-6 py-4 bg-card border-b border-border">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10" />
        </div>
      </div>

      {/* User Menu */}

      <div className="flex gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 outline-none border-0">
                <Avatar className="h-10 w-10">
                {user?.userProfileImage ? (
                  <img
                  src={user.userProfileImage}
                  alt={user?.name || "avatar"}
                  className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary">
                  {user?.name?.charAt(0).toUpperCase() }
                  </AvatarFallback>
                )}
                </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-1"
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          {theme === "dark" ? (
            <Moon className="h-4 w-4 " />
          ) : (
            <Sun className="h-4 w-4 " />
          )}
        </Button>
      </div>
    </header>
  );
}

export default Header;
