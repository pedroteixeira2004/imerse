/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js",
    "./src/componentes/GameListPage.jsx",
    "./src/componentes/ReviewsPage.jsx",
    "./src/componentes/SearchPage.jsx",
    "./src/componentes/GameDetails.jsx",
    "./src/componentes/languageDropdown.js",
    "./src/componentes/background2.js",
    "./src/componentes/Layout.jsx",
    "./src/componentes/Reports.jsx",
    "./src/componentes/FiltersPage.jsx",
    "./src/componentes/ReviewCard.jsx",
    "./src/componentes/InsightPage.jsx",
    "./src/componentes/SearchBar.jsx",
    "./src/componentes/GameCard.jsx",
    "./src/componentes/LoginForm.jsx",
    "./src/componentes/Registo.jsx",
    "./src/componentes/SignupSteps/StepTwo.jsx",
    "./src/componentes/SignupSteps/StepThree.jsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sf: ["SF Pro Display", "sans-serif"],
        moonwalk: ["moonwalk", "sans-serif"],
      },
      keyframes: {
        bounceMouse: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      animation: {
        bounceMouse: "bounceMouse 1.5s infinite",
      },
    },
  },
  plugins: [],
};
