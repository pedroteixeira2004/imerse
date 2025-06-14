import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/Inicializacao";
import { Link } from "react-router-dom";
import Background from "./background";
import logo2 from "../assets/imagens/logo2.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "An e-mail has been sent to your account, please check your e-mail to reset your password."
      );
    } catch (err) {
      console.error("Error sending e-mail to reset password: ", err);
      switch (err.code) {
        case "auth/invalid-email":
          setError("Invalid E-mail.");
          break;
        default:
          setError("Error sending e-mail.");
      }
    }
  };

  return (
    <div className="font-sf text-white">
      <Background />
      <div className="flex items-center min-h-screen p-4 mx-10 justify-between">
        <div className="flex-1 flex flex-col items-center">
          <div>
            <img src={logo2} alt="Logo" className="w-[30rem]" />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6">Recover password</h2>
            <div className="text-2xl font-medium mb-6">
              Please enter your email address to recover your password. We will
              send you a link with all the instructions.
            </div>
            <form onSubmit={handleReset} className="w-full max-w-md space-y-5">
              <div
                className="pl-6 pr-10 py-3 text-white text-lg rounded-full 
              bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
              border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
              outline-none flex gap-2 items-center transition-all duration-500 mt-4"
              >
                <input
                  type="email"
                  placeholder="Enter your e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  onInvalid={(e) =>
                    e.target.setCustomValidity("Please, enter a valid email")
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  className="bg-transparent placeholder-white/70 font-sf w-full focus:outline-none"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="button2 w-1/3 py-2 mt-4 rounded-full text-white font-bold hover:bg-gray-300 transition text-lg"
                >
                  Send reset link
                </button>
              </div>
              <div>
                {message && <p className="text-green-400 mt-4">{message}</p>}
                {error && <p className="text-red-400 mt-4">{error}</p>}
              </div>

              <div className="mt-6 text-white/70 font-bold">
                <Link to="/login" className="underline">
                  Back to login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
