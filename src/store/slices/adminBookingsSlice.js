import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

export const getAdminBookings = createAsyncThunk(
  `api/admin/bookings`,
  async (req) => {
    const { origin } = absoluteUrl(req);
    // console.log(origin);
    let link = `${origin}/api/admin/bookings`;
    try {
      const { data } = await axios.get(link);
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteBookings = createAsyncThunk(
  `api/admin/bookings/:id`,
  async ({ req, id }) => {
    const { origin } = absoluteUrl(req);
    // console.log(origin);
    let link = `${origin}/api/admin/bookings/${id}`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(id);
      const { data } = await axios.delete(link, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  bookings: [],
  isLoading: false,
  error: null,
  success: false,
};

export const adminBookingsSlice = createSlice({
  name: "adminBookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdminBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload.bookings;
      })
      .addCase(getAdminBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
      });
  },
});

export default adminBookingsSlice.reducer;
