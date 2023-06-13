import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const forgotPassword = createAsyncThunk(
  `api/password/forgot`,
  async ({ userData: data, req }) => {
    const { origin } = absoluteUrl(req);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${origin}/api/password/forgot`,
      data,
      config
    );
    // console.log(response);
    return response.data;
  }
);

const initialState = {
  isLoading: false,
  error: null,
  success: false,
  message: "",
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = action.payload;
      });
  },
});

export default forgotPasswordSlice.reducer;
