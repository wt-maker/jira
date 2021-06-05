import { configureStore } from "@reduxjs/toolkit";
import { projectListSlice } from "screens/project-list/project-list.slice";
import { authSlice } from "./auth.slice";

export const RootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer: RootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootStore = ReturnType<typeof store.getState>;
