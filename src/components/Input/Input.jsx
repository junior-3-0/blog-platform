import { useState } from "react";
import styles from "./input.module.scss";
import cn from "classnames";

export default function Input({
  children,
  register,
  errors,
  name,
  placeholder,
  type,
  validate,
  validateText,
}) {
  const [inputPass, isInputPass] = useState({
    src: "../free-icon-eye.png",
    flag: true,
    type: "password",
  });
  const password = type === "password";
  const click = () => {
    if (inputPass.flag) {
      isInputPass({ src: "../free-icon-hide.png", flag: false, type: "text" });
      setTimeout(() => {
        isInputPass({
          src: "../free-icon-eye.png",
          flag: true,
          type: "password",
        });
      }, 3000);
    } else {
      isInputPass({
        src: "../free-icon-eye.png",
        flag: true,
        type: "password",
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.labels} htmlFor={name}>
        {children}
      </label>
      <input
        className={cn(styles.inputss, {
          [styles.field_errors]: errors[name]?.message || errors[name]?.type,
        })}
        type={password ? inputPass.type : type}
        {...register(name, validate)}
        id={name}
        placeholder={placeholder}
      />
      {password && (
        <button type="button" className={styles.eye} onClick={click}>
          <img src={inputPass.src} className={styles.eye_img} />
        </button>
      )}
      <div className={styles.field_errors_message}>
        {errors[name]?.message ||
          (errors[name]?.type === "validate" && validateText)}
      </div>
    </div>
  );
}
