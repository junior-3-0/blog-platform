import { Outlet } from "react-router-dom";
import Header from "../components/Header/header";
import styles from "./layout.module.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signupFetch } from "../store/signup.slice";

export default function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signupFetch());
  }, []);

  return (
    <div className={styles.root}>
      <Header />
      <Outlet />
    </div>
  );
}
