import { getAuth, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { app, googleAuthProvider } from "./firebase";
export const AuthProvider = () => {
  const auth = getAuth(app);

  const [user, setUser] = useState<any>(auth.currentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((maybeUser) => {
      if (maybeUser !== null) {
        return setUser(maybeUser);
      }
      signInWithPopup(auth, googleAuthProvider)
        .then((credential) => {
          setUser(credential);
        })
        .catch((err) => console.log(err));
    });
    return unsub;
  }, [auth]);

  return user != null ? <>{user.displayName}</> : <>loading</>;
};
