import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

export const fetchAllRooms = createAsyncThunk(
  `rooms/fetchAllRooms`,
  async (
    { req, page = 1, location = "", guest, category },
    { rejectWithValue }
  ) => {
    // let { page = 1, location = "", req } = data;
    const { origin } = absoluteUrl(req);
    // console.log(page, location);
    let link = `${origin}/api/rooms?page=${page}&location=${location}`;
    try {
      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
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
        state.success = false;
      });
  },
});

// export const selectComments = (state) => state.comments.value;
export default allRoomsSlice.reducer;
