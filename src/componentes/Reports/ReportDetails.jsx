import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Background from "../background";
import AppLayout2 from "../Layout2";

const ReportDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const report = location.state;

  if (!report) {
    // Se o state não veio corretamente
    return (
      <div className="text-white text-center mt-20">
        <h1 className="text-2xl">No report data found.</h1>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-white text-black rounded-full font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <Background />
      <AppLayout2>
        <div className="text-white m-10 font-sf">
          <h1 className="text-5xl font-bold mb-4">{report.title}</h1>
          <div className="text-lg mb-2">
            <strong>Year:</strong> {report.year}
          </div>
          <div className="text-lg mb-6">
            <strong>Price:</strong> {report.price} €
          </div>

          <p className="text-white text-xl">{report.description}</p>
        </div>
      </AppLayout2>
    </div>
  );
};

export default ReportDetails;
