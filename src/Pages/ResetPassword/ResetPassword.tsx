import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { setNewPassword } from "../../redux/auth/operations";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";
const schema = yup
  .object({
    newPass: yup.string().required(),
    newPassRepeat: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;
const ResetPassword = () => {
  const [dontMatch, setDontMatch] = useState("");
  const location = useLocation();
  const part = location.pathname.split(":");
  const hash = part[1].trim();
  const unHash = CryptoJS.AES.decrypt(hash, "123");
  const email = unHash.toString(CryptoJS.enc.Utf8);

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (data.newPass !== data.newPassRepeat) {
      setDontMatch("Passwords do not match");
      return;
    }

    dispatch(
      setNewPassword({
        email: email,
        password: data.newPass,
      })
    );
  };
  return (
    <main>
      <section>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="password"
              placeholder="new password"
              {...register("newPass", {
                required: true,
                maxLength: 20,
                minLength: 3,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            <p style={{ color: "red" }}>{errors.newPass?.message}</p>
            <input
              type="password"
              placeholder="repeat password"
              {...register("newPassRepeat", { required: true, maxLength: 20 })}
            />
            <h3 style={{ color: "red" }}>{dontMatch}</h3>
            <input type="submit" />
          </form>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
