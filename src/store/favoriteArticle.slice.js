import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { getToken } from "../helpers/getJwtLocalStorage";

export const favoriteFetch = createAsyncThunk(
  "favoriteArticleSlice/favoriteFetch",
  async (slug) => {
    try {
      const { data } = await axios.post(
        `https://blog.kata.academy/api/articles/${slug}/favorite`,
        {},
        {
          headers: {
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

export const dislikeFetch = createAsyncThunk(
  "favoriteArticleSlice/dislikeFetch",
  async (slug) => {
    try {
      const { data } = await axios.delete(
        `https://blog.kata.academy/api/articles/${slug}/favorite`,
        {
          headers: {
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

export const favoriteArticleSlice = createSlice({
  name: "favoriteArticleSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(favoriteFetch.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.favoriteErrorMessage = "";
      state.article = action.payload.article;
    });
    builder.addCase(favoriteFetch.rejected, (state, action) => {
      state.favoriteErrorMessage = action.error.message;
    });

    builder.addCase(dislikeFetch.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.favoriteErrorMessage = "";
      state.article = action.payload.article;
    });
    builder.addCase(dislikeFetch.rejected, (state, action) => {
      state.favoriteErrorMessage = action.error.message;
    });
  },
});

export default favoriteArticleSlice.reducer;
export const faforiteAction = favoriteArticleSlice.actions;
