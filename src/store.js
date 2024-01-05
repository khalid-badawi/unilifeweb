import { configureStore } from "@reduxjs/toolkit";
import restaurant from "./slice/restaurant";
import user from "./slice/user";
const store = configureStore({
  reducer: {
    user,
    restaurant,
  },
});
export default store;
