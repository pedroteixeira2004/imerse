function Section3() {
  return (
    <section className="relative text-white overflow-hidden h-[100vh]">
      {/* Parte superior com 40vh */}
      <div className="h-[40vh] flex items-center justify-center relative z-10">
        <div className="text-center max-w-4xl px-4"></div>
      </div>

      {/* Parte inferior com gradiente e texto estático */}
      <div className="relative flex justify-center items-center h-[60vh] text-white">
        <img
          src={gradiente}
          alt="gradiente"
          className="absolute bottom-0 left-0 w-full z-0 pointer-events-none"
        />
        <div className="relative z-10 text-center max-w-5xl px-6">
          <div className="font-bold text-6xl">5. Export to Excel</div>
          <div className="mt-8 text-2xl">
            Need to dive even deeper into the data? Download all your filtered
            results instantly in a clean, well-organized Excel file that's
            perfectly formatted and ready for comprehensive analysis, reporting,
            or sharing with your team.
          </div>
        </div>
      </div>
    </section>
  );
}
export default Section3;
