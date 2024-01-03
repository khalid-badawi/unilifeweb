import {
  getData,
  postData,
  postDataFiles,
  deleteData,
} from "../utils/axiosAction";

export const getMyMenu = async (id) => {
  const token = localStorage.getItem("token");
  const response = await getData("menu", token, id);
  console.log(response);
  return response;
};
export async function addToMenu(id, data, image) {
  const token = localStorage.getItem("token");
  console.log(token);
  return await postDataFiles("menu", data, image, token, id);
  /*console.log(response);
  return response.data.data;*/
}
export async function deleteFood(restaurantId, foodId) {
  const token = localStorage.getItem("token");
  const response = await deleteData("menu", token, foodId, restaurantId);
  console.log(response);
  return response;
}
export async function getOrders(restaurantId) {
  const token = localStorage.getItem("token");
  const response = await getData("orders/restaurant", token, restaurantId);
  //console.log(response);
  return response;
}
export async function updateOrders(restaurantId, orderId) {
  /*const token = localStorage.getItem("token");
  const response = await getData("orders/restaurant", token, restaurantId);
  //console.log(response);
  return response;*/
}
