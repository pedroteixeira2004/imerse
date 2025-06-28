// firebaseUtils.js
import {
  getFirestore,
  collection,
  query,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const db = getFirestore();

export const saveAnalyzedGameToFirebase = async (userId, game) => {
  if (!userId) throw new Error("User ID is required");

  const userGamesRef = collection(db, "users", userId, "analyzed_game");

  // Busca jogos já analisados
  const q = query(userGamesRef, orderBy("timestamp", "asc"));
  const snapshot = await getDocs(q);

  const games = [];
  snapshot.forEach((docSnap) => {
    games.push({ id: docSnap.id, ...docSnap.data() });
  });

  const existingGame = games.find((g) => g.id === game.id);

  if (existingGame) {
    // Atualiza timestamp
    await setDoc(doc(userGamesRef, game.id), {
      ...game,
      timestamp: serverTimestamp(),
    });
    return;
  }

  if (games.length >= 5) {
    const oldestGame = games[0];
    await deleteDoc(doc(userGamesRef, oldestGame.id));
  }

  await setDoc(doc(userGamesRef, game.id), {
    ...game,
    timestamp: serverTimestamp(),
  });
};
