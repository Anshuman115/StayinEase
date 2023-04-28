import {
  combineReducers,
  configureStore,
  createReducer,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import allRoomsReducer from "./slices/allRoomsSlice";
import singleRoomsReducer from "./slices/singleRoomsSlice";
import usersReducer from "./slices/usersSlice";
import userUpdateReducer from "./slices/updateUserSlice";
import forgotPasswordReducer from "./slices/forgotPasswordSlice";

const combinedReducers = combineReducers({
  rooms: allRoomsReducer,
  singleRoom: singleRoomsReducer,
  userAuth: usersReducer,
  userUpdate: userUpdateReducer,
  forgotPassword: forgotPasswordReducer,
});

const rootReducer = createReducer(
  combinedReducers(undefined, { type: "" }),
  (builder) => {
    builder
      .addCase("__NEXT_REDUX_WRAPPER_HYDRATE__", (state, action) => ({
        ...state,
        ...action.payload,
      }))
      .addDefaultCase(combinedReducers);
  }
);

const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  });
  return store;
};
export const wrapper = createWrapper(makeStore, { debug: true });

//redux toolkit
//components => store,slices, api calls;
//store => configureStore({reducer:{}}) => export const
//slices => createSlice({name,initialState,reducers => {actions}}) => export reducer and export actions
//
