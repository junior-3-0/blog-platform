import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import { UserLogIn } from "../UserLogOut/userLogIn";
import { UserLogOut } from "../UserLogin/userLogOut";
import { useSelector } from "react-redux";

export default function Header() {
  const jwt = useSelector((state) => state.signup.user.user?.token);

  return (
    <section className={styles.header}>
      <Link to="/" className={styles.logo}>
        Realworld Blog
      </Link>
      {jwt ? <UserLogIn /> : <UserLogOut />}
    </section>
  );
}
