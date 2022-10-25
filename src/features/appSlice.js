import { createSlice } from "@reduxjs/toolkit";

// STATE
const initialState = {
  addPostIsOpen: false,
  posts: [],
  selectedProfile: {},
};

// MUTATIONS
export const appSlice = createSlice({
  name: "PostingApp",
  initialState,
  reducers: {

    setAddPostModal: (state, action) => {
      state.addPostIsOpen = action.payload.addPostIsOpen;
    },

    SetPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    SetSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload.selectedProfile;
    },
  },
});

// ACTIONS
export const {
  setAddPostModal,
  SetPosts,
  SetSelectedProfile,
} = appSlice.actions;

// GETTERS
export const selectAddPostIsOpen = (state) => state.app.addPostIsOpen;
export const selectPosts = (state) => state.app.posts;
export const SelectProfile = (state) => state.app.selectedProfile;

// MAIN
export default appSlice.reducer;
