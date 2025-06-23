import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/Inicializacao";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import GlassToast from "./GlassToast";
import toast from "react-hot-toast";
import ReactDOM from "react-dom";

function OverlayAddCard({ isOpen, onClose }) {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    number: "",
    expiry: "", // MM/YY
    cvc: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, [isOpen]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Atualiza campos e aplica máscaras/formatação
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      let onlyNums = value.replace(/\D/g, "").slice(0, 16);
      const formattedNumber = onlyNums.replace(/(.{4})/g, "$1 ").trim();
      setForm((prev) => ({ ...prev, number: formattedNumber }));
    } else if (name === "cvc") {
      const onlyNums = value.replace(/\D/g, "").slice(0, 4);
      setForm((prev) => ({ ...prev, cvc: onlyNums }));
    } else if (name === "expiry") {
      let cleaned = value.replace(/[^\d]/g, "");
      if (cleaned.length > 2) {
        cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
      }
      setForm((prev) => ({ ...prev, expiry: cleaned }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    setError(""); // Limpa erro ao digitar
  };

  // Detecta bandeira do cartão (visa, mastercard, amex)
  const detectCardProvider = (cardNumber) => {
    const num = cardNumber.replace(/\s+/g, "");

    if (/^4/.test(num)) return "visa";
    if (
      /^5[1-5]/.test(num) ||
      /^2(2[2-9][1-9]|[3-6]\d{2}|7([01]\d|20))/.test(num)
    )
      return "mastercard";
    if (/^3[47]/.test(num)) return "american express";

    return "unknown";
  };

  // Valida formulário antes de habilitar o botão
  const isFormValid = () => {
    if (!form.name.trim()) return false;
    if (form.number.replace(/\s/g, "").length !== 16) return false;
    if (!/^(\d{2}\/\d{2})$/.test(form.expiry)) return false;
    if (form.cvc.length < 3) return false;

    // Valida data de validade
    const [expiryMonth, expiryYear] = form.expiry.split("/");
    const monthNum = parseInt(expiryMonth, 10);
    const yearNum = parseInt(expiryYear, 10);
    if (monthNum < 1 || monthNum > 12) return false;

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (yearNum < currentYear) return false;
    if (yearNum === currentYear && monthNum <= currentMonth) return false;

    if (detectCardProvider(form.number) === "unknown") return false;

    return true;
  };

  // Submete o formulário e adiciona o cartão no Firestore
  const handleSubmit = async () => {
    if (!user) {
      setError("You must be logged in to add a card.");
      return;
    }

    const [expiryMonth, expiryYear] = form.expiry.split("/");

    if (
      !expiryMonth ||
      !expiryYear ||
      expiryMonth.length !== 2 ||
      expiryYear.length !== 2
    ) {
      setError("Invalid expiration date format. Use MM/YY.");
      return;
    }

    const monthNum = parseInt(expiryMonth, 10);
    const yearNum = parseInt(expiryYear, 10);

    if (monthNum < 1 || monthNum > 12) {
      setError("Expiration month must be between 01 and 12.");
      return;
    }

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (
      yearNum < currentYear ||
      (yearNum === currentYear && monthNum <= currentMonth)
    ) {
      setError("Expiration date cannot be in the past.");
      return;
    }

    const provider = detectCardProvider(form.number);

    if (provider === "unknown") {
      setError(
        "Card type not supported. Use Visa, Mastercard, or American Express."
      );
      return;
    }

    try {
      const cardsRef = collection(db, "users", user.uid, "cards");
      const existingSnapshot = await getDocs(cardsRef);

      if (existingSnapshot.size >= 5) {
        setError("You can only add up to 5 cards.");
        return;
      }

      const isDuplicate = existingSnapshot.docs.some((doc) => {
        const data = doc.data();
        const existingNumber = data.number.replace(/\s/g, "");
        const newNumber = form.number.replace(/\s/g, "");
        return existingNumber === newNumber || data.cvc === form.cvc;
      });

      if (isDuplicate) {
        setError("Card number or CVC already exists.");
        return;
      }

      await addDoc(cardsRef, {
        name: form.name,
        number: form.number,
        expiryMonth,
        expiryYear,
        cvc: form.cvc,
        provider,
      });

      toast.custom(
        (t) => (
          <GlassToast t={t} message="Card added with success" type="success" />
        ),
        { duration: 3000, position: "top-center" }
      );

      onClose();
      setForm({ name: "", number: "", expiry: "", cvc: "" });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error adding card. Try again.");
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-card-title"
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[9999] font-sf"
      onClick={onClose} // fecha modal clicando fora da caixa
    >
      <div
        className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-8 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()} // evita fechar clicando dentro
      >
        <h2
          id="add-card-title"
          className="text-white text-4xl mb-6 font-bold text-center"
        >
          Add new card
        </h2>

        <div className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Cardholder Name"
            className="w-full p-3 text-white text-lg rounded-full bg-white/20 placeholder-white/70 backdrop-blur-xl border border-white/30 shadow-md outline-none focus:ring-2 focus:ring-white/50"
            autoComplete="cc-name"
          />
          <input
            name="number"
            value={form.number}
            onChange={handleChange}
            placeholder="Card Number"
            maxLength={19}
            className="w-full p-3 text-white text-lg rounded-full bg-white/20 placeholder-white/70 backdrop-blur-xl border border-white/30 shadow-md outline-none focus:ring-2 focus:ring-white/50"
            autoComplete="cc-number"
          />
          <input
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            className="w-full p-3 text-white text-lg rounded-full bg-white/20 placeholder-white/70 backdrop-blur-xl border border-white/30 shadow-md outline-none focus:ring-2 focus:ring-white/50"
            autoComplete="cc-exp"
          />
          <input
            name="cvc"
            value={form.cvc}
            onChange={handleChange}
            placeholder="CVC"
            maxLength={4}
            className="w-full p-3 text-white text-lg rounded-full bg-white/20 placeholder-white/70 backdrop-blur-xl border border-white/30 shadow-md outline-none focus:ring-2 focus:ring-white/50"
            autoComplete="cc-csc"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex justify-end mt-8 gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-full transition-all duration-300 button-filters font-bold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`rounded-full button2 text-white px-6 font-bold transition-opacity duration-300 ${
              !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default OverlayAddCard;
