import React, { ReactNode } from "react";
import Navbar from "@components/commons/Navbar";
import Footer from "@components/commons/Footer";

interface HomeLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <Navbar />
      </header>
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
