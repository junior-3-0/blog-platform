import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { getToken } from '../helpers/getJwtLocalStorage'
import { URL } from '../main'

export const createFetch = createAsyncThunk('createArticleSlice/createFetch', async ({ body }) => {
  try {
    const { data } = await axios.post(
      `${URL}articles`,
      {
        article: { ...body },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    return data
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e?.message
    }
  }
  return true
})

export const createArticleSlice = createSlice({
  name: 'createArticleSlice',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createFetch.fulfilled, (state) => {
      state.errorCreateMessage = ''
    })
    builder.addCase(createFetch.pending, (state) => {
      state.errorCreateMessage = ''
    })
    builder.addCase(createFetch.rejected, (state, action) => {
      state.errorCreateMessage = action.error?.message
    })
  },
})

export default createArticleSlice.reducer
export const createAction = createArticleSlice.actions
