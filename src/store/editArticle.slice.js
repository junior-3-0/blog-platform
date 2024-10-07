import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { getToken } from "../helpers/getJwtLocalStorage";

export const editFetch = createAsyncThunk(
  "editArticleSlice/editFetch",
  async ({ body, slug }) => {
    try {
      const { data } = axios.put(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          article: body,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw e.message;
      }
    }
  }
);

export const editArticleSlice = createSlice({
  name: "editArticle",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editFetch.fulfilled, (state) => {
      state.errorEditMessage = "";
    });
    builder.addCase(editFetch.pending, (state) => {
      state.errorEditMessage = "";
    });
    builder.addCase(editFetch.rejected, (state, action) => {
      state.errorEditMessage = action.error.message;
    });
  },
});

export default editArticleSlice.reducer;
export const editAction = editArticleSlice.actions;
