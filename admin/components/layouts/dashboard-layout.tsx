"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "../Sidebar"
import  Header from "../Header"
import { features } from "process"

interface DashboardLayoutProps {
  children: React.ReactNode
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()

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