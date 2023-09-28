import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import css from "./Layout.module.css";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../redux/store";
import { UpdateLang, UpdateTheme } from "../../redux/auth/operations";

export const Layout = () => {
  // ===========HEADER =================
  const dispatch = useAppDispatch();
  const { isLoggedIn, user } = useAuth();
  const handleChangeLang = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem("lang", evt.currentTarget.value);
    dispatch(
      UpdateLang({
        email: user.email,
        lang: evt.currentTarget.value,
      })
    );
  };
  const handleChangeTheme = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    document.documentElement.dataset.theme = evt.currentTarget.value;
    localStorage.setItem("theme", evt.currentTarget.value);
    dispatch(
      UpdateTheme({
        email: user.email,
        theme: evt.currentTarget.value,
      })
    );
  };
  // ===========HEADER =================
  return (
    <>
      <header className={css.header}>
        {isLoggedIn && (
          <>
            <select defaultValue="ua" onChange={handleChangeLang}>
              <option selected>ua</option>
              <option>en</option>
            </select>
            <select onChange={handleChangeTheme} defaultValue="light">
              <option selected>light</option>
              <option>dark</option>
            </select>
          </>
        )}
        <NavLink to="/home" className={css.nav__button}>
          Home
        </NavLink>
        <NavLink to="/tours" className={css.nav__button}>
          tours
        </NavLink>
        <br />
        Header
      </header>
      <Outlet />
    </>
  );
};
