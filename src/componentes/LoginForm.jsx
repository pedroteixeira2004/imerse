import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/Inicializacao";
import { useNavigate } from "react-router-dom";
import Background from "./background";
import logo from "../assets/imerselogo_white.png"; // Importando o logo
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { traduzirErroFirebase } from "./TraduzirErrosFirebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        // ✅ Se o e-mail não estiver verificado, impede o login
        if (!user.emailVerified) {
          setError(
            "Your account is not verified. Please check your email to verify your account."
          );
          await auth.signOut(); // <- IMPORTANTE usar await aqui
          return;
        }
      }

      // Se o e-mail estiver verificado, segue normalmente
      console.log("Login bem-sucedido:", user.email);
      // Redirecionamento ou mudança de estado aqui, se necessário
      navigate("/home");
    } catch (err) {
      console.error("Erro no login:", err);
      const mensagem = traduzirErroFirebase(err.code);
      setError(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sf text-white">
      <Background />
      <div className="flex items-center min-h-screen p-4 mx-10 justify-between">
        {/* Lado esquerdo: logo e Welcome back */}
        <div className="flex-1 flex flex-col items-center">
          <div>
            <img src={logo} alt="Logo" className="w-[30rem]" />
            <p className="text-6xl font-bold mt-7">Welcome back.</p>
          </div>
        </div>

        {/* Lado direito: login */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <div>
            <h2 className="text-5xl font-bold mb-4">Login</h2>
            <div className="text-2xl font-medium mb-6">
              Hey there! Please login to your account
            </div>
            <form onSubmit={handleLogin} className="w-full max-w-md space-y-5">
              <div>
                <label htmlFor="email">E-mail:</label>
                <div
                  className="pl-6 pr-10 py-3 text-white text-lg rounded-full 
              bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
              border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
              outline-none flex gap-2 items-center transition-all duration-500 mt-4"
                >
                  <input
                    className="bg-transparent placeholder-white/70 font-sf w-full focus:outline-none"
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    onInvalid={(e) =>
                      e.target.setCustomValidity("Please, enter a valid email")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <div
                  className="pl-6 pr-10 py-3 text-white text-lg rounded-full 
              bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
              border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
              outline-none flex gap-2 items-center transition-all duration-500 mt-4"
                >
                  <input
                    className="bg-transparent placeholder-white/70 font-sf w-full focus:outline-none"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    onInvalid={(e) =>
                      e.target.setCustomValidity("Please, enter your password")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-white text-xl focus:outline-none"
                    tabIndex={-1} // para não focar no tab
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="flex justify-end mt-4">
                  <Link to="/forgot-password" className="underline">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>
              <div className="justify-center flex">
                <button
                  type="submit"
                  disabled={loading}
                  className="button2 w-1/3 py-2 mt-4 rounded-full text-white font-bold hover:bg-gray-300 transition text-lg"
                >
                  {loading ? (
                    <BeatLoader color="#ffffff" size={12} className="mt-2" />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
              <div className="flex justify-center mt-8">
                <div className="inline-flex items-center gap-1">
                  <div>Don’t have an account?</div>
                  <div className="underline font-bold">
                    <Link to="/signup">Sign up here</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
