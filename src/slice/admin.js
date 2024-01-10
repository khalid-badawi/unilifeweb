import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  restaurants: [],
  colleges: [],
  floors: [],
  facultytName: "",
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
    setFacultytName(state, action) {
      state.facultytName = action.payload;
    },
  },
});
export const { setRestaurants, setColleges, setFloors, setFacultytName } =
  admin.actions;
export default admin.reducer;
