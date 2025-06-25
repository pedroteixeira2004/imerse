import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase/Inicializacao";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import AddCardButton from "../AddCardButton";
import CardProviderLogo from "../CardProviderLogo";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";
import ConfirmDelete from "../Library/ConfirmDelete";
import toast from "react-hot-toast";
import GlassToast from "../GlassToast";

const PaymentMethods = () => {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        const cardsRef = collection(db, "users", firebaseUser.uid, "cards");

        const unsubscribeCards = onSnapshot(cardsRef, (snapshot) => {
          const cardsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCards(cardsData);
        });

        return () => unsubscribeCards();
      } else {
        setUser(null);
        setCards([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleDeleteCard = async () => {
    if (!user || !cardToDelete?.id) return;
    const cardRef = doc(db, "users", user.uid, "cards", cardToDelete.id);
    await deleteDoc(cardRef);
    setShowConfirm(false);
    setCardToDelete(null);
    toast.custom(
      (t) => <GlassToast t={t} message="Card removed" type="error" />,
      { duration: 3000, position: "top-center" }
    );
  };

  const openConfirmDialog = (card) => {
    setCardToDelete(card);
    setShowConfirm(true);
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">Payment Methods</h2>
      <div className="flex justify-between items-center">
        <p className="text-white text-xl mb-8">
          Check here your payment cards. You can only have 4 cards at the same
          time.
        </p>

        <div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="group flex items-center rounded-full px-6 py-2
          border border-white/30 backdrop-blur-[15px]
          bg-gradient-to-br from-white/15 to-white/5 text-white font-bold
          transition-all duration-300
          hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
          >
            {isEditing ? <FaCheckCircle size={20} /> : <FaEdit size={20} />}
            <span
              className={`ml-0 max-w-0 overflow-hidden opacity-0 
            transition-all duration-300 whitespace-nowrap
            ${
              isEditing
                ? "opacity-100 ml-3 max-w-[150px]"
                : "group-hover:opacity-100 group-hover:ml-3 group-hover:max-w-[150px]"
            }`}
            >
              {isEditing ? "Done" : "Edit cards"}
            </span>
          </button>
        </div>
      </div>

      <div>
        {cards.length === 0 ? (
          <p className="text-white/60 text-lg">No cards added yet.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map((card) => (
              <li
                key={card.id}
                className="relative group p-4 rounded-xl border transition-all bg-white/10 border-white/30 flex flex-col justify-between h-full"
              >
                {/* Edit/Delete buttons */}
                {isEditing && (
                  <div className="absolute top-2 right-2 flex space-x-2 z-40">
                    <button
                      onClick={() => openConfirmDialog(card)}
                      className="flex items-center justify-center text-white px-4 py-2 rounded-full group
                      border border-white/30 backdrop-blur-[15px] bg-gradient-to-br from-white/15 to-white/5
                      hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]
                      transition-all duration-300 text-sm font-bold min-w-[40px] h-[40px]"
                    >
                      <div className="flex items-center">
                        <FaTrash size={14} />
                        <span
                          className="ml-0 max-w-0 opacity-0 overflow-hidden 
                          group-hover:opacity-100 group-hover:ml-2 group-hover:max-w-[100px]
                          transition-all duration-300"
                        >
                          Delete
                        </span>
                      </div>
                    </button>
                  </div>
                )}

                <div>
                  <CardProviderLogo provider={card.provider} />
                  <div className="text-lg font-mono tracking-wide mt-2">
                    **** **** **** {card.number.slice(-4)}
                  </div>
                </div>
                <div className="flex justify-between mt-3">
                  <div>
                    <p className="text-lg text-white font-sf">NAME</p>
                    <div className="text-lg font-mono tracking-wide">
                      {card.name}
                    </div>
                  </div>
                  <div>
                    <p className="text-lg text-white font-sf">VALID TILL</p>
                    <div className="text-lg font-mono tracking-wide">
                      {card.expiryMonth}/{card.expiryYear}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <AddCardButton />
      </div>
      <ConfirmDelete
        isOpen={showConfirm}
        onConfirm={handleDeleteCard}
        onCancel={() => {
          setShowConfirm(false);
          setCardToDelete(null);
        }}
        title="Delete Card"
        message={`Are you sure you want to delete this card ending in **** ${cardToDelete?.number?.slice(
          -4
        )}?`}
      />
    </div>
  );
};

export default PaymentMethods;
