import React from "react";
import { useNavigate } from "react-router-dom";
import Background from "./background";
import AppLayout from "./Layout";
import ReportsSearchBar from "./Reports/ReportsSearchBar";
const Reports = () => {
  return (
    <div>
      <Background />
      <AppLayout>
        <div className="flex flex-col items-center justify-center text-white">
          <div className="font-sf text-5xl font-bold text-center w-7/12">
            Get the industry insights and level up your game
          </div>
          <div className="text-3xl font-sf mt-8 w-7/12 text-center">
            Access and purchase detailed reports designed to support informed
            decisions and professional growth.
          </div>
          <div className="mt-8">
            <ReportsSearchBar />
          </div>
        </div>
      </AppLayout>
    </div>
  );
};
export default Reports;
