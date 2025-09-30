import React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout"

const layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;
