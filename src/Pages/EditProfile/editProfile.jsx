import styles from "./editProfile.module.scss";
import { Button } from "../../components/Button/button";
import { TitleForm } from "../../components/TitleForm/titleForm";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editFetch } from "../../store/signup.slice";
import Input from "../../components/Input/Input";
import {
  validateEmail,
  validatePassword,
  validateUrlImages,
  validateUsername,
} from "../../helpers/validateObj";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function EditProfile() {
  const { errorMessageEdit, user } = useSelector((state) => state.signup);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const checkup = (data) => {
    const result = {};
    for (let key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (data[key]) {
          result[key] = data[key];
        }
      }
    }
    return result;
  };

  useEffect(() => {
    if (user.user) {
      setValue("username", user.user.username);
      setValue("email", user.user.email);
    }
  }, [user.user]);

  return (
    <div className={styles.edit}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(async (data) => {
          const res = await dispatch(editFetch(checkup(data)));
          if (res.payload) {
            navigate("/articles");
          }
        })}
      >
        <TitleForm>Edit Profile</TitleForm>
        {errorMessageEdit && (
          <div className={styles.serverError}>{errorMessageEdit}</div>
        )}
        <div className={styles.inputs}>
          <Input
            register={register}
            errors={errors}
            name={"username"}
            placeholder={"Johndoe"}
            type={"text"}
            validate={validateUsername}
          >
            Username
          </Input>
          <Input
            register={register}
            errors={errors}
            name={"email"}
            placeholder={"john@example.com"}
            type={"email"}
            validate={validateEmail}
          >
            Email address
          </Input>
          <Input
            register={register}
            errors={errors}
            name={"password"}
            placeholder={"New password"}
            type={"password"}
            validate={validatePassword}
          >
            New password
          </Input>
          <Input
            register={register}
            errors={errors}
            name={"image"}
            placeholder={"Avatar image"}
            type={"text"}
            validateText={"Incorrect URL"}
            validate={validateUrlImages}
          >
            Avatar image (url)
          </Input>
        </div>
        <Button>Save</Button>
      </form>
    </div>
  );
}
