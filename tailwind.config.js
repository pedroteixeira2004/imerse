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
    "./src/componentes/Filters.jsx",
    "./src/componentes/ReviewCard.jsx",
    "./src/componentes/InsightPage.jsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sf: ["SF Pro Display", "sans-serif"],
        moonwalk: ["moonwalk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
