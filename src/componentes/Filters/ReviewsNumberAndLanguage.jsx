import React from "react";
import Select from "react-select";
import supportedLocales from "../SteamLocales";

const ReviewsNumberAndLanguage = ({
  numPerPage,
  setNumPerPage,
  language,
  setLanguage,
}) => {
  const numOptions = [
    { value: "20", label: "20" },
    { value: "40", label: "40" },
    { value: "60", label: "60" },
    { value: "80", label: "80" },
    { value: "100", label: "100" },
  ];

  const languageOptions = Object.entries(supportedLocales).map(
    ([key, value]) => ({
      value: key,
      label: value.englishName,
    })
  );

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
      backdropFilter: "blur(15px)",
      WebkitBackdropFilter: "blur(15px)", // correção de capital W
      borderRadius: "2rem",
      border: state.isFocused
        ? "2px solid rgba(255, 255, 255, 0.5)"
        : "2px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      padding: "0.5vh 1vw",
      width: "20vw",
      height: "7vh",
      transition: "all 0.3s ease",
      zIndex: 10,
      color: "white",
    }),
    menu: (base) => ({
      ...base,
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
      backdropFilter: "blur(25px)",
      WebkitBackdropFilter: "blur(25px)",
      color: "white",
      borderRadius: "1rem",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      marginTop: "8px",
      overflow: "hidden",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "rgba(255, 255, 255, 0.15)"
        : "transparent",
      color: "white",
      borderRadius: "0.75rem",
      cursor: "pointer",
      padding: "12px 20px",
      transition: "all 0.2s ease",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: "1rem",
      fontWeight: "400",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused
        ? "rgba(255,255,255,0.8)"
        : "rgba(255,255,255,0.5)",
      transition: "color 0.2s ease",
    }),
  };

  return (
    <div className="items-center">
      <div className="mb-7">
        <p className="mb-2 font-semibold text-white text-4xl">
          Number of reviews
        </p>
        <p className="text-white mb-6">
          Select the number of reviews you want to analyse.
        </p>
        <Select
          options={numOptions}
          onChange={(selected) => setNumPerPage(selected.value)}
          placeholder="Select number of reviews"
          isSearchable={false}
          styles={customStyles}
          menuPortalTarget={document.body}
        />
      </div>
      <div>
        <p className="mb-2 font-semibold text-white text-4xl">
          Reviews Language
        </p>
        <p className="text-white mb-6">
          Select the language in which you want the reviews to analyse.
        </p>
        <Select
          options={languageOptions}
          value={languageOptions.find((opt) => opt.value === language)}
          onChange={(selected) => setLanguage(selected.value)}
          placeholder="Select the language"
          styles={customStyles}
          menuPortalTarget={document.body}
        />
      </div>
    </div>
  );
};

export default ReviewsNumberAndLanguage;
