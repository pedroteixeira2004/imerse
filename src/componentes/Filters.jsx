// src/pages/FiltersPage.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "./Layout";
import Background from "./background";
import LanguageDropdown from "./languageDropdown";
import positive from "../assets/icones/positive.png";
import negative from "../assets/icones/negative.png";
import all from "../assets/icones/all.png";
import Select from "react-select";
const FiltersPage = () => {
  const { appId } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [numPerPage, setNumPerPage] = useState("20");
  const [reviewType, setReviewType] = useState("all");
  const [dayRange, setDayRange] = useState("365");
  const [language, setLanguage] = useState("english");
  const [filter, setFilter] = useState("all");

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const numOptions = [
    { value: "20", label: "20" },
    { value: "40", label: "40" },
    { value: "60", label: "60" },
    { value: "80", label: "80" },
    { value: "100", label: "100" },
  ];
  const languageOptions = [
    { value: "all", label: "All" },
    { value: "english", label: "English" },
    { value: "french", label: "French" },
    { value: "spanish", label: "Spanish" },
    { value: "german", label: "German" },
    { value: "portuguese", label: "Portuguese" },
  ];
  const dayOptions = [
    { value: 7, label: "7 days" },
    { value: 15, label: "15 days" },
    { value: 30, label: "30 days" },
    { value: 60, label: "2 months" },
    { value: 90, label: "3 months" },
    { value: 120, label: "6 months" },
    { value: 365, label: "1 year" },
  ];
  const typeReview = [
    { value: "all", label: "All", image: all },
    { value: "positive", label: "Positive", image: positive },
    { value: "negative", label: "Negative", image: negative },
  ];
  const typeFilter = [
    { value: "recent", label: "Newest first" },
    { value: "updated", label: "Updated recently" },
    { value: "all", label: "Most relevant" },
  ];
  const handleSubmit = () => {
    const query = new URLSearchParams({
      filter: filter,
      num_per_page: numPerPage,
      review_type: reviewType,
      day_range: dayRange,
      language,
    }).toString();

    navigate(`/reviews/${appId}?${query}`);
  };
  const progress = (step / 4) * 100;
  return (
    <div className="">
      <Background />
      <AppLayout>
        <div className="font-sf flex justify-center align-center">
          <div>
            <div className="mt-4">
              <h1 className="text-5xl font-bold text-center text-white">
                Review Filters
              </h1>
              <p className="text-center text-white text-xl mt-2">
                Filters are optional — choose only the ones that apply to your
                analysis.
              </p>
            </div>
            <div className=" shadow-[0_0_20px_rgba(255,255,255,0.2)] outline-none mt-10 ml-10 mr-10 mb-6 card-filters flex">
              <div className="filters-content flex items-center font-sf">
                {step === 1 && (
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
                        onChange={(selectedOption) =>
                          setNumPerPage(selectedOption.value)
                        }
                        placeholder="Select number of reviews"
                        isSearchable={false}
                        menuPortalTarget={document.body} // força o menu para o body
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            backdropFilter: "blur(10px)",
                            webkitBackdropFilter: "blur(10px)",
                            borderRadius: "2rem",
                            border: state.isFocused
                              ? "2px solid rgba(255, 255, 255, 0.5)"
                              : "2px solid rgba(255, 255, 255, 0.2)",
                            boxShadow: "none",
                            padding: "0.5vh 1vw",
                            width: "20vw",
                            height: "7vh",
                            transition: "all 0.3s ease",
                            zIndex: 10,
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "rgba(255, 255, 255, 0.06)",
                            backdropFilter: "blur(80px)",
                            webkitBackdropFilter: "blur(80px)",
                            color: "white",
                            borderRadius: "1rem",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                            marginTop: "8px",
                            overflow: "hidden", // garante que o blur aplique corretamente
                          }),
                          menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999, // garante que fique sobre outros elementos
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
                            color: "rgba(255, 255, 255)",
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
                        }}
                      />
                    </div>
                    <div>
                      <p className="mb-2 font-semibold text-white text-4xl">
                        Reviews Language
                      </p>
                      <p className="text-white mb-6">
                        Select the language in which you want the reviews to
                        analyse.
                      </p>
                      <Select
                        options={languageOptions}
                        onChange={(selectedOption) =>
                          setLanguage(selectedOption.value)
                        }
                        placeholder="Select the language"
                        isSearchable={false}
                        menuPortalTarget={document.body} // força o menu para o body
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            backdropFilter: "blur(10px)",
                            webkitBackdropFilter: "blur(10px)",
                            borderRadius: "2rem",
                            border: state.isFocused
                              ? "2px solid rgba(255, 255, 255, 0.5)"
                              : "2px solid rgba(255, 255, 255, 0.2)",
                            boxShadow: "none",
                            padding: "0.5vh 1vw",
                            width: "20vw",
                            height: "7vh",
                            transition: "all 0.3s ease",
                            zIndex: 10,
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "rgba(255, 255, 255, 0.06)",
                            backdropFilter: "blur(80px)",
                            webkitBackdropFilter: "blur(80px)",
                            color: "white",
                            borderRadius: "1rem",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                            marginTop: "8px",
                            overflow: "hidden", // garante que o blur aplique corretamente
                          }),
                          menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999, // garante que fique sobre outros elementos
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
                            color: "rgba(255, 255, 255)",
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
                        }}
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <p className="mb-2 font-semibold text-white text-4xl">
                      Reviews Period
                    </p>
                    <p className="text-white mb-6">
                      Select the period of time you want the reviews to analyse.
                    </p>
                    <p className="text-white text-2xl font-medium mb-3">
                      Predefined periods
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dayOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setDayRange(option.value)}
                          className={`button-filters px-6 py-1 rounded-3xl border ${
                            dayRange === option.value ? "active" : ""
                          }`}
                        >
                          Last {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <p className="mb-2 font-semibold text-white text-4xl">
                      Type of Review
                    </p>
                    <p className="text-white mb-6">
                      Select the type of review you want to analyse.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {typeReview.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => setReviewType(type.value)}
                          className={`button-filters px-6 py-1 rounded-3xl border ${
                            reviewType === type.value ? "active" : ""
                          }`}
                        >
                          <img src={type.image} className="h-16 w-16" />
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <p className="mb-2 font-semibold text-white text-4xl">
                      Reviews sorting
                    </p>
                    <p className="text-white mb-6">
                      Pick a way to organize and dive into the reviews.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {typeFilter.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setFilter(option.value)}
                          className={`button-filters px-6 py-1 rounded-3xl border ${
                            filter === option.value ? "active" : ""
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navegação dos passos */}
              </div>
            </div>
            <div className="flex justify-between">
              {step > 1 && (
                <button onClick={handleBack} className="button">
                  Back
                </button>
              )}
              {step < 4 && (
                <div className="w-full flex justify-end">
                  <button onClick={handleNext} className="button">
                    Next
                  </button>
                </div>
              )}
              {step === 4 && (
                <div className="w-full flex justify-end">
                  <button onClick={handleSubmit} className="button">
                    Apply filters
                  </button>
                </div>
              )}
            </div>
            <div className="justify-center flex mt-10">
              <div className="barra-progresso rounded-full overflow-hidden mb-8 justify-center">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background:
                      "linear-gradient(135deg, #b84aff, #d370ff, #8c4dff)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default FiltersPage;
