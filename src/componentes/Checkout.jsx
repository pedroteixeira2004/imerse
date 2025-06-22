import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/Inicializacao";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Background from "./background";
import AppLayout2 from "./Layout2";
import BackButton from "./BackButton";
import { MdInfo } from "react-icons/md";
import AddCardButton from "./AddCardButton";
import CardProviderLogo from "./CardProviderLogo";
import ButtonPay from "./ButtonPay";
const Checkout = () => {
  const location = useLocation();
  const { reports, total } = location.state || { reports: [], total: 0 };
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);

  React.useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        const cardsRef = collection(db, "users", firebaseUser.uid, "cards");

        // Escuta em tempo real as mudanças na coleção cards
        const unsubscribeCards = onSnapshot(cardsRef, (snapshot) => {
          const cardsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCards(cardsData);
        });

        // Retorna o unsubscribe do cards quando o usuário mudar ou componente desmontar
        return () => unsubscribeCards();
      } else {
        setUser(null);
        setCards([]);
      }
    });

    // Limpa o listener de autenticação quando desmontar
    return () => unsubscribeAuth();
  }, []);

  return (
    <div>
      <Background />
      <AppLayout2>
        <div className="flex flex-col items-center justify-center w-full min-h-screen text-white font-sf gap-10 px-4">
          {/* Título */}
          <div className="flex items-center">
            <div>
              <BackButton />
            </div>
            <h1 className="text-5xl font-bold">Checkout</h1>
          </div>

          {/* Card */}
          <div className="w-[100vw] max-w-6xl bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-10 grid grid-cols-1 md:grid-cols-2 gap-14 mb-10">
            {/* Lado Esquerdo - Pagamento */}
            <div className="flex flex-col justify-between border-r border-white/30 pr-10">
              <div>
                <div className="text-3xl font-bold mb-4">
                  Select payment method
                </div>
                <div>
                  {cards.length === 0 ? (
                    <p className="text-white/60 text-sm">No cards added yet.</p>
                  ) : (
                    <ul className="space-y-4">
                      {cards.map((card) => (
                        <li
                          key={card.id}
                          onClick={() => setSelectedCard(card.id)}
                          className={`cursor-pointer p-4 rounded-xl border transition-all ${
                            selectedCard === card.id
                              ? "bg-white/30 border-white border-2"
                              : "bg-white/10 border-white/30 hover:bg-white/20 hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
                          }`}
                        >
                          <CardProviderLogo provider={card.provider} />
                          <div className="text-lg font-mono tracking-wide">
                            **** {card.number.slice(-4)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <AddCardButton />
              </div>

              {/* AVISO NO FUNDO */}
              <div className="flex items-center gap-3 mt-10 text-sm text-white/80">
                <MdInfo size={20} />
                <span>
                  Reports will be available for download after the payment is
                  finalized
                </span>
              </div>
            </div>

            {/* Lado Direito - Reports e Total */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="text-3xl font-bold mb-4">Your order</div>
                <ul className="space-y-2">
                  {reports.map((report, index) => (
                    <li
                      key={index}
                      className="flex justify-between mb-4 text-xl"
                    >
                      <span className="font-medium">{report.title}</span>
                      <div>{report.price} €</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-3xl font-bold border-t border-white/30 pt-6">
                <div className="flex items-center justify-between">
                  <div>Total</div>
                  <div className="flex justify-end">{total} €</div>
                </div>
                <div className="flex justify-end mt-6">
                  <ButtonPay
                    user={user}
                    selectedCard={selectedCard}
                    reports={reports}
                    total={total}
                    onSuccess={() => {
                      // você pode navegar ou atualizar algo aqui após sucesso
                      // Exemplo:
                      navigate("/profile");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout2>
    </div>
  );
};

export default Checkout;
