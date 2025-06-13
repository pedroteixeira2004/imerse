const StepOne = ({ formData, updateForm, next, error }) => {
  return (
    <div>
      <h2 className="text-5xl font-bold mb-6">Sign Up</h2>
      <div className="text-2xl">Step 1 out of 3: Personal Information</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        className="w-full max-w-md space-y-5"
      >
        <div className="flex flex-col">
          <label htmlFor="firts name">First name</label>
          <div
            className="pl-6 pr-10 py-3 text-white text-lg rounded-full 
              bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
              border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
              outline-none flex gap-2 items-center transition-all duration-500 mt-4"
          >
            <input
              type="text"
              placeholder="Insert first name"
              required
              value={formData.firstName}
              onChange={(e) => updateForm("firstName", e.target.value)}
              className="bg-transparent placeholder-white/70 font-sf w-full focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="last name">Last name</label>
            <div
              className="pl-6 pr-10 py-3 text-white text-lg rounded-full 
              bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
              border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
              outline-none flex gap-2 items-center transition-all duration-500 mt-4"
            >
              <input
                type="text"
                placeholder="Último nome"
                required
                value={formData.lastName}
                onChange={(e) => updateForm("lastName", e.target.value)}
                className="bg-transparent placeholder-white/70 font-sf w-full focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <div
            className="pl-6 pr-10 py-3 text-white text-lg rounded-full 
              bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
              border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
              outline-none flex gap-2 items-center transition-all duration-500 mt-4"
          >
            <input
              type="email"
              placeholder="E-mail"
              required
              value={formData.email}
              onChange={(e) => updateForm("email", e.target.value)}
              className="bg-transparent placeholder-white/70 font-sf w-full focus:outline-none"
            />
          </div>
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <div className="justify-end flex">
          <button
            type="submit"
            className="button2 w-1/3 py-2 mt-4 rounded-full text-white font-bold hover:bg-gray-300 transition text-lg"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
