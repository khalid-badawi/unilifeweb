import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import restaurantReducer from "./slice/restaurant";
import userReducer from "./slice/user";
import adminReducer from "./slice/admin";
import dormitoryReducer from "./slice/dormitory";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  restaurant: restaurantReducer,
  admin: adminReducer,
  dormitory: dormitoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  /*reducer: {
    user: userReducer,
    restaurant: restaurantReducer,
    admin: adminReducer,
  },*/
});

export const persistor = persistStore(store);
