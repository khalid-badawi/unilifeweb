import {
  getData,
  postDataFiles,
  deleteData,
  putDataFiles,
  putData,
  postData,
  getDataQuery,
} from "../utils/axiosAction";
/* Restaurants API  */
export async function addRestaurant(adminId, data) {
  const {
    image,
    email,
    restaurantName,
    password,
    confirmPassword,
    phoneNum,
    restaurantDesc,
  } = data;
  const value = {
    username: restaurantName,
    email,
    password,
    confirmPassword,
    phoneNum,
    restaurantDesc,
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

export async function editRestaurants(data, adminId, restaurantId) {
  const { image, email, restaurantName, phoneNum } = data;
  const value = {
    username: restaurantName,
    email,
    phoneNum,
  };
  const token = localStorage.getItem("token");

  console.log("edit:", data);
  const res = await putDataFiles(
    "restaurants",
    JSON.stringify(value),
    image,
    token,
    adminId,
    restaurantId
  );
  return res;
}
export async function deleteRestaurants(adminId, restaurantId) {
  const token = localStorage.getItem("token");
  const res = await deleteData("restaurants", token, adminId, restaurantId);
  return res;
}
export async function getRestaurants(adminId) {
  const token = localStorage.getItem("token");
  const res = await getData("restaurants", token, adminId);
  return res;
}
/* Restaurants API End */
/* faculty API  */
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
/* faculty API End */
/* student API */
export async function blockStudent(adminId, studentId) {
  //  console.log(facultyId, " ", floorId);
  const token = localStorage.getItem("token");
  const res = await putData(
    "student/block",
    { blocked: true },
    token,
    adminId,
    studentId
  );
  return res;
}
export async function getStudents(adminId) {
  //  console.log(facultyId, " ", floorId);
  const token = localStorage.getItem("token");
  const res = await getData("student", token, adminId);
  return res;
}
export async function getLatsPosts(adminId) {
  //  console.log(facultyId, " ", floorId);
  const token = localStorage.getItem("token");
  const res = await getData("lastposts", token, adminId);
  return res;
}
export async function deletePost(adminId, studentId, postId) {
  //  console.log(facultyId, " ", floorId);
  const token = localStorage.getItem("token");
  const res = await deleteData("post", token, adminId, studentId, postId);
  return res;
}
/* student API  End*/
/*Dormoitory API */
export async function addDormitory(adminId, data) {
  const {
    image,
    email,
    dormitoryName,
    password,
    confirmPassword,
    phoneNum,
    SSN,
  } = data;
  const value = {
    username: dormitoryName,
    email,
    password,
    confirmPassword,
    phoneNum,
    SSN,
  };

  console.log("value:", value);
  const token = localStorage.getItem("token");
  const res = await postDataFiles(
    "dormitoryowner",
    JSON.stringify(value),
    image,
    token,
    adminId
  );
  return res;
}
export async function getDormitory(adminId) {
  const token = localStorage.getItem("token");
  const res = await getData("dormitoryowner", token, adminId);
  return res;
}
export async function editDormitory(adminId, dormitoryId, data) {
  const { image, email, dormitoryName, phoneNum, SSN } = data;
  const value = {
    username: dormitoryName,
    email,
    phoneNum,
    SSN,
  };
  const token = localStorage.getItem("token");
  const res = await putDataFiles(
    "dormitoryowner",
    JSON.stringify(value),
    image,
    token,
    adminId,
    dormitoryId
  );
  return res;
}
export async function deleteDormitory(adminId, dormitoryId) {
  const token = localStorage.getItem("token");
  const res = await deleteData("dormitoryowner", token, adminId, dormitoryId);
  return res;
}
/*Dormoitory API end */
/*DashBoard API  */
export async function getUserJoined(adminId) {
  const token = localStorage.getItem("token");
  const res = await getData("userjoin", token, adminId);
  return res;
}
export async function getTotalPosts(adminId) {
  const token = localStorage.getItem("token");
  const res = await getData("totalpost", token, adminId);
  return res;
}
export async function getTopResaurants(adminId) {
  const token = localStorage.getItem("token");
  const res = await getData("popularrestaurant", token, adminId);
  return res;
}
export async function getPoularResaurants(adminId, dormitoryId, values) {
  const token = localStorage.getItem("token");
  const res = await getData("toprestaurant", token, adminId);
  return res;
}
export async function getDormitoryPostCount(adminId) {
  const token = localStorage.getItem("token");
  const res = await getData("dormitorycount", token, adminId);
  return res;
}
export async function getReportedPostCount(adminId) {
  const token = localStorage.getItem("token");
  const res = await getData("reportppostcount", token, adminId);
  return res;
}
/*DashBoard API End*/

/*major API*/
export async function addMajor(adminId, values) {
  const token = localStorage.getItem("token");
  const res = await postData("major", values, token, adminId);
  return res;
}
export async function getMajor(adminId) {
  const token = localStorage.getItem("token");
  const res = await getData("major", token, adminId);
  return res;
}
export async function removeMajor(adminId, majorId) {
  const token = localStorage.getItem("token");
  const res = await deleteData("major", token, adminId, majorId);
  return res;
}
/*major API End*/
/*ADDs API */
export async function addAdds(adminId, data) {
  const { image, title, description, link } = data;
  const value = {
    title,
    description,
    link,
  };
  console.log("value:", value);
  const token = localStorage.getItem("token");
  const res = await postDataFiles(
    "adds",
    JSON.stringify(value),
    image,
    token,
    adminId
  );
  return res;
}
export async function editAd(adminId, adId, data) {
  const { image, title, description, link } = data;
  const value = {
    title,
    description,
    link,
  };
  console.log("value:", value);
  const token = localStorage.getItem("token");
  const res = await putDataFiles(
    "adds",
    JSON.stringify(value),
    image,
    token,
    adminId,
    adId
  );
  return res;
}
export async function deleteAd(adminId, adId) {
  const token = localStorage.getItem("token");
  const res = await deleteData("adds", token, adminId, adId);
  return res;
}
export async function getAdds(adminId) {
  const token = localStorage.getItem("token");
  console.log("adminId", adminId);
  const res = await getData("alladds", token, adminId);
  return res;
}
/*ADDs API End*/
export async function searchPost(adminId, data) {
  const token = localStorage.getItem("token");
  console.log("adminId", adminId);
  const res = await getDataQuery("alladds", data, token, adminId);
  return res;
}
/*{type:"reported",studentId:}*/
