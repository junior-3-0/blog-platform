import styles from "./error.module.scss";
import cn from "classnames";

export default function Error({ err }) {
  return (
    <div className={cn(styles.error, { [styles.rout_err]: !err })}>
      <h2 className={styles.header}>Oops!</h2>
      <div className={cn(styles.text, { [styles.hide]: !err })}>
        Something went wrong.
      </div>
      <div className={cn(styles.text, styles.err)}>
        {err || "Page not found"}
      </div>
      <div className={cn(styles.text, { [styles.hide]: !err })}>
        Reload the page or try again later.
      </div>
    </div>
  );
}
