import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";

const FirebaseExample: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [docs, setDocs] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const addSample = async () => {
    const col = collection(db, "examples");
    await addDoc(col, { text: "Hello from app", createdAt: new Date().toISOString(), uid: user?.uid || null });
    await loadDocs();
  };

  const loadDocs = async () => {
    const q = await getDocs(collection(db, "examples"));
    setDocs(q.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Firebase Example</h2>
      <div className="mb-4">
        {user ? (
          <div>
            <div className="mb-2">Signed in: {user.displayName || user.email}</div>
            <button className="btn" onClick={signOutUser}>Sign out</button>
          </div>
        ) : (
          <button className="btn" onClick={signIn}>Sign in with Google</button>
        )}
      </div>

      <div className="mb-4">
        <button className="btn mr-2" onClick={addSample} disabled={!user}>Add sample doc</button>
        <button className="btn" onClick={loadDocs}>Load docs</button>
      </div>

      <ul>
        {docs.map((d) => (
          <li key={d.id} className="mb-2">{d.text} — <small>{d.createdAt}</small></li>
        ))}
      </ul>
    </div>
  );
};

export default FirebaseExample;
