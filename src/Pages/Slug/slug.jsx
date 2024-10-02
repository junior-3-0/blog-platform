import Article from "../../components/Article/article";
import { Await, useLoaderData } from "react-router-dom";
import styles from "./slug.module.scss";
import cn from "classnames";
import { Suspense } from "react";
import Loader from "../../components/Loader/loader";

export default function Slug() {
  const data = useLoaderData();

  return (
    <div className={cn(styles.container, styles.err)}>
      <Suspense fallback={<Loader />}>
        <Await resolve={data.data}>
          {({ data }) => (
            <Article {...data.article}>{data.article.body}</Article>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
