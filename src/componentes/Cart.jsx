import React, { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import GlassToast from "../componentes/GlassToast";
import Background from "./background";
import AppLayout2 from "./Layout2";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [reports, setReports] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();
  const navigate = useNavigate();
  const total = reports.reduce((sum, r) => sum + Number(r.price), 0).toFixed(2);

  const cartRef = user ? doc(db, "users", user.uid, "cart", "myCart") : null;

  useEffect(() => {
    async function fetchCart() {
      if (!user || !cartRef) return;
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        setReports(cartSnap.data().reports || []);
      }
    }
    fetchCart();
  }, [user]);

  const removeFromCart = async (reportToRemove) => {
    try {
      const cartSnap = await getDoc(cartRef);
      if (!cartSnap.exists()) return;

      const currentReports = cartSnap.data().reports || [];

      const filteredReports = currentReports.filter(
        (r) => r.id !== reportToRemove.id
      );

      await updateDoc(cartRef, {
        reports: filteredReports,
      });

      setReports(filteredReports);

      toast.custom(
        (t) => (
          <GlassToast t={t} message="Report removed from cart" type="error" />
        ),
        { duration: 3000, position: "top-center" }
      );
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.error("Erro ao remover do carrinho:", err);
    }
  };

  return (
    <div>
      <Background />
      <AppLayout2>
        <div className="m-10 text-white font-sf w-full">
          {reports.length === 0 ? (
            <div className="flex flex-col text-center">
              <h1 className="text-5xl font-bold mb-4">My Cart</h1>
              <p className="text-4xl text-white">Your cart is empty.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center text-center mb-10">
                <h1 className="text-5xl font-bold mb-4">My Cart</h1>
                <p className="text-2xl text-white/80 max-w-2xl">
                  You're one step away from unlocking valuable insights!
                </p>
              </div>

              <div className="space-y-4 w-full bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-md">
                {reports.map((report) => (
                  <div key={report.id} className="mb-8 mt-6">
                    <div className="mb-6 mt-6">
                      <div className="flex justify-between items-center">
                        <p className="text-2xl font-medium">{report.title}</p>
                        <p className="text-3xl font-medium">{report.price} €</p>
                      </div>
                      <div className="flex justify-end mt-4 mb-4">
                        <button
                          onClick={() => removeFromCart(report)}
                          className={`
    flex items-center rounded-full shadow-lg group overflow-hidden transition-all duration-300 
    backdrop-blur-[15px] border text-white 
    bg-gradient-to-br from-white/15 to-white/5 border-white/30 hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]
    px-4 py-2
  `}
                        >
                          <FaTrash className="h-4 w-4" />
                          <span
                            className={`
      ml-0 max-w-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:ml-3 
      transition-all duration-300 whitespace-nowrap font-sf font-bold text-sm group-hover:max-w-[120px]
    `}
                          >
                            Remove report
                          </span>
                        </button>
                      </div>
                      <hr className="w-full border-t border-gray-300 my-2" />
                    </div>
                  </div>
                ))}

                <div className="text-right text-4xl flex items-center justify-between">
                  <div className="font-bold">Total</div>
                  <div className="font-bold">{total}€</div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() =>
                    navigate("/checkout", {
                      state: { reports, total },
                    })
                  }
                  className="button2 rounded-full py-2 px-4 font-bold text-xl"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </AppLayout2>
    </div>
  );
};

export default Cart;
