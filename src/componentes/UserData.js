// src/hooks/useUserData.js
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

export default function useUserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);

        // Escutar alterações em tempo real
        unsubscribeSnapshot = onSnapshot(
          docRef,
          (docSnap) => {
            if (docSnap.exists()) {
              setUserData(docSnap.data());
            } else {
              console.warn("User not found.");
              setUserData(null);
            }
            setLoading(false);
          },
          (error) => {
            console.error("Error listening to user data:", error);
            setLoading(false);
          }
        );
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  return { userData, loading };
}
