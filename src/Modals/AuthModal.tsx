import { FC, useState } from "react";
import { createPortal } from "react-dom";
const root = document.querySelector("#modal_root") as Element;
import styles from "./AuthModal.module.css";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";
import { LoginForm } from "../components/LoginForm/LoginForm";
import ResetPassForm from "../components/ResetPassForm/ResetPassForm";
interface IProps {
  toggleModal: () => void;
}
export const AuthModal: FC<IProps> = ({ toggleModal }) => {
  const [currentAuthVariant, setCurrentAuthVariant] = useState("register");
  const toggleAuthVariat = (variant: string) => {
    setCurrentAuthVariant(variant);
  };

  return createPortal(
    <div className={styles.backdrop}>
      <div className={styles.modal_window}>
        {currentAuthVariant === "register" && (
          <RegisterForm toggleVariant={toggleAuthVariat} />
        )}
        {currentAuthVariant === "login" && (
          <LoginForm toggleVariant={toggleAuthVariat} />
        )}
        {currentAuthVariant === "resetPassword" && (
          <ResetPassForm toggleVariant={toggleAuthVariat} />
        )}
        {currentAuthVariant === "sendedMail" && (
          <div>
            <p>
              We are pleased to inform you that your password reset request has
              been successfully processed. Please check the given email address
              for new emails from BeReady, we have sent you a confirmation link
              to reset your password.
            </p>
            <button onClick={() => toggleModal()}>Go it</button>
          </div>
        )}
        {/* {currentAuthVariant === "register" ? (
          <RegisterForm toggleVariant={toggleAuthVariat} />
        ) : (
          <LoginForm toggleVariant={toggleAuthVariat} />
        )} */}
        <button onClick={() => toggleModal()}>close</button>
      </div>
    </div>,
    root
  );
};
