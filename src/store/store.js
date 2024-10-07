import { configureStore } from "@reduxjs/toolkit";
import articleSlice from "./article.slice";
import signupSlice from "./signup.slice";
import createArticleSlice from "./createArticle.slice";
import deleteArticleSlice from "./deleteArticle.slice";
import editArticleSlice from "./editArticle.slice";
import favoriteArticleSlice from "./favoriteArticle.slice";

export const store = configureStore({
  reducer: {
    articles: articleSlice,
    signup: signupSlice,
    createArticle: createArticleSlice,
    deleteArticle: deleteArticleSlice,
    editArticle: editArticleSlice,
    favorite: favoriteArticleSlice,
  },
});
