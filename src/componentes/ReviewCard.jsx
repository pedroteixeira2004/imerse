import { useEffect, useRef, useState } from "react";
import BBCode from "@bbob/react";
import presetReact from "@bbob/preset-react";
import TimestampConverter from "./timestampConverter";
import like from "../assets/icones/like.png";
import smile from "../assets/icones/smile.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const plugins = [presetReact()];

export default function ReviewCard({ review }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  const maxCollapsedHeight = 140;

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setShowReadMore(contentHeight > maxCollapsedHeight);
    }
  }, [review.review]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const fullHeight = contentRef.current.scrollHeight;

    el.style.transition = "height 0.5s ease";
    el.style.overflow = "hidden";

    if (!isCollapsed) {
      el.style.height = `${fullHeight}px`;
    } else {
      const currentHeight = el.getBoundingClientRect().height;
      el.style.height = `${currentHeight}px`;

      void el.offsetHeight;

      el.style.height = `${maxCollapsedHeight}px`;
    }

    const handleTransitionEnd = () => {
      if (!isCollapsed) {
        el.style.height = "auto";
      }
    };

    el.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      el.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [isCollapsed]);

  return (
    <li
      className="
        mb-8 p-4
        bg-white/10
        backdrop-blur-[15px]
        rounded-2xl
        border
        border-white/30
        shadow-[0_4px_30px_rgba(0,0,0,0.1)]
        text-white
      "
    >
      <div className="m-5 relative">
        <div ref={containerRef}>
          <div
            ref={contentRef}
            className="text-white font-sf text-lg font-regular whitespace-pre-line"
          >
            <BBCode plugins={plugins}>
              {review.review.replace(/\[table\][\s\S]*?\[\/table\]/gi, "")}
            </BBCode>
          </div>
        </div>

        {showReadMore && (
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="
                px-6 py-2
                rounded-full
                bg-white/10
                backdrop-blur-lg
                border border-white/30
                text-white
                font-sf
                font-semibold
                transition-all duration-300
                hover:bg-white/30
                shadow-lg
                hover:[box-shadow:0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]
              "
            >
              {isCollapsed ? (
                <div className="flex items-center">
                  <div className="mr-2">Read more</div>
                  <FaChevronDown />
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="mr-2">Read less</div>
                  <FaChevronUp />
                </div>
              )}
            </button>
          </div>
        )}

        <div className="mt-4 text-lg flex justify-between items-center font-medium">
          <div className="flex flex-col justify-center text-right">
            <div className="flex items-center mb-1">
              <div className="flex items-center">
                <img src={like} alt="like" className="w-6 h-6 mr-2" />
                <p className="text-white font-sf">{review.votes_up}</p>
              </div>
              <div className="flex items-center ml-6">
                <img src={smile} alt="smile" className="w-6 h-6 mr-2" />
                <p className="text-white font-sf">{review.votes_funny}</p>
              </div>
            </div>
            <p className="text-white font-sf">
              Playtime at the review:{" "}
              {Math.round(review.author.playtime_at_review / 60)}h
            </p>
          </div>
          <div className="font-sf text-white">
            <TimestampConverter timestamp={review.timestamp_created} />
          </div>
        </div>
      </div>
    </li>
  );
}
