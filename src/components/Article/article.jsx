import { format } from "date-fns";
import styles from "./article.module.scss";
import { Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";

export default function Article({
  title,
  description,
  author,
  favoritesCount,
  tags,
  createdAt,
  slug,
  children,
}) {
  function truncate(str, maxlength) {
    if (!str) {
      return;
    }
    return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
  }

  return (
    <article className={styles.article}>
      <div className={styles.flex}>
        <div className={styles.wrap}>
          <div className={styles.inner_wrap}>
            <Link to={`/articles/${slug}`} className={styles.title}>
              {title}
            </Link>
            <img src="../heart.svg" alt="likes" className={styles.likes_img} />
            <div className={styles.likes}>{favoritesCount}</div>
          </div>
          {tags &&
            tags.map((tag) => (
              <button key={tag} className={styles.tags}>
                {tag}
              </button>
            ))}
          <div className={styles.descr}>{truncate(description, 220)}</div>
        </div>
        <div className={styles.user}>
          <div>
            <div className={styles.name}>{author.username}</div>
            <div className={styles.date}>
              {format(new Date(createdAt), "PP")}
            </div>
          </div>
          <div className={styles.avatar}>
            <img
              src={author.image}
              alt="avatar"
              className={styles.avatar_img}
            />
          </div>
        </div>
      </div>
      {children && <Markdown className={styles.markdown}>{children}</Markdown>}
    </article>
  );
}
