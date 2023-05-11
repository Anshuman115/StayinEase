import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const resetPassword = createAsyncThunk(
  `api/password/reset`,
  async (data) => {
    // const { email } = data;
    // console.log("email", email);
    console.log(data);
    const { token, passwords } = data;
    console.log("token", token, "pass", passwords);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.put(
      `http://localhost:3000/api/password/reset/${token}`,
      passwords,
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

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = action.payload;
      });
  },
});

export default resetPasswordSlice.reducer;
