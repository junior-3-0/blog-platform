import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("user/getUser", async () => {
  const jwt = localStorage.getItem("jwt");
  const { data } = await axios.get("https://blog.kata.academy/api/user", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  console.log("getUser: ", data);
  return data;
});

export const user = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export default user.reducer;
export const userAction = user.actions;
