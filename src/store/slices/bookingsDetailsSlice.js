import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

export const fetchBookingsDetails = createAsyncThunk(
  `api/bookings/:id`,
  async ({ query, req }) => {
    const { id } = query;
    const { origin } = absoluteUrl(req);
    let link = `${origin}/api/bookings/${id}`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(link, config);
      console.log("data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  bookingsDetails: [],
  isLoading: false,
  error: null,
  success: false,
};

export const bookingsDetailsSlice = createSlice({
  name: "bookingsDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingsDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookingsDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookingsDetails = action.payload.booking;
      })
      .addCase(fetchBookingsDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// export const selectComments = (state) => state.comments.value;
export default bookingsDetailsSlice.reducer;
