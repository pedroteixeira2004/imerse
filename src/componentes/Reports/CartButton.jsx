import React, { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import cart_icon from "../../assets/icones/carro_compra.png";
import toast from "react-hot-toast";
import GlassToast from "../GlassToast";

const db = getFirestore();
const auth = getAuth();

export default function CartButton({ report, size = "default" }) {
  const [inCart, setInCart] = useState(false);
  const user = auth.currentUser;

  const cartDocRef = user ? doc(db, "users", user.uid, "cart", "myCart") : null;

  useEffect(() => {
    async function checkInCart() {
      if (!user || !cartDocRef) return;

      try {
        const cartDocSnap = await getDoc(cartDocRef);
        if (cartDocSnap.exists()) {
          const reports = cartDocSnap.data().reports || [];
          const found = reports.some(
            (r) =>
              r.title === report.title &&
              r.price === report.price &&
              r.id === report.id
          );
          setInCart(found);
        } else {
          setInCart(false);
        }
      } catch (error) {
        console.error("Error while checking if report is in cart:", error);
      }
    }
    checkInCart();
  }, [cartDocRef, report, user]);

  async function toggleCart() {
    try {
      const cartDocSnap = await getDoc(cartDocRef);

      if (inCart) {
        await updateDoc(cartDocRef, {
          reports: arrayRemove({
            title: report.title,
            price: report.price,
            id: report.id,
          }),
        });

        setInCart(false);
        toast.custom(
          (t) => (
            <GlassToast t={t} message="Report removed from cart" type="error" />
          ),
          { duration: 3000, position: "top-center" }
        );
      } else {
        if (cartDocSnap.exists()) {
          await updateDoc(cartDocRef, {
            reports: arrayUnion({
              title: report.title,
              price: report.price,
              id: report.id,
            }),
          });
        } else {
          await setDoc(cartDocRef, {
            reports: [
              { title: report.title, price: report.price, id: report.id },
            ],
          });
        }
        setInCart(true);
        toast.custom(
          (t) => (
            <GlassToast t={t} message="Report added to cart" type="success" />
          ),
          { duration: 3000, position: "top-center" }
        );
      }
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Erro while updating cart", error);
    }
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleCart();
      }}
      className={`
        flex items-center rounded-full shadow-lg group overflow-hidden transition-all duration-300 
        backdrop-blur-[15px] border text-white 
        ${
          inCart
            ? "button2"
            : "bg-gradient-to-br from-white/15 to-white/5 border-white/30 hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
        }
        ${size === "small" ? "px-4 py-2" : "px-8 py-2"}
      `}
    >
      <img
        src={cart_icon}
        alt="cart"
        className={`${size === "small" ? "h-5" : "h-8"} w-auto`}
      />
      <span
        className={`ml-0 max-w-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:ml-3 
          transition-all duration-300 whitespace-nowrap font-sf font-bold
          ${
            size === "small"
              ? "text-sm group-hover:max-w-[120px]"
              : "text-lg group-hover:max-w-[200px]"
          }
        `}
      >
        {inCart ? "Remove from cart" : "Add to cart"}
      </span>
    </button>
  );
}
