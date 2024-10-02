import { Link } from "react-router-dom";
import styles from "./signup.module.scss";
import { Button } from "../../components/Button/button";
import { TitleForm } from "../../components/TitleForm/titleForm";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { signupFetch } from "../../store/signup.slice";
import { Input } from "../../components/Input/input";
import {
  validateEmail,
  validatePasswordRequired,
  validateRepeatPassword,
  validateRequired,
  validateUsername,
} from "../../helpers/validateObj";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { errorMessageSignup } = useSelector((state) => state.signup);

  return (
    <div className={styles.signup}>
      <form
        className={styles.form}
        onSubmit={handleSubmit((data) => {
          data.email = data.email.toLowerCase();
          dispatch(signupFetch(data));
        })}
      >
        <TitleForm>Create new account</TitleForm>
        {errorMessageSignup && (
          <div className={styles.serverError}>{errorMessageSignup}</div>
        )}
        <div className={styles.inputs}>
          <Input
            register={register}
            errors={errors}
            name={"username"}
            placeholder={"Username"}
            type={"text"}
            validate={validateUsername}
          >
            Username
          </Input>
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
            validate={validatePasswordRequired}
          >
            Password
          </Input>
          <Input
            register={register}
            errors={errors}
            name={"repeatpassword"}
            placeholder={"Password"}
            type={"password"}
            validateText={"Passwords must match"}
            validate={validateRepeatPassword}
          >
            Repeat Password
          </Input>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.agree}>
          <input
            className={styles.checkbox}
            type="checkbox"
            {...register("agree", validateRequired)}
            id="agree"
          />
          <label
            className={cn(styles.label, {
              [styles.checkbox_error]: errors.agree?.message,
            })}
            htmlFor="agree"
          >
            I agree to the processing of my personal information
          </label>
        </div>
        <div className={styles.agree_errors}>{errors.agree?.message}</div>
        <Button>Create</Button>
        <div className={styles.descr}>
          Already have an account?{" "}
          <Link to="/sign-in" className={styles.link}>
            Sign In.
          </Link>
        </div>
      </form>
    </div>
  );
}
