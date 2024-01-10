import { configureStore } from "@reduxjs/toolkit";
import restaurant from "./slice/restaurant";
import user from "./slice/user";
import admin from "./slice/admin";
const store = configureStore({
  reducer: {
    user,
    restaurant,
    admin,
  },
});
export default store;
