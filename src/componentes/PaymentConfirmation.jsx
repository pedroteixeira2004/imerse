import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Background from "./background";
import AppLayout from "./Layout";

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Proteção contra acesso direto
    if (!location.state?.fromCheckout) {
      navigate("/cart", { replace: true });
    }

    // Opcional: bloquear botão voltar
    window.history.pushState(null, "", window.location.href);
    const handleBack = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [navigate, location]);

  return (
    <div>
      <Background />
      <AppLayout>
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6 w-1/2 h-80 flex items-center justify-center font-sf">
          <div className="flex flex-col items-center text-center text-white font-sf">
            <div className="text-5xl font-bold mb-4">
              Your payment has been confirmed!
            </div>
            <div className="text-2xl font-medium">
              Your reports are already available.
            </div>
            <button
              className="button2 rounded-full px-8 py-2 mt-6 font-bold text-xl"
              onClick={() => navigate("/profile")}
            >
              Check reports
            </button>
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default PaymentConfirmation;
