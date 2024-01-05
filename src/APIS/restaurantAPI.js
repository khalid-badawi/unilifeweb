import {
  getData,
  postDataFiles,
  deleteData,
  putDataFiles,
  putData,
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
export async function editMenu(id, foodId, data, image) {
  const token = localStorage.getItem("token");
  console.log(token);
  return await putDataFiles("menu", data, image, token, foodId, id);
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
  const token = localStorage.getItem("token");
  const response = await putData(
    "order",
    { id: "111" },
    token,
    restaurantId,
    orderId
  );
  return response;
}
export async function getWeeklyRevenue(restaurantId) {
  const token = localStorage.getItem("token");
  const response = await getData("weeklydashboard", token, restaurantId);
  return response;
}
export async function getTotalPeople(restaurantId) {
  const token = localStorage.getItem("token");
  const response = await getData("totalpeople", token, restaurantId);
  return response;
}
export async function getDashboardFood(restaurantId) {
  const token = localStorage.getItem("token");
  const response = await getData("dashboard/food", token, restaurantId);
  return response;
}
export async function getTotalOrder(restaurantId) {
  const token = localStorage.getItem("token");
  const response = await getData("totalorder", token, restaurantId);
  console.log(response);
  return response;
}
