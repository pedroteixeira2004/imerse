import { Link } from "react-router-dom";
const StepThree = ({ formData, updateForm, back, submit, loading, error }) => {
  return (
    <div className="w-96">
      <h2 className="text-5xl font-bold mb-6">Sign up</h2>
      <div className="text-2xl mb-6 font-medium">Step 3 out of 3: Security</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="w-full max-w-md space-y-5"
      >
        <div className="gap-x-8">
          <div className="mb-5">
            <label htmlFor="password">Password:</label>
            <div
              className="pl-6 pr-10 py-3 text-white text-lg rounded-full 
        bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
        border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        outline-none flex gap-2 items-center transition-all duration-500 mt-4"
            >
              <input
                type="password"
                placeholder="Enter password"
                required
                value={formData.password}
                onChange={(e) => updateForm("password", e.target.value)}
                className="bg-transparent placeholder-white/70 font-sf w-full focus:outline-none"
                onInvalid={(e) =>
                  e.target.setCustomValidity("Please, enter your password")
                }
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm password:</label>
            <div
              className="pl-6 pr-10 py-3 text-white text-lg rounded-full 
        bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
        border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        outline-none flex gap-2 items-center transition-all duration-500 mt-4"
            >
              <input
                type="password"
                placeholder="Confirm your password"
                required
                value={formData.confirmPassword}
                onChange={(e) => updateForm("confirmPassword", e.target.value)}
                className="bg-transparent placeholder-white/70 font-sf w-full focus:outline-none"
                onInvalid={(e) =>
                  e.target.setCustomValidity("Please, enter your password")
                }
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
          </div>
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={back}
            className="button2 w-1/3 py-2 mt-4 rounded-full text-white font-bold hover:bg-gray-300 transition text-lg"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="button2 w-1/2 py-2 mt-4 rounded-full text-white font-bold hover:bg-gray-300 transition text-lg"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </div>
        <div className="flex justify-center mt-8">
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
export default StepThree;
