import React from "react";
import MetacriticScore from "./MetacriticScore";
import PegiRating from "./PegiRating";

const CompareInfo = ({ game, summary }) => {
  if (!game) return null;
  if (!summary) return null;
  const summaryFinal = summary.review_summary;
  const totalReviews = summaryFinal.total_reviews;
  const totalPositive = summaryFinal.total_positive;
  const totalNegative = summaryFinal.total_negative;
  const percentagePositive = Math.round((totalPositive / totalReviews) * 100);
  const percentageNegative = Math.round((totalNegative / totalReviews) * 100);
  console.log(summaryFinal);
  return (
    <div
      className="bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-white p-8 w-[40rem] font-sf"
    >
      <img
        src={game.header_image}
        alt={game.name}
        className="rounded-lg mb-4 w-full object-cover h-44"
      />
      <h2 className="text-4xl font-bold mb-2">{game.name}</h2>

      <div className="grid grid-cols-2 gap-3">
        {/* Product */}
        <div>
          <div className="text-2xl font-medium">Product</div>
          <div className="text-xl font-regular">{game.type}</div>
        </div>

        {/* Release Date */}
        <div>
          <div className="text-2xl font-medium">Release date</div>
          <div>{game.release_date?.date || "Not available"}</div>
        </div>

        {/* Developers */}
        <div>
          <div className="text-2xl font-medium">Developers</div>
          <div>{game.developers?.join(", ") || "Not available"}</div>
        </div>

        {/* Publishers */}
        <div>
          <div className="text-2xl font-medium">Publishers</div>
          <div>
            {game.publishers?.length
              ? game.publishers.join(", ")
              : "Not available"}
          </div>
        </div>

        {/* Metacritic */}
        <div>
          <div className="text-2xl font-medium">Metacritic</div>
          {game.metacritic?.score ? (
            <a
              href={game.metacritic.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <MetacriticScore score={game.metacritic.score} />
            </a>
          ) : (
            <div className="text-white/60 text-lg">Not available</div>
          )}
        </div>

        {/* PEGI */}
        <div>
          <div className="text-2xl font-medium">Age restriction</div>
          {game.ratings?.pegi?.rating ? (
            <div className="flex items-center gap-4">
              <div className="h-11 w-11">
                <PegiRating rating={game.ratings.pegi.rating} />
              </div>
              <div>{game.ratings.pegi.descriptors || "No descriptors"}</div>
            </div>
          ) : (
            <div className="text-white/60 text-lg">Not available</div>
          )}
        </div>

        {/* Price */}
        <div>
          <div className="text-2xl font-medium">Price</div>
          <div>
            {game.price_overview?.final_formatted ? (
              <div>{game.price_overview.final_formatted}</div>
            ) : (
              <div className="text-white/60 text-lg">Not available</div>
            )}
          </div>
        </div>

        {/* Genres */}
        <div>
          <div className="text-2xl font-medium">Genres</div>
          <div>
            {game.genres?.length > 0 ? (
              <ul className="list-disc list-inside">
                {game.genres.map((genre) => (
                  <li key={genre.id}>{genre.description}</li>
                ))}
              </ul>
            ) : (
              <p className="text-white/60">No genres available</p>
            )}
          </div>
        </div>

        {/* Minimum requirements */}
        <div>
          <div className="text-2xl font-medium">Minimum requirements</div>
          <div>
            {game.pc_requirements?.minimum ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: game.pc_requirements.minimum,
                }}
              />
            ) : (
              <p className="text-white/60">Not available</p>
            )}
          </div>
        </div>

        {/* Recommended requirements */}
        <div>
          <div className="text-2xl font-medium">Recommended requirements</div>
          <div>
            {game.pc_requirements?.recommended ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: game.pc_requirements.recommended,
                }}
              />
            ) : (
              <p className="text-white/60">Not available</p>
            )}
          </div>
        </div>
        <div>
          <div className="text-2xl font-medium">Total reviews</div>
          <div>
            {summaryFinal?.total_reviews ? (
              <div>{summaryFinal.total_reviews}</div>
            ) : (
              <p className="text-white/60">Not available</p>
            )}
          </div>
        </div>
        <div>
          <div className="text-2xl font-medium">Overall reviews</div>
          <div>
            {summaryFinal?.review_score_desc ? (
              <div>{summaryFinal.review_score_desc}</div>
            ) : (
              <p className="text-white/60">Not available</p>
            )}
          </div>
        </div>
        <div>
          <div className="text-2xl font-medium">Positive Reviews</div>
          <div>
            {totalPositive ? (
              <div>
                {percentagePositive}% ({totalPositive})
              </div>
            ) : (
              <p className="text-white/60">Not available</p>
            )}
          </div>
        </div>
        <div>
          <div className="text-2xl font-medium">Negative Reviews</div>
          <div>
            {totalNegative ? (
              <div>
                {percentageNegative}% ({totalNegative})
              </div>
            ) : (
              <p className="text-white/60">Not available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareInfo;
