import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStore } from "store";
import { Project } from "./list";
import { User } from "./search-panel";
import { AppDispatch } from "store";

interface State {
  projectModalOpen: boolean;
  projects: Project[];
  user: User | null;
}

const initialState: State = {
  projectModalOpen: false,
  projects: [],
  user: null,
};

export const projectListSlice = createSlice({
  name: "projectList",
  initialState,
  reducers: {
    openProjectModal: (state: any) => {
      state.projectModalOpen = true;
    },
    closeProjectModal: (state: any) => {
      state.projectModalOpen = false;
    },
    setProjectList: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { setProjectList } = projectListSlice.actions;

export const refreshProjects = (promise: Promise<Project[]>) => {
  return (dispatch: AppDispatch) => {
    promise.then((projects) => dispatch(setProjectList(projects)));
  };
};

export const projectListActions = projectListSlice.actions;

export const selectProjectModalOpen = (state: RootStore) =>
  state.projectList.projectModalOpen;
