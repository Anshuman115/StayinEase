import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

export const getAllAdminUsers = createAsyncThunk(
  `api/admin/users`,
  async (req) => {
    const { origin } = absoluteUrl(req);
    // console.log(origin);
    let link = `${origin}/api/admin/users`;
    try {
      const { data } = await axios.get(link);
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  `api/admin/users/:id`,
  async ({ req, id }) => {
    const { origin } = absoluteUrl(req);
    // console.log(origin);
    let link = `${origin}/api/admin/users/${id}`;
    try {
      const { data } = await axios.get(link);
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  `api/admin/users/:id`,
  async ({ req, id, newUserDetails }) => {
    const { origin } = absoluteUrl(req);
    // console.log(origin);
    let link = `${origin}/api/admin/users/${id}`;
    try {
      const { data } = await axios.put(link, newUserDetails);
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  `api/admin/users/:id`,
  async ({ req, id }) => {
    const { origin } = absoluteUrl(req);
    // console.log(origin);
    let link = `${origin}/api/admin/users/${id}`;
    try {
      const { data } = await axios.delete(link);
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  users: [],
  userDetails: {},
  isLoading: false,
  error: null,
  success: false,
};

export const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdminUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllAdminUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users;
      })
      .addCase(getAllAdminUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload.user;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
      });
  },
});

export default adminUsersSlice.reducer;
