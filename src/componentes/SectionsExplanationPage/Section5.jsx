import React from "react";
import gradiente from "../../assets/imagens/gradiente_game_details.svg";

const reviews = [
  "Amazing gameplay and visuals!",
  "Too many microtransactions.",
  "One of the best stories I've ever experienced.",
  "Great mechanics but needs balancing.",
  "Beautiful soundtrack and voice acting.",
  "Bugs made it unplayable at launch.",
  "Loved the characters and world-building.",
  "UI feels clunky and outdated.",
  "Surprisingly addictive and fun!",
  "Crash issues after the latest update.",
  "Multiplayer is chaotic but enjoyable.",
  "Why is there no FOV slider?",
  "Boss fights are genuinely thrilling.",
  "I’ve sunk 80+ hours and still not bored.",
  "Repetitive missions with little variation.",
  "Level design is clever and rewarding.",
];
const reviews2 = [
  "Absolutely stunning graphics and design.",
  "Game crashes frequently on my setup.",
  "The story kept me hooked from start to finish.",
  "Needs more variety in enemy types.",
  "Soundtrack perfectly matches the mood.",
  "Multiplayer matchmaking is frustrating.",
  "The controls are smooth and intuitive.",
  "Too many bugs still need fixing.",
  "Addictive gameplay loop that’s hard to put down.",
  "UI could be more user-friendly.",
  "Love the dynamic weather effects.",
  "Levels feel too linear and predictable.",
  "Customization options are fantastic.",
  "Voice lines sometimes feel out of place.",
  "Great balance between challenge and fun.",
  "The community is very supportive.",
];
const reviews3 = [
  "Crafting system is deep and rewarding.",
  "Some quests are repetitive and boring.",
  "This game sets a new standard for the genre.",
  "In-game economy feels fair.",
  "Graphics optimization needs work.",
  "Enemies have great AI behavior.",
  "The ending left me wanting more.",
  "Replay value is excellent.",
  "The map design is expansive and detailed.",
  "Skill progression feels natural.",
  "I found several hidden easter eggs.",
  "The story DLCs are a nice bonus.",
  "I can’t wait for the sequel.",
];
const reviews4 = [
  "It feels like a mobile game port.",
  "Finally, a game that respects my time.",
  "Too grindy without paying.",
  "One patch away from greatness.",
  "Incredible atmosphere and lighting.",
  "Inventory management is a nightmare.",
  "Combat system feels responsive and fresh.",
  "Story pacing is way too slow.",
  "Voice acting deserves an award.",
  "Missed opportunity with side quests.",
  "It's Skyrim with guns. And I love it.",
  "Enemies are just bullet sponges.",
  "I refunded after 30 minutes.",
  "Worth every penny.",
];
const reviews5 = [
  "Innovative gameplay that keeps things fresh.",
  "Sometimes the controls feel a bit clunky.",
  "Fantastic world-building and lore.",
  "Needs more diverse side quests.",
  "The graphics are breathtaking on ultra settings.",
  "Multiplayer lobbies take too long to fill.",
  "Excellent character customization options.",
  "Performance drops in busy areas.",
  "The soundtrack is absolutely phenomenal.",
  "Some story moments felt rushed.",
  "Combat mechanics are smooth and satisfying.",
  "UI design is clean but could be more intuitive.",
  "Amazing attention to detail in environments.",
  "Occasional glitches but nothing game-breaking.",
];

function Section5() {
  return (
    <section className="relative text-white overflow-hidden h-[100vh] bg-[#0D1060]">
      <div className="h-[40vh] flex flex-col justify-center gap-6 relative">
        <div className="overflow-hidden w-full whitespace-nowrap">
          <div
            className="inline-block animate-scrollLeft text-2xl font-medium"
            style={{ minWidth: "200%" }}
          >
            {[...reviews, ...reviews].map((r, i) => (
              <span key={i} className="mx-8 inline-block min-w-[150px]">
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden w-full whitespace-nowrap">
          <div
            className="inline-block animate-scrollRight text-2xl font-medium"
            style={{ minWidth: "200%" }}
          >
            {[...reviews2, ...reviews2].map((r, i) => (
              <span key={i} className="mx-8 inline-block min-w-[150px]">
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden w-full whitespace-nowrap">
          <div
            className="inline-block animate-scrollLeft text-2xl font-medium"
            style={{ minWidth: "200%" }}
          >
            {[...reviews3, ...reviews3].map((r, i) => (
              <span key={i} className="mx-8 inline-block min-w-[150px]">
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden w-full whitespace-nowrap">
          <div
            className="inline-block animate-scrollRight text-2xl font-medium"
            style={{ minWidth: "200%" }}
          >
            {[...reviews4, ...reviews4].map((r, i) => (
              <span key={i} className="mx-8 inline-block min-w-[150px]">
                {r}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden w-full whitespace-nowrap">
          <div
            className="inline-block animate-scrollLeft text-2xl font-medium"
            style={{ minWidth: "200%" }}
          >
            {[...reviews5, ...reviews5].map((r, i) => (
              <span key={i} className="mx-8 inline-block min-w-[150px]">
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex justify-center items-center h-[60vh] text-white">
        <img
          src={gradiente}
          alt="gradiente"
          className="absolute bottom-0 left-0 w-full z-0 pointer-events-none"
        />
        <div className="relative z-10 text-center max-w-5xl px-6">
          <div className="font-bold text-6xl">4. View the comments</div>
          <div className="mt-8 text-2xl">
            Explore real player reviews, organized clearly with timestamps,
            gameplay hours, and a sentiment label. Quickly spot what players are
            loving (or complaining about).
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section5;
