import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  restaurants: [],
  dormitories: [],
  colleges: [],
  floors: [],
  classes: [],
  facultyName: "",
  posts: [],
  majors: [],
  ads: [],
};
const admin = createSlice({
  name: "admin",
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
    setMajors(state, action) {
      state.majors = action.payload;
    },
    setAds(state, action) {
      state.ads = action.payload;
    },
    setAdminState(state, action) {
      state.posts = [];
      state.facultyName = "";
      state.classes = [];
      state.floors = [];
      state.colleges = [];
      state.restaurants = [];
      state.dormitories = [];
      state.majors = [];
    },
  },
});
export const {
  setRestaurants,
  setColleges,
  setFloors,
  setMajors,
  setFacultyName,
  setClasses,
  setPosts,
  setDormitories,
  setAdminState,
  setAds,
} = admin.actions;
export default admin.reducer;
