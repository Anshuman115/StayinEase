import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

export const getAdminRooms = createAsyncThunk(
  `api/admin/rooms`,
  async (req) => {
    const { origin } = absoluteUrl(req);
    // console.log(origin);
    let link = `${origin}/api/admin/rooms`;
    try {
      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const postNewRoom = createAsyncThunk(
  "api/newRoom",
  async ({ req, roomData }) => {
    const { origin } = absoluteUrl(req);
    let link = `${origin}/api/admin/rooms`;
    try {
      // console.log(roomData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(link, roomData, config);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateRoom = createAsyncThunk(
  "api/room/:id",
  async ({ req, roomData, id }, { rejectWithValue }) => {
    const { origin } = absoluteUrl(req);
    let link = `${origin}/api/admin/rooms/${id}`;
    try {
      // console.log(roomData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(origin, link, roomData);
      const { data } = await axios.put(link, roomData, config);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "api/admin/room/:id",
  async ({ req, id }) => {
    const { origin } = absoluteUrl(req);
    let link = `${origin}/api/rooms/${id}`;
    try {
      // console.log(roomData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.delete(link, config);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  rooms: [],
  isLoading: false,
  error: null,
  success: false,
};

export const adminRoomsSlice = createSlice({
  name: "adminRooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminRooms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdminRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rooms = action.payload.rooms;
      })
      .addCase(getAdminRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
      });
  },
});

export default adminRoomsSlice.reducer;
