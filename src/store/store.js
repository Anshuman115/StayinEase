import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import allRoomsReducer from "./slices/allRoomsSlice";
import singleRoomsReducer from "./slices/singleRoomsSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      rooms: allRoomsReducer,
      singleRoom: singleRoomsReducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);

//redux toolkit
//components => store,slices, api calls;
//store => configureStore({reducer:{}}) => export const
//slices => createSlice({name,initialState,reducers => {actions}}) => export reducer and export actions
//
