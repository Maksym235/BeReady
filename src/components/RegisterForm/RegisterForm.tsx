import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "../../redux/store";
import { Register } from "../../redux/auth/operations";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;
// interface IFormInput {
//   name: string;
//   email: string;
//   password: string;
// }

export const RegisterForm: FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(
      Register({
        ...data,
      })
    );
    console.log(data);

  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="maks"
          {...register("name", {
            required: true,
            maxLength: 20,
            minLength: 3,
            pattern: /^[A-Za-z]+$/i,
          })}
        />
        <p>{errors.name?.message}</p>
        <input
          type="email"
          placeholder="email@mail.com"
          {...register("email", { required: true, maxLength: 20 })}
        />
        <p>{errors.email?.message}</p>
        <input
          type="password"
          placeholder="123456789"
          {...register("password", { required: true, maxLength: 20 })}
        />
        <p>{errors.password?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
};
