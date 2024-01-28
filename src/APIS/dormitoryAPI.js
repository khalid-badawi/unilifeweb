import {
  deleteData,
  getData,
  postDataFiles,
  postDataWithFiles,
  putDataFiles,
} from "../utils/axiosAction";
export const addPost = async (id, dormitoryValues, roomsValue) => {
  console.log("posts=", dormitoryValues);
  let files = [];
  files.push(dormitoryValues.dormitoryImage);
  const { rooms } = roomsValue;
  for (let i = 0; i < rooms.length; i++) {
    console.log("images i=", rooms[i].roomImage);
    files.push(rooms[i].roomImage);
    rooms[i].roomImage = undefined;
  }
  console.log("files=", files);
  const data = {
    distance: dormitoryValues.distance,
    gender: dormitoryValues.gender,
    name: dormitoryValues.dormitoryName,
    numberOfRoom: dormitoryValues.numberOfRoom,
    services: dormitoryValues.services,
    lon: dormitoryValues.markerPosition.longitude,
    lat: dormitoryValues.markerPosition.latitude,
    rooms,
  };
  const token = localStorage.getItem("token");
  const res = await postDataWithFiles(
    "dormitory",
    JSON.stringify(data),
    files,
    token,
    id
  );
  return res;
};
export const getPosts = async (id) => {
  const token = localStorage.getItem("token");
  const res = await getData("mydormitory", token, id);
  return res;
};
export const addRoom = async (id, dormitoryId, values) => {
  const { numberOfPerson, avilableSeat, type, rent, roomImage } = values;
  const roomsValue = { numberOfPerson, avilableSeat, type, rent };
  const token = localStorage.getItem("token");
  console.log(roomsValue);
  console.log(roomImage);
  const res = await postDataFiles(
    "room",
    JSON.stringify(roomsValue),
    roomImage,
    token,
    id,
    dormitoryId
  );
  return res;
};
export const editPost = async (id, dormitoryId, values) => {
  const {
    dormitoryName,
    services,
    gender,
    dormitoryImage,
    lat,
    lon,
    distance,
  } = values;
  const postValues = {
    name: dormitoryName,
    services,
    gender,
    lat,
    lon,
    distance,
  };
  const token = localStorage.getItem("token");
  console.log("in edited");
  console.log(postValues);
  console.log(dormitoryImage);
  const res = await putDataFiles(
    "dormitory",
    JSON.stringify(postValues),
    dormitoryImage,
    token,
    id,
    dormitoryId
  );
  return res;
};
export const deletePost = async (id, dormitoryId) => {
  const token = localStorage.getItem("token");
  const res = await deleteData("dormitory", token, id, dormitoryId);
  return res;
};
export const editRoom = async (id, dormitoryId, roomId, values) => {
  const { roomImage, URL, numberOfPerson, avilableSeat, type, rent } = values;
  const roomValues = {
    URL,
    numberOfPerson,
    avilableSeat,
    type,
    rent,
  };
  const token = localStorage.getItem("token");
  const res = await putDataFiles(
    "room",
    JSON.stringify(roomValues),
    roomImage,
    token,
    id,
    dormitoryId,
    roomId
  );
  return res;
};
export const deleteRoom = async (id, dormitoryId, roomId) => {
  const token = localStorage.getItem("token");
  const res = await deleteData("room", token, id, dormitoryId, roomId);
  return res;
};
