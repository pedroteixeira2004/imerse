import { Range } from "react-range";
import { useState } from "react";
const PurchaseCharacter = ({
  purchaseType,
  setPurchaseType,
  characters,
  setCharacters,
}) => {
  const purchaseOptions = [
    { value: "", label: "All" },
    { value: "true", label: "Purchased on Steam" },
    { value: "false", label: "Other way" },
  ];
  return (
    <div>
      <p className="mb-2 font-semibold text-white text-4xl">Purchase type</p>
      <p className="text-white mb-6">Select how the game was purchased.</p>

      <div className="flex flex-wrap gap-2">
        {purchaseOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setPurchaseType(option.value)}
            className={`button-filters px-6 py-1 rounded-3xl border font-medium ${
              purchaseType === option.value ? "active" : ""
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
export default PurchaseCharacter;
