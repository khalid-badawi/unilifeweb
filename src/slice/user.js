import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: "",
  role: "",
  isAuth: false,
  error: "",
  sidebar: [],
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
    setSidebar(state, action) {
      state.error = action.payload;
    },
    setSatesUser(state, action) {
      state.error = "";
      state.isAuth = false;
      state.isAuth = false;
      state.isAuth = "";
    },
  },
});
export const { setId, setRole, setIsAuth, setError, setSidebar, setSatesUser } =
  user.actions;
export default user.reducer;
