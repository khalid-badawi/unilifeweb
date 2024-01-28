import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  menu: [],
  orders: [],
  reviews: [],
  weeklyRevenue: "",
  todayRevenue: "",
  weeklyPerc: "",
  todayPerc: "",
  totalPeople: "",
  dashBoardFood: [],
  totalOrder: "",
  lastReviwer: [],
  isOpen: false,
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
    setTodayRevenue(state, action) {
      state.todayRevenue = action.payload;
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
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setTodayPerc(state, action) {
      state.todayPerc = action.payload;
    },
    setStateRestaurant(state, action) {
      state.lastReviwer = {};
      state.menu = [];
      state.reviews = [];
      state.orders = [];
      state.weeklyRevenue = "";
      state.todayRevenue = "";
      state.weeklyPerc = "";
      state.totalPeople = "";
      state.dashBoardFood = [];
      state.totalOrder = "";
      state.lastReviwer = [];
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
  setTodayRevenue,
  setTotalPeople,
  setDashboard,
  setTotalOrder,
  setLastReviwer,
  setStateRestaurant,
  setIsOpen,
  setTodayPerc,
} = restaurant.actions;
export default restaurant.reducer;
