import "./App.css";
//-------------------------------------------------------------
import { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
//-------------------------------------------------------------
import { useAppDispatch, useAppSelector } from "./redux/store";
import { Current } from "./redux/auth/operations";
//-------------------------------------------------------------
import { Layout } from "./Pages/Layout/Layout";
const HomePage = lazy(() => import("./Pages/Home/Home"));
const ToursPage = lazy(() => import("./Pages/Tours/Tours"));
const MyToursPage = lazy(() => import("./Pages/MyTours/MyTours"));
const CreateTourPage = lazy(() => import("./Pages/CreateTour/CreateTour"));
const ResetPasswordPage = lazy(
  () => import("./Pages/ResetPassword/ResetPassword")
);

export default App;
function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    document.documentElement.dataset.theme = user.theme ? user.theme : "light";
    dispatch(Current());
  }, [dispatch, user]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tours" element={<ToursPage />}>
          <Route path="create-tour" element={<CreateTourPage />} />
          <Route path="my-tours" element={<MyToursPage />} />
        </Route>
        <Route path="/resetPassword/:id" element={<ResetPasswordPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
