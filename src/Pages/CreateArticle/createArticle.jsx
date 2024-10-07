import { useSelector } from "react-redux";
import { FormArticle } from "../../components/FormArticle/formArticle";
import { createFetch } from "../../store/createArticle.slice";
import styles from "./createArticle.module.scss";
import { Alert } from "antd";

export function CreateArticle() {
  const { errorCreateMessage } = useSelector((state) => state.createArticle);
  return (
    <div className={styles.wrap}>
      {errorCreateMessage && (
        <div className={styles.error}>
          <Alert message={errorCreateMessage} type="error" />;
        </div>
      )}
      <FormArticle fn={createFetch} />
    </div>
  );
}
