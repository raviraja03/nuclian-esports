"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Trophy,
  CreditCard,
  Settings,
  ChevronLeft,
  Shield,
  MenuIcon,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Tournaments", href: "/dashboard/tournaments", icon: Trophy },
  { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // prevent body scroll when drawer is open
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     document.body.style.overflow = mobileOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [mobileOpen]);

  const NavContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">Admin</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          {/* desktop collapse toggle (hide on small screens) */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed((c) => !c)}
            className="h-8 w-8 p-0 hidden md:inline-flex"
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed && "rotate-180"
              )}
            />
          </Button>

          {/* mobile close button (visible in drawer) */}
          {onItemClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileOpen(false)}
              className="h-8 w-8 p-0 md:hidden"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onItemClick}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    // center icons when collapsed (desktop only)
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop sidebar (hidden on small screens) */}
      <aside
        className={cn(
          "hidden md:flex flex-col h-full bg-card border-r border-border transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <NavContent />
      </aside>

      {/* Mobile: floating menu button (visible only on small screens) */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden"
        aria-label="Open menu"
      >
        <MenuIcon className="h-5 w-5" />
      </Button>

      {/* Mobile drawer + backdrop */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border md:hidden transform transition-transform">
            <NavContent onItemClick={() => setMobileOpen(false)} />
          </aside>
        </>
      )}
    </>
  );
}

export default Sidebar;
