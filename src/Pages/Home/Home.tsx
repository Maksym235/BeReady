import css from "./Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthModal } from "../../Modals/AuthModal";
import { langUa } from "../../Language/langUa";
import { langEn } from "../../Language/langEn";
import { useAuth } from "../../hooks/useAuth";
export default function Home() {
  const { user, isLoggedIn } = useAuth();
  const lang = user.lang;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let language: any;
  if (lang === "ua") language = langUa;
  if (lang === "en") language = langEn;
  const [isOpenModal, setIsOpenModal] = useState(false);
  useEffect(() => {
    axios.get("https://beready-api-maksym235.vercel.app/start");
    if (isLoggedIn) {
      setIsOpenModal(false);
    }
  }, [isLoggedIn]);
  const toggleModal = () => {
    setIsOpenModal((state) => !state);
  };
  return (
    <main>
      <section className={css.home_section}>
        <h1>{language.HomePage.title}</h1>
        <button onClick={toggleModal}>auth</button>
      </section>
      {isOpenModal && <AuthModal toggleModal={toggleModal} />}
    </main>
  );
}
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjZkODFmMzRiNWZjYjgxNmEzNjNhYSIsImlhdCI6MTY5NzA0NDUxMiwiZXhwIjoxNjk3MTMwOTEyfQ.FK6DWMGY-Bbzg6Oomi-Tq56yePzKjt343n5zDcCW1mw"

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjZkODFmMzRiNWZjYjgxNmEzNjNhYSIsImlhdCI6MTY5NzA0NDUxMiwiZXhwIjoxNjk3MTMwOTEyfQ.FK6DWMGY-Bbzg6Oomi-Tq56yePzKjt343n5zDcCW1mw
