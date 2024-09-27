import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState = { data: {}, articlesErrorMessage: "", loading: true };

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async ({ offset, signal }) => {
    try {
      const { data } = await axios.get(
        `https://blog.kata.academy/api/articles?limit=5&offset=${offset}`,
        { signal }
      );
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw e.message;
      }
    }
  }
);

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
      state.data.articles = [];
      state.articlesErrorMessage = "";
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.loading = false;
      state.articlesErrorMessage = action.error.message;
    });
  },
});

export default articlesSlice.reducer;
export const articlesAction = articlesSlice.actions;
