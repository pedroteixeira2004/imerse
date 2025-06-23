import React, { useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import GlassToast from "./GlassToast";
import { db } from "../firebase/Inicializacao";
import ConfirmPaymentOverlay from "./ConfirmPaymentOverlay";

const ButtonPay = ({ user, selectedCard, reports, total, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false); // Estado do overlay

  const handlePayment = async () => {
    setLoading(true);
    try {
      const cartRef = collection(db, "users", user.uid, "cart");
      const purchasedRef = collection(
        db,
        "users",
        user.uid,
        "purchased_reports"
      );

      const cartSnapshot = await getDocs(cartRef);

      const batchPromises = cartSnapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();
        await addDoc(purchasedRef, data);
      });
      await Promise.all(batchPromises);

      const deletePromises = cartSnapshot.docs.map(async (docSnap) => {
        await deleteDoc(doc(db, "users", user.uid, "cart", docSnap.id));
      });
      await Promise.all(deletePromises);

      toast.custom(
        (t) => (
          <GlassToast
            t={t}
            message="Payment completed successfully."
            type="success"
          />
        ),
        { duration: 3000, position: "top-center" }
      );
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Error processing payment. Try again.");
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setConfirmOpen(true)}
        disabled={!selectedCard || loading}
        className={`button2 rounded-full py-2 px-8 font-bold text-xl transition-opacity duration-300 ${
          !selectedCard || loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Processing..." : "Pay"}
      </button>

      <ConfirmPaymentOverlay
        isOpen={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handlePayment}
        title="Confirm Payment"
        message={`You are about to pay ${total}€. Do you want to continue?`}
      />
    </>
  );
};

export default ButtonPay;
