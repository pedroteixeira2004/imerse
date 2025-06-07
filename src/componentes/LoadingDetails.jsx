import React from "react";
import Background from "./background";
import { BeatLoader } from "react-spinners";
import Logo from "../assets/imerselogo_white.png";

const LoadingDetails = () => {
  return (
    <div className="">
      <Background />
      <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center">
        <div className="mt-6">
          <img src={Logo} alt="Logo" className="mb-6 logo_loading" />
        </div>
        <BeatLoader color="#ffffff" size={50} className="mb-6 mt-6" />
        <div className="text-white font-sf text-center text-3xl">
          Diving into the game. Wait a moment.
        </div>
      </div>
    </div>
  );
};

export default LoadingDetails;
