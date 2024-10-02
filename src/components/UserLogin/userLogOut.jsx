import { Link } from "react-router-dom";
import styles from "./userLogOut.module.scss";

export function UserLogOut() {
  return (
    <div className={styles.login}>
      <Link to="/sign-in" className={styles.sign_in}>
        Sign In
      </Link>
      <Link to="/sign-up" className={styles.sign_up}>
        Sign Up
      </Link>
    </div>
  );
}
