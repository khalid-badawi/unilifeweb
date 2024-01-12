import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  menu: [],
  orders: [],
  reviewsData: [],
  weeklyRevenue: "",
  weeklyPerc: "",
  totalPeople: "",
  dashBoardFood: [],
  totalOrder: "",
  lastReviwer: {},
};
const restaurant = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    addFood(state, action) {
      state.menu.push(action.payload);
    },
    setMenu(state, action) {
      state.menu = action.payload;
    },
    setOrder(state, action) {
      state.orders = action.payload;
    },

    addReview(state, action) {
      state.reviewsData.push(action.payload);
    },
    setWeeklyRevenue(state, action) {
      state.weeklyRevenue = action.payload;
    },
    setWeeklyPerc(state, action) {
      state.weeklyPerc = action.payload;
    },
    setTotalPeople(state, action) {
      state.totalPeople = action.payload;
    },
    setDashboard(state, action) {
      state.dashBoardFood = action.payload;
    },
    setTotalOrder(state, action) {
      state.totalOrder = action.payload;
    },
    setLastReviwer(state, action) {
      state.lastReviwer = action.payload;
    },
  },
});
export const {
  addFood,
  setMenu,
  setOrder,
  addReview,
  setWeeklyRevenue,
  setWeeklyPerc,
  setTotalPeople,
  setDashboard,
  setTotalOrder,
  setLastReviwer,
} = restaurant.actions;
export default restaurant.reducer;
