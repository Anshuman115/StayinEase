import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

export const checkBooking = createAsyncThunk(
  `api/bookings/check`,
  async ({ id, cIn: checkInDate, cOut: checkOutDate, req }) => {
    // console.log(data);
    const { origin } = absoluteUrl(req);

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    let link = `${origin}/api/bookings/check?roomId=${id}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
    const response = await axios.get(link);
    // console.log(response.data);
    return response.data;
  }
);

const initialState = {
  isLoading: false,
  available: null,
  error: null,
};

export const checkBookingSlice = createSlice({
  name: "checkBooking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.available = action.payload.isAvailable;
      })
      .addCase(checkBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default checkBookingSlice.reducer;
