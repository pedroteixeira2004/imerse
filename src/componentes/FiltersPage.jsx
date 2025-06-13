// src/pages/FiltersPage.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "./Layout";
import Background from "./background";
import positive from "../assets/icones/positive.png";
import negative from "../assets/icones/negative.png";
import all from "../assets/icones/all.png";
import ReviewsNumberAndLanguage from "./Filters/ReviewsNumberAndLanguage";
import TimePeriod from "./Filters/TimePeriod";
import Playtime from "./Filters/Playtime";
const FiltersPage = () => {
  const { appId } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [numPerPage, setNumPerPage] = useState("20");
  const [reviewType, setReviewType] = useState("all");
  const [dayRange, setDayRange] = useState("365");
  const [language, setLanguage] = useState("english");
  const [filter, setFilter] = useState("all");
  const [minPlaytime, setMinPlaytime] = useState("");
  const [maxPlaytime, setMaxPlaytime] = useState("");

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
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
  const progress = (step / 5) * 100;
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
                          className={`button-filters px-6 py-1 rounded-3xl border font-medium ${
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

                {step === 5 && (
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
                          className={`button-filters px-6 py-1 rounded-3xl border font-medium ${
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
              {step < 5 && (
                <div className="w-full flex justify-end">
                  <button onClick={handleNext} className="button">
                    Next
                  </button>
                </div>
              )}
              {step === 5 && (
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
