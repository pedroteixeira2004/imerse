// StepFour.jsx
import { useNavigate } from "react-router-dom";

const StepFour = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-6">Confirm your email</h2>
      <p className="text-xl mb-8">
        Please verify your email to complete the registration process.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-500 transition"
      >
        Ir para o Login
      </button>
    </div>
  );
};

export default StepFour;
