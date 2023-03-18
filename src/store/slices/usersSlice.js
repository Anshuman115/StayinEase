import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  `auth/register`,
  async (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `http://localhost:3000/api/auth/register`,
      userData,
      config
    );
    return response.data;
  }
);

// export const clearErrors = () => async (dispatch) => {
//   dispatch({});
// };

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  success: false,
};

export const usersSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
      });
  },
});

// export const selectComments = (state) => state.comments.value;
export default usersSlice.reducer;
