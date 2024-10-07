import { useDispatch } from "react-redux";
import styles from "./controlArticle.module.scss";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { deleteFetch } from "../../store/deleteArticle.slice";
import { Popconfirm } from "antd";

export function ControlArticle({ slug }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onclick = () => {
    dispatch(deleteFetch(slug)).then((response) => {
      if (!response.error) {
        navigate("/articles");
      }
    });
  };
  return (
    <div className={styles.button_wrap}>
      <Popconfirm
        onConfirm={onclick}
        title="Are you sure to delete this article?"
        okText="Yes"
        cancelText="No"
        placement="right"
      >
        <button type="button" className={cn(styles.button, styles.delete)}>
          Delete
        </button>
      </Popconfirm>
      <button
        type="button"
        className={cn(styles.button, styles.edit)}
        onClick={() => {
          navigate(`/articles/${slug}/edit`);
        }}
      >
        Edit
      </button>
    </div>
  );
}
