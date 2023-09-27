import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Layout } from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";
import Tours from "./Pages/Tours/Tours";
import MyTours from "./Pages/MyTours/MyTours";
import CreateTour from "./Pages/CreateTour/CreateTour";
import { useEffect } from "react";
import { useAppSelector } from "./redux/store";
export default App;

function App() {
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    localStorage.setItem("lang", user ? user.lang : "ua");
    localStorage.setItem("theme", user ? user.theme : "light");
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tours" element={<Tours />}>
          <Route path="create-tour" element={<CreateTour />} />
          <Route path="my-tours" element={<MyTours />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
