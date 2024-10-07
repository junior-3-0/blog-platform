import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { getToken } from "../helpers/getJwtLocalStorage";

export const deleteFetch = createAsyncThunk(
  "deleteArticleSlice/deleteFetch",
  async (slug) => {
    try {
      const { data } = await axios.delete(
        `https://blog.kata.academy/api/articles/${slug}`,
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

export const deleteArticleSlice = createSlice({
  name: "deleteArticleSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteFetch.fulfilled, (state) => {
      state.errorDeleteMessage = "";
    });
    builder.addCase(deleteFetch.rejected, (state, action) => {
      state.errorDeleteMessage = action.error.message;
    });
  },
});

export default deleteArticleSlice.reducer;
export const deleteAction = deleteArticleSlice.actions;
