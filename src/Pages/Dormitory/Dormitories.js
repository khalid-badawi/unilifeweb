import React, { useState } from "react";
import DormitoryCard from "../../Components/Dormitory/DormitoryCard";
import { Box, Grid } from "@mui/material";
import SuccessMessage from "../../Components/Success";
import Topbar from "../../Components/Restaurant/Topbar";
import RoomCard from "../../Components/Dormitory/RoomCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const dormitoryData = [
  {
    id: 1,
    username: "John Doe",
    ownerImage:
      "https://firebasestorage.googleapis.com/v0/b/unilife-1b22d.appspot.com/o/restaurant%2F4?alt=media&token=8f4c3666-7678-4a8a-9c7d-69d42d0c7bd7",
    image:
      "https://firebasestorage.googleapis.com/v0/b/unilife-1b22d.appspot.com/o/adds%2F2?alt=media&token=afa33fb8-ed90-4bdf-aa7e-115742115cbc",
    numRooms: 10,
    gender: "male",
    phoneNum: "0597401453",
    services: "Wi-Fi, Laundry, Parking",
    distance: 2,
    lat: 40.7128,
    lon: -74.006,
    saved: false,
  },
];
const dummyRoomData = [
  {
    type: "single",
    image:
      "https://firebasestorage.googleapis.com/v0/b/unilife-1b22d.appspot.com/o/restaurant%2F4?alt=media&token=8f4c3666-7678-4a8a-9c7d-69d42d0c7bd7",
    avilableSeat: 1,
    numberOfPerson: 1,
    rent: 500,
  },
  {
    type: "double",
    image:
      "https://firebasestorage.googleapis.com/v0/b/unilife-1b22d.appspot.com/o/restaurant%2F4?alt=media&token=8f4c3666-7678-4a8a-9c7d-69d42d0c7bd7",
    avilableSeat: 2,
    numberOfPerson: 2,
    rent: 800,
  },
  // Add more dummy data as needed
];
const Dormitories = () => {
  const [successMessageOpen, setSuccessMessageOpen] = useState(true);
  const handleSuccessMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessMessageOpen(false);
  };

  const renderRoomCards = () => {
    return dummyRoomData.map((room, index) => (
      <RoomCard key={index} item={room} index={index} />
    ));
  };

  return (
    <Box pl={2} pb={2} className="contentContainer">
      <Topbar></Topbar>
      <Box className="sidebar">{/* ... (your sidebar content) */}</Box>
      <Box className="posts" overflow="auto" maxHeight="89vh">
        {dormitoryData.map((item) => (
          <DormitoryCard key={item.id} item={item} />
        ))}
        <SuccessMessage
          open={successMessageOpen}
          onClose={handleSuccessMessageClose}
          message="Data added successfully!" // Customize the success message
        />
      </Box>
    </Box>
  );
};

export default Dormitories;
