import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  menu: [],
  orders: [],
  reviews: [],
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

    setReviews(state, action) {
      state.reviews = action.payload;
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
    setStateRestaurant(state, action) {
      state.lastReviwer = {};
      state.menu = [];
      state.reviews = [];
      state.orders = [];
      state.weeklyRevenue = "";
      state.weeklyPerc = "";
      state.totalPeople = "";
      state.dashBoardFood = [];
      state.totalOrder = "";
    },
  },
});
export const {
  addFood,
  setMenu,
  setOrder,
  setReviews,
  setWeeklyRevenue,
  setWeeklyPerc,
  setTotalPeople,
  setDashboard,
  setTotalOrder,
  setLastReviwer,
  setStateRestaurant,
} = restaurant.actions;
export default restaurant.reducer;
