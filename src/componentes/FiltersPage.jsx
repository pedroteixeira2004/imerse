// src/pages/FiltersPage.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "./Layout";
import Background from "./background";
import ReviewsNumberAndLanguage from "./Filters/ReviewsNumberAndLanguage";
import TimePeriod from "./Filters/TimePeriod";
import Playtime from "./Filters/Playtime";
import PurchaseCharacter from "./Filters/PurchaseCharacter";
import TypeReview from "./Filters/TypeReview";
import Filter from "./Filters/Filter";
import BackButton from "./BackButton";
const FiltersPage = () => {
  const { appId } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [numPerPage, setNumPerPage] = useState("");
  const [reviewType, setReviewType] = useState("");
  const [dayRange, setDayRange] = useState("");
  const [language, setLanguage] = useState("");
  const [filter, setFilter] = useState("");
  const [minPlaytime, setMinPlaytime] = useState("");
  const [maxPlaytime, setMaxPlaytime] = useState("");
  const [purchaseType, setPurchaseType] = useState("");
  const [sorting, setSorting] = useState("");

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const handleSubmit = () => {
    const params = {
      num_per_page: numPerPage,
      review_type: reviewType,
      day_range: dayRange,
      language: language,
      min_playtime: minPlaytime,
      max_playtime: maxPlaytime,
      purchase_type: purchaseType,
    };

    if (filter) params.filter = filter;
    if (sorting) params.sorting = sorting;

    const query = new URLSearchParams(params).toString();

    navigate(`/reviews/${appId}?${query}`);
  };

  const progress = (step / 6) * 100;
  return (
    <div className="">
      <Background />
      <AppLayout>
        <div className="font-sf flex justify-center align-center">
          <div>
            <div className="mt-4">
              <div className="flex items-center justify-center">
                <BackButton />
                <h1 className="text-5xl font-bold text-center text-white">
                  Review Filters
                </h1>
              </div>
              <p className="text-center text-white text-xl mt-2">
                Filters are optional — choose only the ones that apply to your
                analysis.
              </p>
            </div>
            <div className="outline-none mt-10 ml-10 mr-10 mb-6 card-filters flex">
              <div className="filters-content flex items-center font-sf">
                {step === 1 && (
                  <ReviewsNumberAndLanguage
                    numPerPage={numPerPage}
                    setNumPerPage={setNumPerPage}
                    language={language}
                    setLanguage={setLanguage}
                  />
                )}

                {step === 2 && (
                  <TimePeriod dayRange={dayRange} setDayRange={setDayRange} />
                )}

                {step === 3 && (
                  <Playtime
                    minPlaytime={minPlaytime}
                    setMinPlaytime={setMinPlaytime}
                    maxPlaytime={maxPlaytime}
                    setMaxPlaytime={setMaxPlaytime}
                  />
                )}
                {step === 4 && (
                  <TypeReview
                    reviewType={reviewType}
                    setReviewType={setReviewType}
                  />
                )}

                {step === 5 && (
                  <PurchaseCharacter
                    purchaseType={purchaseType}
                    setPurchaseType={setPurchaseType}
                  />
                )}

                {step === 6 && (
                  <Filter
                    filter={filter}
                    setFilter={setFilter}
                    sorting={sorting}
                    setSorting={setSorting}
                  />
                )}
              </div>
            </div>
            <div className="flex justify-between">
              {step > 1 && (
                <button onClick={handleBack} className="button">
                  Back
                </button>
              )}
              {step < 6 && (
                <div className="w-full flex justify-end">
                  <button onClick={handleNext} className="button">
                    Next
                  </button>
                </div>
              )}
              {step === 6 && (
                <div className="w-full flex justify-end">
                  <button onClick={handleSubmit} className="button">
                    Apply filters
                  </button>
                </div>
              )}
            </div>
            <div className="justify-center flex mt-10 mr-10 ml-10">
              <div className="barra-progresso rounded-full overflow-hidden mb-8 justify-center">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background:
                      "linear-gradient(135deg, #b84aff, #d370ff, #8c4dff)",
                    boxShadow:
                      "0 0 15px rgba(184, 74, 255, 0.4), 0 0 25px rgba(211, 112, 255, 0.3)",
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
