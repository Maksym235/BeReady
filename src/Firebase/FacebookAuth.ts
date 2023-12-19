import { signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app, facebookAuthProvider } from "./firebase";
export const facebookAuth = () => {
  const auth = getAuth(app);
  const user = signInWithPopup(auth, facebookAuthProvider)
    .then((credential: any) => {
      return credential.user;
    })
    .catch((err) => console.log(err));
  return user;
};
