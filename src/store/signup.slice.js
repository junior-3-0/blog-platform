import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { getToken } from "../helpers/getJwtLocalStorage";

const initialState = {
  user: {},
};

const setItem = (data) => localStorage.setItem("user", JSON.stringify(data));

export const signupFetch = createAsyncThunk(
  "signupSlice/signupFetch",
  async (body) => {
    if (getToken()) {
      return;
    }
    try {
      const { data } = await axios.post(
        "https://blog.kata.academy/api/users",
        {
          user: {
            username: body.username,
            email: body.email,
            password: body.password,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setItem(data);
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw e.message;
      }
    }
  }
);

export const loginFetch = createAsyncThunk(
  "signupSlice/loginFetch",
  async (body) => {
    try {
      const { data } = await axios.post(
        "https://blog.kata.academy/api/users/login",
        {
          user: body,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setItem(data);
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw e;
      }
    }
  }
);

export const editFetch = createAsyncThunk(
  "signupSlice/editFetch",
  async (body) => {
    try {
      const { data } = await axios.put(
        "https://blog.kata.academy/api/user",
        {
          user: body,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setItem(data);
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw e.message;
      }
    }
  }
);

export const signupSlice = createSlice({
  name: "signupSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupFetch.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.user = action.payload;
    });
    builder.addCase(signupFetch.pending, (state) => {
      state.errorMessageSignup = "";
    });
    builder.addCase(signupFetch.rejected, (state, action) => {
      if (action.error.message === "Request failed with status code 422") {
        state.errorMessageSignup =
          "User with this name or email is already registered";
      } else {
        state.errorMessageSignup = action.error.message;
      }
    });

    builder.addCase(loginFetch.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.user = action.payload;
    });
    builder.addCase(loginFetch.pending, (state) => {
      state.errorMessageLogin = "";
    });
    builder.addCase(loginFetch.rejected, (state, action) => {
      if (action.error.message === "Request failed with status code 422") {
        state.errorMessageLogin = "Incorrect login or password";
      } else {
        state.errorMessageLogin = action.error.message;
      }
    });

    builder.addCase(editFetch.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.user = action.payload;
    });
    builder.addCase(editFetch.pending, (state) => {
      state.errorMessageEdit = "";
    });
    builder.addCase(editFetch.rejected, (state, action) => {
      if (action.error.message === "Request failed with status code 500") {
        state.errorMessageEdit = "Username or email is already taken";
      } else {
        state.errorMessageEdit = action.error.message;
      }
    });
  },
});

export default signupSlice.reducer;
export const signupAction = signupSlice.actions;
