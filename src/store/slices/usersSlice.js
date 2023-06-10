import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

export const registerUser = createAsyncThunk(
  `auth/register`,
  async ({ userData, req }) => {
    const { origin } = absoluteUrl(req);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${origin}/api/auth/register`,
      userData,
      config
    );
    return response.data;
  }
);

export const loadUser = createAsyncThunk(`api/me`, async (req) => {
  // console.log("heree");
  const { origin } = absoluteUrl(req);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(`${origin}/api/me`, config);
  // console.log("response", response);
  return response.data;
});

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
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.success = false;
      })
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        // console.log("here");
        state.isLoading = false;
        state.success = true;
        state.user = action.payload.user;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

// export const selectComments = (state) => state.comments.value;
export default usersSlice.reducer;
