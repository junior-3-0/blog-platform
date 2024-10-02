import styles from "./titleForm.module.scss";

export function TitleForm({ children }) {
  return <h2 className={styles.title}>{children}</h2>;
}
