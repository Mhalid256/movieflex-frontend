import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../utils/firebase-config"; // Correct import
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false); // Default: not subscribed
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // 👇 Later you will fetch the subscription status from backend
        // For now, we assume "not subscribed"
        setIsSubscribed(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isSubscribed, setIsSubscribed }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
