import React from "react";
import Navbar from "./navbar";

function AppLayout2({ children }) {
  return (
    <div className="flex">
      <Navbar />
      <main className="flex-1 pl-20 min-h-screen flex">{children}</main>
    </div>
  );
}

export default AppLayout2;
