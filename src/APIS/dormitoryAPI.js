import { postDataWithFiles } from "../utils/axiosAction";
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
