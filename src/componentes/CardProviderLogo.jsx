import React from "react";
import visaLogo from "../assets/card_providers/Visa.svg";
import mastercardLogo from "../assets/card_providers/mastercard.svg";
import amexLogo from "../assets/card_providers/american_card.png";

const CardProviderLogo = ({ provider }) => {
  const logos = {
    visa: visaLogo,
    mastercard: mastercardLogo,
    "american express": amexLogo,
  };

  const logo = logos[provider?.toLowerCase()];

  if (!logo) return null;

  return (
    <img src={logo} alt={provider} className="w-10 mb-2" title={provider} />
  );
};

export default CardProviderLogo;
