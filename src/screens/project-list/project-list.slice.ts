import { createSlice } from "@reduxjs/toolkit";
import { RootStore } from "store";

export const projectListSlice = createSlice({
  name: "projectList",
  initialState: {
    projectModalOpen: false,
  },
  reducers: {
    openProjectModal: (state: any) => {
      state.projectModalOpen = true;
    },
    closeProjectModal: (state: any) => {
      state.projectModalOpen = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;

export const selectProjectModalOpen = (state: RootStore) =>
  state.projectList.projectModalOpen;
