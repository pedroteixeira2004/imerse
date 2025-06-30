import { Link } from "react-router-dom";
import Select from "react-select";
const StepTwo = ({ formData, updateForm, next, back }) => {
  const occupations = [
    { label: "Investigator", value: "Investigator" },
    { label: "Game company", value: "Game company" },
    { label: "Other", value: "Other" },
  ];
  const customStyles = {
    control: (base) => ({
      ...base,
      background:
        "linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.3))",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "9999px",
      border: "1px solid rgba(255, 255, 255, 0.4)",
      boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
      color: "white",
      paddingLeft: "1.5rem",
      paddingRight: "2.5rem",
      minHeight: "48px",
      height: "48px",
      fontSize: "1.125rem",
      fontFamily: "inherit",
      transition: "all 0.3s ease",
      width: "100%",
    }),
    menu: (base) => ({
      ...base,
      background: "rgba(255,255,255,0.1)",
      backdropFilter: "blur(15px)",
      borderRadius: "1rem",
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      marginTop: "8px",
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "rgba(255, 255, 255, 0.2)"
        : "transparent",
      color: "white",
      borderRadius: "0.75rem",
      cursor: "pointer",
      padding: "12px 20px",
      transition: "all 0.2s ease",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255,255,255,0.7)",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: "rgba(255,255,255,0.7)",
    }),
  };

  return (
    <div>
      <h2 className="text-5xl font-bold mb-6">Sign Up</h2>
      <div className="text-2xl mb-6 font-medium">
        Step 2 out of 3: Who are you?
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        className="w-full max-w-md space-y-5"
      >
        <div className="gap-y-8">
          <label className="block mb-4 text-white">
            What's your occupation:
          </label>
          <div>
            <Select
              options={occupations}
              onChange={(selected) => updateForm("occupation", selected.value)}
              value={occupations.find(
                (opt) => opt.value === formData.occupation
              )}
              placeholder="Select occupation"
              isSearchable={false}
              styles={customStyles}
              className="w-96"
              menuPortalTarget={document.body}
            />
          </div>
        </div>
        <div>
          <label className="block mb-4 text-white">
            What's your organization:
          </label>
          <div
            className="pl-6 pr-10 py-3 text-white text-lg rounded-full 
        bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
        border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        outline-none flex gap-2 items-center transition-all duration-500 mt-4"
          >
            <input
              type="text"
              placeholder="Enter your organization"
              value={formData.organization}
              onChange={(e) => updateForm("organization", e.target.value)}
              className="bg-transparent placeholder-white/70 font-sf w-full focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={back}
            className="button2 w-1/3 py-2 mt-4 rounded-full text-white font-bold hover:bg-gray-300 transition text-lg mr-10"
          >
            Back
          </button>
          <button
            type="submit"
            className="button2 w-1/3 py-2 mt-4 rounded-full text-white font-bold hover:bg-gray-300 transition text-lg"
          >
            Continue
          </button>
        </div>
        <div className="flex justify-center mt-10">
          <div className="inline-flex items-center gap-1">
            <div>Already have an account?</div>
            <div className="underline font-bold">
              <Link to="/login">Login here</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default StepTwo;
