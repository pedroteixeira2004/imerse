// src/contexts/UserContext.js
import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (err) {
          console.error("Erro ao buscar dados do utilizador:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};
