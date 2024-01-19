import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  posts: [],
};
const dormitory = createSlice({
  name: "dormitory",
  initialState,
  reducers: {
    setDormitories(state, action) {
      state.dormitories = action.payload;
    },
    setRestaurants(state, action) {
      state.restaurants = action.payload;
    },
    setColleges(state, action) {
      state.colleges = action.payload;
    },
    setFloors(state, action) {
      state.floors = action.payload;
    },
    setClasses(state, action) {
      state.classes = action.payload;
    },
    setFacultyName(state, action) {
      state.facultyName = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
  },
});
export const {
  setRestaurants,
  setColleges,
  setFloors,
  setFacultyName,
  setClasses,
  setPosts,
  setDormitories,
} = dormitory.actions;
export default dormitory.reducer;
