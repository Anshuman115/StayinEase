import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const checkBookedDates = createAsyncThunk(
  `api/bookings/check`,
  async (data) => {
    const { id } = data;
    let link = `http://localhost:3000/api/bookings/check_booked_dates?roomId=${id}`;
    const response = await axios.get(link);
    // console.log(response.data);
    return response.data;
  }
);

const initialState = {
  isLoading: false,
  dates: [],
  error: null,
};

export const checkBookedDatesSlice = createSlice({
  name: "checkBookedDates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkBookedDates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkBookedDates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dates = action.payload.bookedDates;
      })
      .addCase(checkBookedDates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default checkBookedDatesSlice.reducer;
