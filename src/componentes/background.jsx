import React, { useEffect, useRef } from "react";
import "../background.css";

const Background = ({ visible = false }) => {
  const containerRef = useRef(null);

  // Feito com ajuda do ChatGPT
  const random = (min, max) => Math.random() * (max - min) + min;

  // Função para distribuir SVGs de forma mais equilibrada na tela
  const distributePosition = (index, total, bounds, img) => {
    const cols = Math.ceil(Math.sqrt(total)); // Número de colunas
    const rows = Math.ceil(total / cols); // Número de linhas

    const cellWidth = bounds.width / cols;
    const cellHeight = bounds.height / rows;

    const col = index % cols;
    const row = Math.floor(index / cols);

    const posX = col * cellWidth + (cellWidth - img.clientWidth) / 2;
    const posY = row * cellHeight + (cellHeight - img.clientHeight) / 2;

    return { posX, posY };
  };

  // Função para mover o SVG
  const moveSVG = (img, speedX, speedY, bounds, posX, posY) => {
    let directionX = 1;
    let directionY = 1;
    const margin = 200; // Margem para movimento fora dos limites

    const animate = () => {
      if (posX + img.clientWidth >= bounds.width + margin || posX <= -margin) {
        directionX *= -1;
      }
      if (
        posY + img.clientHeight >= bounds.height + margin ||
        posY <= -margin
      ) {
        directionY *= -1;
      }

      posX = Math.max(
        -margin,
        Math.min(
          bounds.width - img.clientWidth + margin,
          posX + speedX * directionX
        )
      );
      posY = Math.max(
        -margin,
        Math.min(
          bounds.height - img.clientHeight + margin,
          posY + speedY * directionY
        )
      );

      img.style.transform = `translate(${posX}px, ${posY}px)`;
      requestAnimationFrame(animate);
    };

    animate();

    return () => (img.style.transform = ""); // Limpar estilo ao desmontar
  };

  // Inicializar movimentos das imagens
  const initSVGMovements = () => {
    const container = containerRef.current;
    const bounds = container.getBoundingClientRect();
    const svgs = container.querySelectorAll(".moving-svg");
    const totalSVGs = svgs.length;

    return Array.from(svgs).map((svg, index) => {
      const { posX, posY } = distributePosition(index, totalSVGs, bounds, svg);
      const speedX = random(1, 2);
      const speedY = random(1, 2);
      return moveSVG(svg, speedX, speedY, bounds, posX, posY);
    });
  };

  // Usar useEffect para inicializar o movimento ao montar o componente
  useEffect(() => {
    const cleanups = initSVGMovements();

    // Retornar função de limpeza para desmontar os movimentos
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  // Recalcular ao redimensionar a janela
  useEffect(() => {
    const onResize = () => {
      const cleanups = initSVGMovements();
      cleanups.forEach((cleanup) => cleanup());
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`main-container fixed transition-opacity duration-500 ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <img
        src="/imagens/vetores_background/Vector-3.svg"
        className="moving-svg"
        id="img12"
        alt="SVG Image 10"
      />
      <img
        src="/imagens/vetores_background/Vector.svg"
        className="moving-svg"
        id="img1"
        alt="SVG Image 1"
      />
      <img
        src="/imagens/vetores_background/Vector-8.svg"
        className="moving-svg"
        id="img13"
        alt="SVG Image 11"
      />
      <img
        src="/imagens/vetores_background/Vector-1.svg"
        className="moving-svg"
        id="img2"
        alt="SVG Image 2"
      />
      <img
        src="/imagens/vetores_background/Vector-2.svg"
        className="moving-svg"
        id="img3"
        alt="SVG Image 3"
      />
      <img
        src="/imagens/vetores_background/Vector-7.svg"
        className="moving-svg"
        id="img4"
        alt="SVG Image 4"
      />
      <img
        src="/imagens/vetores_background/Vector-4.svg"
        className="moving-svg"
        id="img5"
        alt="SVG Image 5"
      />
      <img
        src="/imagens/vetores_background/Vector-5.svg"
        className="moving-svg"
        id="img6"
        alt="SVG Image 6"
      />
      <img
        src="/imagens/vetores_background/Vector-6.svg"
        className="moving-svg"
        id="img7"
        alt="SVG Image 7"
      />
      <img
        src="/imagens/vetores_background/Vector-7.svg"
        className="moving-svg"
        id="img8"
        alt="SVG Image 8"
      />
      <img
        src="/imagens/vetores_background/Vector.svg"
        className="moving-svg"
        id="img9"
        alt="SVG Image 9"
      />
      <img
        src="/imagens/vetores_background/Vector-9.svg"
        className="moving-svg"
        id="img10"
        alt="SVG Image 10"
      />
      <img
        src="/imagens/vetores_background/Vector-10.svg"
        className="moving-svg"
        id="img11"
        alt="SVG Image 11"
      />
    </div>
  );
};

export default Background;
