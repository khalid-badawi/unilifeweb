import { postData } from "../utils/axiosAction";
export const login = async (email, password) =>
  await postData("login", { email, password });
