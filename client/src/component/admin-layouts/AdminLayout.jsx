import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../custom/AppSidebar";

const AdminLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className="sm:m-10">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
