import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

export const fetchRoom = createAsyncThunk(
  `rooms/fetchRoom`,
  async ({ query, req }) => {
    const { id } = query;
    const { origin } = absoluteUrl(req);

    const response = await axios.get(`${origin}/api/rooms/${id}`);
    // console.log(response);
    return response.data;
  }
);

const initialState = {
  room: {},
  isLoading: false,
  error: null,
  success: false,
};

export const singleRoomsSlice = createSlice({
  name: "singleRoom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoom.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.room = action.payload.room;
      })
      .addCase(fetchRoom.rejected, (state) => {
        state.isLoading = false;
        state.success = true;
      });
  },
});

export default singleRoomsSlice.reducer;
