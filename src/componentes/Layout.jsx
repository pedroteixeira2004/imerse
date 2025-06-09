import React from "react";
import Navbar from "./navbar";

function AppLayout({ children }) {
  return (
    <div className="flex">
      <Navbar />
      <main className="flex-1 pl-20 min-h-screen flex justify-center items-center w-full">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;
