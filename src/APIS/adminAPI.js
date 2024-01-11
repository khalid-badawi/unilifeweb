import {
  getData,
  postDataFiles,
  deleteData,
  putDataFiles,
  putData,
  postData,
} from "../utils/axiosAction";
export async function addRestaurant(adminId, data) {
  const { image, email, restaurantName, password, confirmPassword, phoneNum } =
    data;
  const value = {
    username: restaurantName,
    email,
    password,
    confirmPassword,
    phoneNum,
  };
  console.log("value:", value);
  const token = localStorage.getItem("token");
  const res = await postDataFiles(
    "restaurants",
    JSON.stringify(value),
    image,
    token,
    adminId
  );
  return res;
}
export async function addFaculty(adminId, data) {
  const token = localStorage.getItem("token");
  const res = await postData("faculty", data, token, adminId);
  return res;
}
export async function editFaculty(adminId, facultyId, data) {
  const token = localStorage.getItem("token");
  const res = await putData("faculty", data, token, adminId, facultyId);
  return res;
}
export async function deleteFaculty(adminId, facultyId) {
  const token = localStorage.getItem("token");
  const res = await deleteData("faculty", token, adminId, facultyId);
  return res;
}
export async function getFaculties(adminId) {
  const token = localStorage.getItem("token");
  const res = await getData("faculty", token, adminId);
  return res;
}
export async function addFloor(data, adminId, facultyId) {
  const token = localStorage.getItem("token");
  const res = await postData("floor", data, token, adminId, facultyId);
  return res;
}
export async function deleteFloor(adminId, floorId, facultyId) {
  const token = localStorage.getItem("token");
  const res = await deleteData("floor", token, adminId, floorId, facultyId);
  return res;
}
export async function getFloors(adminId, facultyId) {
  const token = localStorage.getItem("token");
  const res = await getData("floor", token, adminId, facultyId);
  return res;
}
export async function addCalss(data, adminId, facultyId, floorId) {
  const token = localStorage.getItem("token");
  const res = await postData("class", data, token, adminId, facultyId, floorId);
  return res;
}
export async function deleteCalss(adminId, classId) {
  //  console.log(facultyId, " ", floorId);
  const token = localStorage.getItem("token");
  const res = await deleteData("class", token, adminId, classId);
  return res;
}
export async function getCalsses(adminId, facultyId, floorId) {
  console.log(facultyId, " ", floorId);
  const token = localStorage.getItem("token");
  const res = await getData("class", token, adminId, facultyId, floorId);
  return res;
}
export async function getStudents(adminId) {
  //  console.log(facultyId, " ", floorId);
  const token = localStorage.getItem("token");
  const res = await getData("student", token, adminId);
  return res;
}
