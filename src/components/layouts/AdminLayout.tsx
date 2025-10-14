import React from "react";
import Sidebar from "@components/commons/Sidebar";
import Navbar from "@components/commons/Navbar";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Central content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
