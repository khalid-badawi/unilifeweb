import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: "",
  role: "",
  isAuth: false,
  error: "",
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
  },
});
export const { setId, setRole, setIsAuth, setError } = user.actions;
export default user.reducer;
