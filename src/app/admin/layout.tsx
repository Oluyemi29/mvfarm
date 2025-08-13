import AdminNavbar from "@/components/AdminNavbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>
    <AdminNavbar />
    {children}</div>;
};

export default layout;
