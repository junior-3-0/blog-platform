import { configureStore } from "@reduxjs/toolkit";
import articleSlice from "./article.slice";
import slugSlice from "./slug.slice";

export const store = configureStore({
  reducer: {
    articles: articleSlice,
    slug: slugSlice,
  },
});
