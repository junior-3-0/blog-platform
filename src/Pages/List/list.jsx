import { useDispatch, useSelector } from "react-redux";
import Article from "../../components/Article/article";
import styles from "./list.module.scss";
import { useEffect } from "react";
import { fetchArticles } from "../../store/article.slice";
import cn from "classnames";
import Error from "../Error/error";
import Paginations from "../../components/Paginations/paginations";
import Loader from "../../components/Loader/loader";

export default function List() {
  const { data, loading, articlesErrorMessage } = useSelector(
    (state) => state.articles
  );
  const dispatch = useDispatch();

  const elements =
    data.articles &&
    data.articles.map((article) => <Article key={article.slug} {...article} />);

  useEffect(() => {
    dispatch(fetchArticles({ offset: 0 }));
  }, []);

  return (
    <>
      <section className={styles.list}>
        <div
          className={cn(styles.container, {
            [styles.loading]: loading || articlesErrorMessage,
          })}
        >
          {loading && <Loader />}
          {articlesErrorMessage && loading && (
            <Error err={articlesErrorMessage} />
          )}
          {elements}
        </div>
      </section>
      <Paginations total={data?.articlesCount} />
    </>
  );
}
