import Article from "../../components/Article/article";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { slugFetch } from "../../store/slug.slice";
import Loader from "../../components/Loader/loader";
import styles from "./slug.module.scss";
import cn from "classnames";
import Error from "../Error/error";

export default function Slug() {
  const { slugErrorMessage, article, loading } = useSelector(
    (state) => state.slug
  );
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(slugFetch(slug));
  }, []);

  return (
    <div className={cn(styles.container, { [styles.err]: loading })}>
      {loading && <Loader />}
      {slugErrorMessage && loading && <Error err={slugErrorMessage} />}
      {article?.body && !loading && (
        <Article {...article}>{article.body}</Article>
      )}
    </div>
  );
}
