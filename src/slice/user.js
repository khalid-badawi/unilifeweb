import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: "",
  role: "",
  isAuth: false,
  error: "",
  username: "",
  image: "",
};
const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setImage(state, action) {
      state.image = action.payload;
    },

    setSatesUser(state, action) {
      state.error = "";
      state.role = false;
      state.id = false;
      state.isAuth = "";
      state.username = "";
      state.image = "";
    },
  },
});
export const {
  setId,
  setRole,
  setIsAuth,
  setError,
  setSidebar,
  setUsername,
  setImage,
  setSatesUser,
} = user.actions;
export default user.reducer;
