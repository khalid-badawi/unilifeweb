import React, { useState } from "react";
import { Card, Typography, Button, Grid, Box } from "@mui/material";
//import MoreVertIcon from "@mui/icons-material/MoreVert";
//import { Save, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { deleteRoom } from "../../APIS/dormitoryAPI";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slice/user";
import { setPosts } from "../../slice/dormitory";
import SuccessMessage from "../Success";
const RoomCard = ({ item, dormitoryId }) => {
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const handleSuccessMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessMessageOpen(false);
  };
  const id = useSelector((state) => state.user.id);
  const posts = useSelector((state) => state.dormitory.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const typeCap = capitalizeFirstLetter(item.type);

  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    console.log("edit room");
    navigate(`/dormitory/roomedit/${dormitoryId}/${item.id}`);
    handleMenuClose();
  };

  const handleDelete = async () => {
    const res = await deleteRoom(id, dormitoryId, item.id);
    let { status } = res;
    console.log(res);
    if (status === 204) {
      const post = posts.filter((post) => post.id === parseInt(dormitoryId))[0];
      const { rooms } = post;
      const newRooms = rooms.filter((room) => room.id !== item.id);
      const newPost = posts.map((post) =>
        post.id === parseInt(dormitoryId) ? { ...post, rooms: newRooms } : post
      );
      dispatch(setPosts(newPost));
      setSuccessMessageOpen(true);
      setTimeout(() => {
        handleSuccessMessageClose();
      }, 3000);
      console.log("deleted", posts);
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
    handleMenuClose();
  };

  return (
    <Card sx={{ width: 350, margin: "5px", borderRadius: 1, boxShadow: 5 }}>
      <Box sx={{ width: "100%" }}>
        <img
          src={item.image}
          alt="Dormitory"
          style={{ width: "100%", height: 220, objectFit: "fill" }}
        />
      </Box>

      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {item.type} Room
          </Typography>
          <Typography variant="body1">
            {item.avilableSeat} Places Available ({item.numberOfPerson} Total)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            sx={{ color: "#8F00FF", fontWeight: "bold" }}
          >
            Monthly Rent: {item.rent}₪
          </Typography>
        </Grid>
      </Grid>

      <Button
        type="button"
        sx={{
          color: "#8F00FF",
          paddingY: 1,
          height: 40,
          ":hover": {
            backgroundColor: "rgba(0,0,0,0.05)",
            cursor: "pointer",
          },
        }}
        onClick={() => handleEdit()}
      >
        Edit
      </Button>
      <Button
        type="button"
        sx={{
          color: "#8F00FF",
          paddingY: 1,
          height: 40,
          ":hover": {
            backgroundColor: "rgba(0,0,0,0.05)",
            cursor: "pointer",
          },
        }}
        onClick={handleDelete}
      >
        Delete
      </Button>
      <SuccessMessage
        open={successMessageOpen}
        onClose={handleSuccessMessageClose}
        message="Data deleted successfully!" // Customize the success message
      />
    </Card>
  );
};

export default RoomCard;
