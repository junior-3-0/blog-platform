import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const slugFetch = createAsyncThunk(
  "slugSlice/slugFetch",
  async (slug) => {
    try {
      const { data } = await axios.get(
        `https://blog.kata.academy/api/articles/${slug}`
      );
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw e.message;
      }
    }
  }
);

export const slugSlice = createSlice({
  name: "slugSlice",
  initialState: {
    article: null,
    slugErrorMessage: "",
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(slugFetch.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.article = action.payload.article;
      state.loading = false;
    });
    builder.addCase(slugFetch.pending, (state) => {
      state.loading = true;
      state.slugErrorMessage = "";
    });
    builder.addCase(slugFetch.rejected, (state, action) => {
      state.slugErrorMessage = action.error.message;
    });
  },
});

export default slugSlice.reducer;
export const slugActions = slugSlice.actions;
