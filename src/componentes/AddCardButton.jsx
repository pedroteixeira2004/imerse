import React, { useState } from "react";
import OverlayAddCard from "./OverlayAddCard";
import add_card from "../assets/icones/add_card.png";
import all_providers from "../assets/card_providers/all.png";

function AddCardButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="bg-white/20 p-6 rounded-xl border border-white/30 text-white font-bold py-3 text-xl w-full flex items-center gap-4 justify-center h-18 mt-4"
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
