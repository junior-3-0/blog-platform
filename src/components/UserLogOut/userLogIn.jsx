import { Link, useNavigate } from "react-router-dom";
import styles from "./userLogIn.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../../store/signup.slice";

export function UserLogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, image } = useSelector((state) => state.signup.user.user);

  const click = () => {
    localStorage.removeItem("user");
    dispatch(signupAction.logout());
    navigate("/");
  };

  return (
    <div className={styles.wraper}>
      <Link to="/" className={styles.create}>
        Create article
      </Link>
      <div className={styles.user}>
        <Link to="/profile" className={styles.name}>
          {username}
        </Link>
        <Link to="/profile" className={styles.img_wrap}>
          <img
            className={styles.img}
            src={image || "https://ex-beton.ru/images/home/client-say/00.jpg"}
            alt="avatar"
          />
        </Link>
      </div>
      <Link to="/" className={styles.logout} onClick={click}>
        Log Out
      </Link>
    </div>
  );
}
