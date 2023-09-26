import { FC, useState } from "react";
import { createPortal } from "react-dom";
const root = document.querySelector("#modal_root") as Element;
import styles from "./AuthModal.module.css";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";
import { LoginForm } from "../components/LoginForm/LoginForm";
interface IProps {
  toggleModal: () => void;
}
export const AuthModal: FC<IProps> = ({ toggleModal }) => {
  const [currentAuthVariant, setCurrentAuthVariant] = useState("register");
  return createPortal(
    <div className={styles.backdrop}>
      <div className={styles.modal_window}>
        {currentAuthVariant === "register" ? <RegisterForm /> : <LoginForm />}
        <button onClick={() => toggleModal()}>close</button>
        <div>
          {currentAuthVariant === "register" ? (
            <p>
              Вже є акаунт?{" "}
              <span
                onClick={() => setCurrentAuthVariant("login")}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Sing in
              </span>
            </p>
          ) : (
            <p>
              Немає акаутна ?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setCurrentAuthVariant("register")}
              >
                Sign on
              </span>
            </p>
          )}
        </div>
      </div>
    </div>,
    root
  );
};
