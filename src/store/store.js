import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { roomsApi } from "./services/roomsApi";
import allRoomsSlice from "./slices/allRoomsSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [allRoomsSlice.name]: allRoomsSlice.reducer,
      [roomsApi.reducerPath]: roomsApi.reducer,
    },
    devTools: true,

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(roomsApi.middleware),
  });

export const wrapper = createWrapper(makeStore);

//redux toolkit
//components => store,slices, api calls;
//store => configureStore({reducer:{}}) => export const
//slices => createSlice({name,initialState,reducers => {actions}}) => export reducer and export actions
//
