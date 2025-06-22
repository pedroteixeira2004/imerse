import React, { useState } from "react";
import OverlayAddCard from "./OverlayAddCard";
import add_card from "../assets/icones/add_card.png";
import all_providers from "../assets/card_providers/all.png";

function AddCardButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="bg-white/20 p-6 rounded-xl border border-white/30 text-white font-bold py-3 text-xl w-full flex items-center gap-4 justify-center h-18 mt-4 hover:bg-white/20 hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)] transition-all"
        onClick={() => setOpen(true)}
      >
        <img src={add_card} alt="add card" className="h-6 w-6" />
        Add Card
        <div>
          <img
            src={all_providers}
            alt="all card providers"
            className="h-9 w-auto"
          />
        </div>
      </button>

      <OverlayAddCard isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default AddCardButton;
