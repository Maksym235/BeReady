import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "../../redux/store";
import { resetPassword } from "../../redux/auth/operations";
import { setResetPassEmail } from "../../redux/auth/slice";

const schema = yup
  .object({
    email: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const ResetPassForm = ({ toggleVariant }: any) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(resetPassword({ ...data }));
    dispatch(setResetPassEmail(data.email));
    toggleVariant("sendedMail");
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="example@mail.com"
          {...register("email", {
            required: true,
          })}
        />
        <p style={{ color: "red" }}>{errors.email?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
};

export default ResetPassForm;
