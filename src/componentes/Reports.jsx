import React from "react";
import { useNavigate } from "react-router-dom";
import Background from "./background";
import AppLayout from "./Layout";
const Reports = () => {
  return (
    <div>
      <Background />
      <AppLayout>
        <div className="flex flex-col items-center justify-center text-white">
          <div className="font-sf text-5xl">Reports here</div>
        </div>
      </AppLayout>
    </div>
  );
};
export default Reports;
