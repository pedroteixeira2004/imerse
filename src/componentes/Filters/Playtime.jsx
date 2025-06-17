import { useState, useEffect } from "react";
import Select from "react-select";

const playtimeOptions = [
  { value: "", label: "No limit" },
  { value: "0", label: "0 hours" },
  { value: "1", label: "1 hour" },
  { value: "5", label: "5 hours" },
  { value: "10", label: "10 hours" },
  { value: "20", label: "20 hours" },
  { value: "50", label: "50 hours" },
  { value: "100", label: "100 hours" },
  { value: "200", label: "200 hours" },
];

const Playtime = ({
  minPlaytime,
  setMinPlaytime,
  maxPlaytime,
  setMaxPlaytime,
}) => {
  const [error, setError] = useState("");
  const [filteredMinOptions, setFilteredMinOptions] = useState(playtimeOptions);
  const [filteredMaxOptions, setFilteredMaxOptions] = useState(playtimeOptions);

  useEffect(() => {
    if (
      minPlaytime !== "" &&
      maxPlaytime !== "" &&
      Number(minPlaytime) > Number(maxPlaytime)
    ) {
      setError("Minimum playtime cannot be greater than maximum playtime.");
    } else {
      setError("");
    }

    // Filtrar opções de maxPlaytime com base no minPlaytime
    const filteredMax = playtimeOptions.filter((option) => {
      if (minPlaytime === "") return true; // mostrar todas
      return option.value === "" || Number(option.value) >= Number(minPlaytime);
    });
    setFilteredMaxOptions(filteredMax);

    // Filtrar opções de minPlaytime com base no maxPlaytime
    const filteredMin = playtimeOptions.filter((option) => {
      if (maxPlaytime === "") return true; // mostrar todas
      return option.value === "" || Number(option.value) <= Number(maxPlaytime);
    });
    setFilteredMinOptions(filteredMin);
  }, [minPlaytime, maxPlaytime]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
      backdropFilter: "blur(15px)",
      WebkitBackdropFilter: "blur(15px)",
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
    <div>
      <p className="mb-2 font-semibold text-white text-4xl">Playtime</p>
      <p className="text-white mb-6">
        Select the period of hours the user had played at the time of the
        review.
      </p>

      <div>
        <p className="text-white text-2xl font-medium mb-3">Minimum</p>
        <Select
          value={filteredMinOptions.find(
            (option) => option.value === minPlaytime
          )}
          options={filteredMinOptions}
          onChange={(selected) => setMinPlaytime(selected.value)}
          placeholder="Select the minimum playtime"
          isSearchable={false}
          styles={customStyles}
          menuPortalTarget={document.body}
        />
      </div>

      <div className="mt-4">
        <p className="text-white text-2xl font-medium mb-3">Maximum</p>
        <Select
          value={filteredMaxOptions.find(
            (option) => option.value === maxPlaytime
          )}
          options={filteredMaxOptions}
          onChange={(selected) => setMaxPlaytime(selected.value)}
          placeholder="Select the maximum playtime"
          isSearchable={false}
          styles={customStyles}
          menuPortalTarget={document.body}
        />
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Playtime;
