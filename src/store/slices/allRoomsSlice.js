import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllRooms = createAsyncThunk(
  `rooms/fetchAllRooms`,
  async (data) => {
    let { page = 1, location = "" } = data;
    console.log(page, location);
    const response = await axios.get(
      `http://localhost:3000/api/rooms?page=${page}&location=${location}`
    );
    return response.data;
  }
);

const initialState = {
  rooms: [],
  roomsCount: 0,
  resPerPage: null,
  filteredRoomsCount: 0,
  isLoading: false,
  error: null,
  success: false,
};

export const allRoomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRooms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rooms = action.payload.rooms;
        state.roomsCount = action.payload.roomsCount;
        state.resPerPage = action.payload.resPerPage;
        state.filteredRoomsCount = action.payload.filteredRoomsCount;
      })
      .addCase(fetchAllRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.successc = true;
      });
  },
});

// export const selectComments = (state) => state.comments.value;
export default allRoomsSlice.reducer;
