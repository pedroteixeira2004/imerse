import Background from "../background";
import gradiente from "../../assets/imagens/gradiente_game_details.svg";
const Section7 = () => {
  return (
    <section className="relative text-white overflow-hidden h-[100vh] bg-[#0D1060]">
      <div>
        <img
          src={gradiente}
          alt="gradiente"
          className="absolute bottom-0 left-0 w-full z-0 pointer-events-none"
        />
      </div>
    </section>
  );
};
export default Section7;
