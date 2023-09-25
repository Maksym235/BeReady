import css from "./Home.module.css";
import axios from "axios";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    axios.get("https://beready-api-maksym235.vercel.app/start");
  }, []);
  return (
    <main>
      <section className={css.home_section}>
        <h1>Home page</h1>
      </section>
    </main>
  );
}
