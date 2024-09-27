import { Outlet } from "react-router-dom";
import Header from "../components/Header/header";
import styles from "./layout.module.scss";

export default function Layout() {
  return (
    <div className={styles.root}>
      <Header />
      <Outlet />
    </div>
  );
}
