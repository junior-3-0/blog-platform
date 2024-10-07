import { Link } from "react-router-dom";
import styles from "./signin.module.scss";
import { Button } from "../../components/Button/button";
import { TitleForm } from "../../components/TitleForm/titleForm";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginFetch } from "../../store/signup.slice";
import Input from "../../components/Input/Input";
import { validateEmail, validateRequired } from "../../helpers/validateObj";

export function SignIn() {
  const dispatch = useDispatch();
  const { errorMessageLogin } = useSelector((state) => state.signup);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className={styles.signin}>
      <form
        className={styles.form}
        onSubmit={handleSubmit((data) => dispatch(loginFetch(data)))}
      >
        <TitleForm>Sign In</TitleForm>
        {errorMessageLogin && (
          <div className={styles.serverError}>{errorMessageLogin}</div>
        )}
        <div className={styles.inputs}>
          <Input
            register={register}
            errors={errors}
            name={"email"}
            placeholder={"Email address"}
            type={"email"}
            validate={validateEmail}
          >
            Email address
          </Input>
          <Input
            register={register}
            errors={errors}
            name={"password"}
            placeholder={"Password"}
            type={"password"}
            validate={validateRequired}
          >
            Password
          </Input>
        </div>
        <Button>Login</Button>
        <div className={styles.descr}>
          Don’t have an account?{" "}
          <Link to="/sign-up" className={styles.link}>
            Sign Up.
          </Link>
        </div>
      </form>
    </div>
  );
}
