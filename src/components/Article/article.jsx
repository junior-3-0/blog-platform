import { format } from "date-fns";
import styles from "./article.module.scss";
import { Link, useParams } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { ControlArticle } from "../ControlArticle/controlArticle";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { dislikeFetch, favoriteFetch } from "../../store/favoriteArticle.slice";
import { useState } from "react";
import { getToken } from "../../helpers/getJwtLocalStorage";

export default function Article({
  title,
  description,
  author,
  favorited,
  favoritesCount,
  tagList,
  createdAt,
  slug,
  children,
}) {
  const params = useParams();
  const username = useSelector((state) => state.signup?.user?.user?.username);
  const jwt = getToken();
  const setTags = [...new Set(tagList)].filter((tag) => tag);
  const [favorit, isFavorit] = useState(favorited);
  const [count, isCount] = useState(favoritesCount);
  const dispatch = useDispatch();

  const truncate = (str, maxlength) => {
    if (!str) {
      return;
    }
    return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
  };

  const like = (cl) => {
    dispatch(cl(slug)).then((response) => {
      if (!response.error) {
        const { article } = response.payload;
        isCount(article.favoritesCount);
        isFavorit(article.favorited);
      }
    });
  };

  const likeClick = () => {
    if (!jwt) {
      return;
    }
    !favorit ? like(favoriteFetch) : like(dislikeFetch);
  };

  return (
    <article className={styles.article}>
      <div className={cn(styles.flex, { [styles.flex_slug]: params.slug })}>
        <div className={styles.wrap}>
          <div className={styles.inner_wrap}>
            <Link to={`/articles/${slug}`} className={styles.title}>
              {params.slug ? title : truncate(title, 30)}
            </Link>
            <button
              className={cn(styles.like_btn, { [styles.active]: jwt })}
              type="button"
              onClick={likeClick}
            >
              <img
                src={favorit ? "../path4.svg" : "../heart.svg"}
                alt="likes"
                className={styles.likes_img}
              />
            </button>
            <div className={styles.likes}>{count}</div>
          </div>
          <div
            className={cn(styles.tagList, {
              [styles.tagList_slug]: params.slug,
            })}
          >
            {tagList &&
              setTags.map((tag) => (
                <button key={tag} className={styles.tags}>
                  {params.slug ? tag : truncate(tag, 15)}
                </button>
              ))}
          </div>
          <div className={styles.descr}>
            {params.slug ? description : truncate(description, 220)}
          </div>
        </div>
        <div className={styles.user_wrap}>
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
          {username === author.username && jwt && params.slug && (
            <ControlArticle slug={slug} />
          )}
        </div>
      </div>
      {children && <Markdown className={styles.markdown}>{children}</Markdown>}
    </article>
  );
}
