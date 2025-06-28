import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import imerse_logo from "../assets/icones/imerse_icon.png";
import { FiChevronDown } from "react-icons/fi";
import logo2 from "../assets/imagens/logo2.png";
import fundo_jogos from "../assets/imagens/fundo_jogos3.png";
import BotaoTopo from "./BotaoTopo";
import search from "../assets/icones/search.png";
import Typewriter from "./Typewriter";
import gradiente from "../assets/imagens/gradiente_game_details.svg";
import Section3 from "./SectionsExplanationPage/Section3";
import Section4 from "./SectionsExplanationPage/Section4";
import Section5 from "./SectionsExplanationPage/Section5";
import Section6 from "./SectionsExplanationPage/Section6";
import Section7 from "./SectionsExplanationPage/Section7";
import Section8 from "./SectionsExplanationPage/Section8";
import Section9 from "./SectionsExplanationPage/Section9";
import Background from "./background";
const ExplanationPage = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const scrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };
  return (
    <div
      ref={scrollContainerRef}
      className="font-sf h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      <div
        className="snap-start"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Background />
        <header>
          <div className="flex text-2xl font-bold items-center justify-between">
            <div className="m-5">
              <img src={imerse_logo} alt="imerse logo" className="h-14" />
            </div>
            <div className="flex gap-10 pr-5 m-5 text-white">
              <div
                onClick={() => navigate("/login")}
                className="cursor-pointer transition-transform duration-300 hover:scale-125"
              >
                Login
              </div>
              <div
                onClick={() => navigate("/signup")}
                className="cursor-pointer transition-transform duration-300 hover:scale-125"
              >
                Sign up
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo centralizado */}
        <main className="flex-grow flex justify-center items-center">
          <div className="text-6xl text-white font-sf font-bold text-center">
            <p>Decode the feedback.</p>
            <p>Dominate the game.</p>
            <button
              className="button2 text-2xl px-10 py-2 rounded-full mt-10"
              onClick={scrollDown}
            >
              Discover
            </button>
            <FiChevronDown
              size={60}
              color="white"
              className="mt-10 mx-auto animate-bounceMouse cursor-pointer"
              onClick={scrollDown}
            />
          </div>
        </main>
      </div>
      <section
        style={{ height: "100vh", backgroundColor: "#0D1060" }}
        className="snap-start flex text-white items-center relative overflow-hidden"
      >
        <img
          src={gradiente}
          alt="gradiente"
          className="absolute bottom-0 left-0 w-full z-0 pointer-events-none"
        />
        <div className="flex-1 mx-20 flex items-center justify-between z-10">
          {/* Texto */}
          <div className="max-w-2xl">
            <div className="text-6xl font-bold mb-6">About the platform</div>
            <div className="text-2xl">
              IMERSE is a smart review analysis platform designed to help
              studios, researchers and developers explore and understand player
              experiences through game reviews. Powered by data-driven insights
              and AI, it transforms player feedback into strategic information.
            </div>
            <p className="text-2xl font-semibold mt-5">
              Keep scrolling to learn more about IMERSE
            </p>
          </div>

          {/* Imagem com margem à direita */}
          <div className="mr-10">
            <img src={logo2} alt="logo 2" className="h-[70vh] w-auto" />
          </div>
        </div>
      </section>
      <section
        style={{ height: "100vh", backgroundColor: "#3D0D60" }}
        className="snap-start relative overflow-hidden"
      >
        {/* Parte superior com imagem de fundo */}
        <div className="h-[40vh]">
          <img
            src={fundo_jogos}
            alt="fundo jogos"
            className="absolute top-0 left-0 w-full z-0"
          />

          {/* Barra de pesquisa centrada */}
          <div className="absolute top-[8rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div
              className="barra_pesquisa pl-6 pr-10 py-3 text-white text-lg rounded-full 
        bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
        border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        outline-none flex gap-2 items-center transition-all duration-500"
            >
              <img
                src={search}
                alt="Search Icon"
                className="mr-2 w-6 h-6 opacity-80"
              />
              <Typewriter
                words={[
                  "God of War",
                  "Spider Man 2",
                  "God of War Ragnarok",
                  "The Last of Us",
                  "Detroit Become Human",
                ]}
                speed={120}
                pause={1000}
                className="text-white/70 font-sf"
              />
            </div>
          </div>
        </div>

        {/* Parte inferior com imagem gradiente no fundo */}
        <div className="relative flex justify-center items-center h-[60vh] text-white">
          {/* Imagem gradiente colada em baixo */}
          <img
            src={gradiente}
            alt="gradiente"
            className="absolute bottom-0 left-0 w-full z-0 pointer-events-none"
          />

          {/* Conteúdo por cima da imagem */}
          <div className="relative z-10 text-center">
            <div className="font-bold text-6xl">1. Search your game</div>
            <div className="mt-8 text-2xl max-w-5xl mx-auto">
              Start by entering the name of the game you want to analyze. The
              platform connects to live Steam data to retrieve all games and
              DLCs, along with relevant details, player reviews, and key
              statistics.
            </div>
          </div>
        </div>
      </section>
      <div className="snap-start">
        <Section3 />
      </div>
      <div className="snap-start">
        <Section4 />
      </div>
      <div className="snap-start">
        <Section5 />
      </div>
      <div className="snap-start">
        <Section6 />
      </div>
      <div className="snap-start">
        <Section7 />
      </div>
      <div className="snap-start">
        <Section8 />
      </div>
      <div className="snap-start">
        <Section9 />
      </div>
      <BotaoTopo />
    </div>
  );
};
export default ExplanationPage;
