import css from "./Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthModal } from "../../Modals/AuthModal";
import { langUa } from "../../Language/langUa";
import { langEn } from "../../Language/langEn";
import { useAuth } from "../../hooks/useAuth";
import { AuthProvider } from "../../Firebase/Auth";
import { facebookAuth } from "../../Firebase/FacebookAuth";
export default function Home() {
  const { user, isLoggedIn } = useAuth();
  const lang = user.lang;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let language: any;
  if (lang === "ua") language = langUa;
  if (lang === "en") language = langEn;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenGoogleProvider, setIsOpenGoogleProvider] = useState(false);
  const [facebookUser, setFacebookUser] = useState<any>(null);
  useEffect(() => {
    axios.get("https://beready-api-maksym235.vercel.app/start");
    if (isLoggedIn) {
      setIsOpenModal(false);
    }
  }, [isLoggedIn]);
  const toggleModal = () => {
    setIsOpenModal((state) => !state);
  };
  const setFasebookUsers = async () => {
    const newUser = await facebookAuth();
    setFacebookUser(newUser);
  };
  console.log(facebookUser);
  return (
    <main>
      <section className={css.home_section}>
        <h1>{language.HomePage.title}</h1>
        <button onClick={toggleModal}>auth</button>
        <button onClick={() => setIsOpenGoogleProvider((state) => !state)}>
          SignIn with google
        </button>
        <button onClick={setFasebookUsers}>SignIn with facebook</button>
      </section>
      {isOpenModal && <AuthModal toggleModal={toggleModal} />}
      {isOpenGoogleProvider && <AuthProvider />}
    </main>
  );
}
