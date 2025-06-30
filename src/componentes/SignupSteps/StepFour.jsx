import { useNavigate } from "react-router-dom";

const StepFour = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-6">We've sent you an e-mail</h2>
      <p className="text-xl mb-8">
        Please verify your email to complete the registration process.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="button2 w-1/2 py-2 mt-4 rounded-full text-white font-bold hover:bg-gray-300 transition text-lg"
      >
        Go to Login
      </button>
    </div>
  );
};

export default StepFour;
