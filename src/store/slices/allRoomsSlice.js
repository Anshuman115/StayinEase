import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  rooms: [],
};

export const allRoomsSlice = createSlice({
  name: "allRooms",
  initialState,
  reducers: {
    // Actions
    getRooms: (state, action) => {
      state.roomsCount = action.payload.roomsCount;
      state.rooms = action.payload.rooms;
      state.resPerPage = action.payload.resPerPage;
      state.filteredRoomsCount = action.payload.filteredRoomsCount;
    },
    // Special reducer for hydrating the state
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      },
    },
  },
});

export const { getRooms } = allRoomsSlice.actions;
// export const selectComments = (state) => state.comments.value;
export default allRoomsSlice;
