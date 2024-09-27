import { Link } from "react-router-dom";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <section className={styles.header}>
      <Link to="/" className={styles.logo}>
        Realworld Blog
      </Link>
      <div className={styles.login}>
        <button className={styles.sign_in}>Sign In</button>
        <button className={styles.sign_up}>Sign Up</button>
      </div>
    </section>
  );
}
