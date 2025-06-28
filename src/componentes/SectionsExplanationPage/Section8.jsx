import gradiente from "../../assets/imagens/gradiente_game_details.svg";

const Section8 = () => {
  const baseUrl = process.env.PREVIEW_URL;
  return (
    <section className="relative text-white overflow-hidden h-[100vh] bg-[#0D1060] flex flex-col items-center justify-center">
      <img
        src={gradiente}
        alt="gradiente"
        className="absolute bottom-0 left-0 w-full z-0 pointer-events-none"
      />
      <div className="text-white text-6xl font-sf font-bold mb-4">Preview</div>
      {/* Janela de navegador flutuante */}
      <div className="relative z-10 w-[90%] max-w-6xl h-[80%] border-2 border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-2xl overflow-hidden border-white">
        {/* Barra do navegador fake */}
        <div className="bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl  p-2 flex items-center space-x-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span className="ml-4 text-sm text-gray-300">
            https://imerse-preview.com
          </span>
        </div>

        {/* Conteúdo do iframe */}
        <iframe
          src={`${baseUrl}/preview-gamepage`}
          title="Website"
          className="w-full h-[100%] border-none overflow-y-scroll"
        />
      </div>
    </section>
  );
};

export default Section8;
