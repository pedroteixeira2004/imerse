import React, { useRef, useState } from "react";
import gradiente from "../../assets/imagens/gradiente_game_details.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FiPlay, FiPause } from "react-icons/fi";
import sentiment_analysis from "../../assets/imagens/sentiment_analysis.png";
import library from "../../assets/imagens/library.png";
import reports from "../../assets/imagens/reports.png";
import compare from "../../assets/imagens/compare.png";

const cards = [
  {
    title: "AI powered analysis",
    content:
      "IMERSE leverages Google Gemini-powered artificial intelligence to analyze player feedback, detecting sentiment, emotions, recurring themes, satisfaction levels, and key terms. It also uncovers major trends and common pain points across thousands of reviews.",
    image: sentiment_analysis,
  },
  {
    title: "Game comparison tool",
    content:
      "Easily compare two games using key metrics like Metacritic scores, release dates, genres, PC specs, and review sentiments. For a deeper insight, let our AI analyze the data and reviews to give you a smarter, more detailed comparison.",
    image: compare,
  },
  {
    title: "Your personal library",
    content:
      "Save your favorite games and reports to your personal library for easy access during future research. Come back anytime to revisit past analyses or queue games for future comparisons.",
    image: library,
  },
  {
    title: "Purchase reports",
    content:
      "Access and purchase in-depth reports crafted to help you make informed decisions, enhance your knowledge, and support your professional growth. Whether you're a researcher, developer, or enthusiast, these reports provide valuable insights tailored to your goals.",
    image: reports,
  },
];

const Section7 = () => {
  const progressRef = useRef(null);
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    if (!swiperRef.current) return;
    if (isPlaying) {
      swiperRef.current.autoplay.stop();
      setIsPlaying(false);
    } else {
      swiperRef.current.autoplay.start();
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative text-white overflow-hidden h-[100vh] bg-[#0D1060] flex flex-col items-center justify-center">
      <img
        src={gradiente}
        alt="gradiente"
        className="absolute bottom-0 left-0 w-full z-0 pointer-events-none"
      />
      <div className="text-white font-sf text-6xl mb-5 font-bold ">
        Other features
      </div>
      <div className="relative z-10 w-full max-w-6xl px-4">
        {/* Custom arrows */}
        <div className="absolute top-1/2 -left-14 transform -translate-y-1/2 z-20 cursor-pointer">
          <button className="custom-prev text-white text-6xl flex items-center justify-center">
            <BiChevronLeft />
          </button>
        </div>
        <div className="absolute top-1/2 -right-14 transform -translate-y-1/2 z-20 cursor-pointer">
          <button className="custom-next text-white text-6xl flex items-center justify-center">
            <BiChevronRight />
          </button>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onAutoplayTimeLeft={(_, time, progress) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${(1 - progress) * 100}%`;
            }
          }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <div
                className="bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
              border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-2xl p-10 h-[70vh] flex items-center justify-between w-full"
              >
                <div className="w-[50%]">
                  <h3 className="text-5xl font-bold mb-6">{card.title}</h3>
                  <p className="text-xl">{card.content}</p>
                </div>
                <div className="flex items-center justify-center w-[50%]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-96 h-auto object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Barra de progresso */}
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mt-8">
          <div
            ref={progressRef}
            className="h-full button2 transition-all duration-[50ms]"
            style={{ width: "100%" }}
          ></div>
        </div>

        {/* Botão play/pause */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
            className="text-white flex items-center rounded-full px-6 py-2 group transition-all duration-300 
    border border-white/30 backdrop-blur-[15px] bg-gradient-to-br from-white/15 to-white/5
    hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
          >
            {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
            <span
              className="ml-0 max-w-0 overflow-hidden opacity-0 
      group-hover:opacity-100 group-hover:ml-3 group-hover:max-w-[160px] 
      transition-all duration-300 whitespace-nowrap font-sf text-lg font-bold"
            >
              {isPlaying ? "Pause autoplay" : "Play autoplay"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section7;
