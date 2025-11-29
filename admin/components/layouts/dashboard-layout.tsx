"use client"

import type React from "react"
import { useEffect } from "react"
import Sidebar from "../Sidebar"
import  Header from "../Header"
import { toast } from "sonner";
import { useAppDispatch } from "@/features/type/hooks";
import { clearCredentials, setCredentials } from "@/features/slice/userSlice";
import { redirect } from "next/navigation";
import { useFetchProfileQuery } from "@/features/api/authApi";
interface DashboardLayoutProps {
  children: React.ReactNode
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: profile, isError } = useFetchProfileQuery();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (profile) {
      dispatch(setCredentials({ user: profile.data }));
      // toast.success("Logged in successfully");
      // redirect("/dashboard");
    } else if (isError) {
      dispatch(clearCredentials());
      toast.error("Session expired. Please log in again.");
      redirect("/login");
    }
  }, [profile, isError, dispatch]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
export default DashboardLayout