import React, { useEffect, useState } from "react";
import DormitoryCard from "../../Components/Dormitory/DormitoryCard";
import { Box, Grid } from "@mui/material";
import SuccessMessage from "../../Components/Success";
import Topbar from "../../Components/Restaurant/Topbar";
import RoomCard from "../../Components/Dormitory/RoomCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../APIS/dormitoryAPI";
import { setError } from "../../slice/user";
import { setPosts } from "../../slice/dormitory";
import { useNavigate } from "react-router";
const Dormitories = () => {
  const [successMessageOpen, setSuccessMessageOpen] = useState(true);
  const posts = useSelector((state) => state.dormitory.posts);
  const id = useSelector((state) => state.user.id);
  console.log("posts=", posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const res = await getPosts(id);
      let { status } = res;
      if (status === 200) {
        const { data } = res;
        console.log("data=", data);
        dispatch(setPosts(data));
      } else {
        status = res.response.status;
        if (
          status === 401 ||
          status === 403 ||
          status === 404 ||
          status === 500
        ) {
          const {
            response: {
              data: { message },
            },
          } = res;
          dispatch(setError(message));
        } else {
          dispatch(setError("An error occured please try again"));
        }
        navigate("/error");
      }
    }
    fetchData();
  }, []);
  const handleSuccessMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessMessageOpen(false);
  };

  const renderRoomCards = () => {
    return posts.map((room, index) => (
      <RoomCard key={index} item={room} index={index} />
    ));
  };

  return (
    <>
      {posts.length > 0 && (
        <Box pl={2} pb={2} className="contentContainer">
          <Topbar></Topbar>
          <Box className="sidebar">{/* ... (your sidebar content) */}</Box>
          <Box className="posts" overflow="auto" maxHeight="89vh">
            {posts.map((item) => (
              <DormitoryCard key={item.id} item={item} />
            ))}
            <SuccessMessage
              open={successMessageOpen}
              onClose={handleSuccessMessageClose}
              message="Data added successfully!" // Customize the success message
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Dormitories;
