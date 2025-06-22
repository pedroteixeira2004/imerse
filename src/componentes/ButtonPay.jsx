import React, { useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "../firebase/Inicializacao";

const ButtonPay = ({ user, selectedCard, reports, total, onSuccess }) => {
  const [loading, setLoading] = useState(false);

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

      // Obtem todos os documentos da coleção cart
      const cartSnapshot = await getDocs(cartRef);

      // Copia cada item da cart para purchased_reports
      const batchPromises = cartSnapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();
        await addDoc(purchasedRef, data);
      });
      await Promise.all(batchPromises);

      // Apaga todos os documentos da cart
      const deletePromises = cartSnapshot.docs.map(async (docSnap) => {
        await deleteDoc(doc(db, "users", user.uid, "cart", docSnap.id));
      });
      await Promise.all(deletePromises);

      toast.success("Payment successful! Reports purchased.");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Error processing payment. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={!selectedCard || loading}
      className={`button2 rounded-full py-2 px-8 font-bold text-xl transition-opacity duration-300 ${
        !selectedCard || loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Processing..." : `Pay`}
    </button>
  );
};

export default ButtonPay;
