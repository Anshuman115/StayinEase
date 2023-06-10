import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

export const updateUserProfile = createAsyncThunk(
  `api/me/update`,
  async ({ userData, req }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { origin } = absoluteUrl(req);

    const response = await axios.put(
      `${origin}/api/me/update`,
      userData,
      config
    );
    return response.data;
  }
);

const initialState = {
  isLoading: false,
  error: null,
  isUpdated: false,
};

export const userUpdateSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.error = action.payload;
      });
  },
});

// export const selectComments = (state) => state.comments.value;
export default userUpdateSlice.reducer;
