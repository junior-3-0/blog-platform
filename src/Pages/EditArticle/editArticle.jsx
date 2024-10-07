import { Suspense } from "react";
import { FormArticle } from "../../components/FormArticle/formArticle";
import styles from "./editArticle.module.scss";
import { Await, useLoaderData } from "react-router-dom";
import Loader from "../../components/Loader/loader";
import { editFetch } from "../../store/editArticle.slice";

export function EditArticle() {
  const data = useLoaderData();

  return (
    <div className={styles.wrap}>
      <Suspense fallback={<Loader />}>
        <Await resolve={data.data}>
          {({ data }) => <FormArticle {...data} fn={editFetch} />}
        </Await>
      </Suspense>
    </div>
  );
}
