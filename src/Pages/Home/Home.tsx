import css from "./Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthModal } from "../../Modals/AuthModal";
export default function Home() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  useEffect(() => {
    axios.get("https://beready-api-maksym235.vercel.app/start");
  }, []);
  const toggleModal = () => {
    setIsOpenModal((state) => !state);
  };
  return (
    <main>
      <section className={css.home_section}>
        <h1>Home page</h1>
        <button onClick={toggleModal}>auth</button>
      </section>
      {isOpenModal && <AuthModal toggleModal={toggleModal} />}
    </main>
  );
}
