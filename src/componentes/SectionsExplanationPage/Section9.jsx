import gradiente from "../../assets/imagens/gradiente_game_details.svg";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import logo from "../../assets/imerselogo_white.png";
import { useNavigate } from "react-router-dom";

const Section9 = () => {
  const navigate = useNavigate();
  return (
    <section className="relative text-white overflow-hidden h-[100vh] bg-[#0D1060] flex flex-col justify-between font-sf">
      <img
        src={gradiente}
        alt="gradiente"
        className="absolute bottom-0 left-0 w-full z-0 pointer-events-none"
      />

      <div className="flex-grow flex flex-col justify-center items-center text-center z-10 px-10">
        <div className="text-5xl font-bold mb-10">
          There is so much more to explore.
        </div>
        <div className="text-4xl font-medium mb-10">
          Decode the feedback now with
        </div>
        <div>
          <img src={logo} alt="logo" className="w-[30vw] mx-auto" />
        </div>
        <div className="mt-16">
          <button
            className="button2 px-6 py-2 rounded-full font-bold text-2xl"
            onClick={() => navigate("/signup")}
          >
            Discover More
          </button>
        </div>
      </div>

      <footer className="z-10 w-full py-6 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex justify-between">
        <div>
          <ul className="flex flex-wrap gap-6 ml-10 text-lg">
            <li>
              <a href="/terms-privacy" className="hover:underline">
                Terms
              </a>
            </li>
            <li>
              <a href="/terms-privacy" className="hover:underline">
                Privacy
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
          <div className="flex gap-4 text-lg ml-10 mt-5">
            <a
              href="https://twitter.com/imerse"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com/company/imerse"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a href="mailto:contact@imerse.com">
              <FaEnvelope />
            </a>
          </div>
        </div>
        <div className="mr-10 text-right">
          <div className="text-white text-sm mb-5">
            Powered by AI, built for insight. IMERSE helps studios, researchers
            and players decode player experiences through review analysis.
          </div>
          <div className="text-white text-sm">
            © 2025 IMERSE. All rights reserved.
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Section9;
