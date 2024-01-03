import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  menu: [],
  orders: [],
  reviewsData: [],
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
  },
});
export const { addFood, setMenu, setOrder, addReview } = restaurant.actions;
export default restaurant.reducer;
