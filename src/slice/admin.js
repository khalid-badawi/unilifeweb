import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  restaurants: [],
  colleges: [],
  floors: [],
  classes: [],
  facultyName: "",
};
const admin = createSlice({
  name: "admin",
  initialState,
  reducers: {
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
  },
});
export const {
  setRestaurants,
  setColleges,
  setFloors,
  setFacultyName,
  setClasses,
} = admin.actions;
export default admin.reducer;
