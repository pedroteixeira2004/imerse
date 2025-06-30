import React from "react";
import { useNavigate } from "react-router-dom";
import gradiente from "../../assets/imagens/gradiente_cards.svg";
import fallbackImage from "../../assets/imagens/fundo_jogos2.png";
import CartButton from "./CartButton";
import DownloadButton from "./DownloadButton";

const ReportCard = ({ report, purchasedReports = [] }) => {
  const navigate = useNavigate();
  const isPurchased = purchasedReports.includes(report.id);

  return (
    <div
      onClick={() =>
        navigate(`/report-details/${report.id}`, {
          state: {
            id: report.id,
            title: report.title,
            background: report.image,
            year: report.year,
            price: report.price,
            description: report.description,
            included: report.included,
            link: report.link,
            image: report.image,
          },
        })
      }
      className="h-80 w-80 rounded-3xl overflow-hidden transform transition duration-300 hover:scale-105 relative border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:border-white/50 
      hover:shadow-[0_6px_40px_rgba(255,255,255,0.2)] cursor-pointer"
    >
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${report.image || fallbackImage})`,
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center z-10"
        style={{
          backgroundImage: `url(${gradiente})`,
        }}
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-4 mt-8">
        <h3 className="text-2xl font-semibold text-white">
          {report.title || "Untitled"}
        </h3>
        <span className="text-xl text-white mt-3">{report.year}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-between items-center m-1">
        <div className="z-20 flex flex-col p-4">
          <h3 className="text-xl font-regular text-white mr-3 font-medium">
            {isPurchased ? "Purchased" : `${report.price} €`}
          </h3>
        </div>

        <div className="mr-3">
          {isPurchased ? (
            <DownloadButton link={report.link} size="small" />
          ) : (
            <CartButton report={report} size="small" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
