import { useForm } from "react-hook-form";
import styles from "./formArticle.module.scss";
import cn from "classnames";
import { validateRequired } from "../../helpers/validateObj";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function FormArticle({ article, fn }) {
  const [inputValue, isInputValue] = useState("");
  const [tagList, isTagList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onchange = (e) => isInputValue(e.target.value);
  const add = () => {
    if (tagList.includes(inputValue)) {
      isInputValue("");
      return;
    }
    isTagList((state) => [...state, inputValue]);
    isInputValue("");
  };
  const deleteTag = (e) => {
    const prevElem = e.target.previousElementSibling;
    isTagList((state) => state.filter((tag) => tag !== prevElem.innerHTML));
  };

  useEffect(() => {
    if (article) {
      const { title, description, body, tagList } = article;
      setValue("title", title);
      setValue("description", description);
      setValue("body", body);
      isTagList(tagList);
    }
  }, []);

  return (
    <form
      className={styles.wraper}
      onSubmit={handleSubmit((data) => {
        data.tagList = tagList;
        dispatch(fn({ body: data, slug: article?.slug })).then((response) => {
          if (!response.error) {
            new Promise((res) => {
              setTimeout(() => {
                if (!response.payload) {
                  return res(navigate(`/articles/${article?.slug}`));
                }
                return res(
                  navigate(`/articles/${response.payload?.article?.slug}`)
                );
              }, 100);
            });
          }
        });
      })}
    >
      <h2 className={styles.title}>Create new article</h2>
      <div className={styles.input_wrap}>
        <label className={styles.label} htmlFor="title">
          Title
        </label>
        <input
          className={cn(styles.input, {
            [styles.error]: errors.title?.message,
          })}
          type="text"
          placeholder="Title"
          id="title"
          {...register("title", validateRequired)}
        />
        {errors.title?.message && (
          <div className={styles.error_message}>{errors.title?.message}</div>
        )}
      </div>
      <div className={styles.input_wrap}>
        <label className={styles.label} htmlFor="description">
          Short description
        </label>
        <input
          className={cn(styles.input, {
            [styles.error]: errors.description?.message,
          })}
          type="text"
          placeholder="Title"
          id="description"
          {...register("description", validateRequired)}
        />
        {errors.description?.message && (
          <div className={styles.error_message}>
            {errors.description?.message}
          </div>
        )}
      </div>
      <div className={styles.input_wrap}>
        <label className={styles.label} htmlFor="body">
          Text
        </label>
        <textarea
          className={cn(styles.input, styles.textarea, {
            [styles.error]: errors.body?.message,
          })}
          placeholder="Text"
          id="body"
          {...register("body", validateRequired)}
        />
        {errors.body?.message && (
          <div className={styles.error_message}>{errors.body?.message}</div>
        )}
      </div>
      <div className={styles.tag_wrap}>
        <label className={styles.label} htmlFor="tagList">
          Tags
        </label>

        {tagList.map((el) => (
          <div id={el} key={el} className={styles.tag_inner_wrap}>
            <div className={styles.tag}>{el}</div>
            <button type="button" className={styles.delete} onClick={deleteTag}>
              Delete
            </button>
          </div>
        ))}

        <div className={styles.tag_inner_wrap}>
          <input
            className={cn(styles.input, styles.input_tag)}
            type="text"
            placeholder="Tag"
            id="tagList"
            name="tagList"
            onChange={onchange}
            value={inputValue}
          />
          <button type="button" className={styles.add} onClick={add}>
            Add tag
          </button>
        </div>
      </div>
      <button type="submit" className={styles.send}>
        Send
      </button>
    </form>
  );
}
