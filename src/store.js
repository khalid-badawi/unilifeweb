import { configureStore } from "@reduxjs/toolkit";
import user from "./slice/user";
//import adminSlice from "./slice/adminSlice";*/
import restaurant from "./slice/restaurant";
const store = configureStore({
  reducer: {
    user: user,
    // admin: adminSlice,
    restaurant: restaurant,
  },
});
export default store;
