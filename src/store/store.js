import { configureStore } from "@reduxjs/toolkit";
import articleSlice from "./article.slice";
import signupSlice from "./signup.slice";

export const store = configureStore({
  reducer: {
    articles: articleSlice,
    signup: signupSlice,
  },
});
