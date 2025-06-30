import React from "react";

const TimePeriod = ({ dayRange, setDayRange }) => {
  const dayOptions = [
    { value: 7, label: "7 days" },
    { value: 15, label: "15 days" },
    { value: 30, label: "30 days" },
    { value: 60, label: "2 months" },
    { value: 90, label: "3 months" },
    { value: 180, label: "6 months" },
    { value: 365, label: "1 year" },
  ];
  return (
    <div>
      <p className="mb-2 font-semibold text-white text-4xl">Reviews Period</p>
      <p className="text-white mb-6">
        Select the period of time you want the reviews to analyze.
      </p>

      <p className="text-white text-2xl font-medium mb-3">Predefined periods</p>

      <div className="flex flex-wrap gap-2">
        {dayOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setDayRange(option.value)}
            className={`button-filters px-6 py-1 rounded-3xl border font-medium ${
              dayRange === option.value ? "active" : ""
            }`}
          >
            Last {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimePeriod;
