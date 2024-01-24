import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  posts: [],
};
const dormitory = createSlice({
  name: "dormitory",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setStateDormitory(state, action) {
      state.posts = [];
    },
  },
});
export const { setPosts, setStateDormitory } = dormitory.actions;
export default dormitory.reducer;
