import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Grid,
  Box,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MapGL, { Marker } from "react-map-gl";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RoomCard from "../../Components/Dormitory/RoomCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Save, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../APIS/dormitoryAPI";
import { setError } from "../../slice/user";
import { setPosts } from "../../slice/dormitory";
import SuccessMessage from "../Success";
const APIKEY =
  "pk.eyJ1IjoiajFyZW4iLCJhIjoiY2xvcm9zdm85MHY5czJrbzZrdXI1amZmMSJ9.UW9QsP8ErGFgGNctDwoG5w";
const DormitoryCard = ({ item }) => {
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const handleSuccessMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessMessageOpen(false);
  };
  const [menuAnchor, setMenuAnchor] = useState(null);
  const navigate = useNavigate();
  const { rooms } = item;
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);
  const posts = useSelector((state) => state.dormitory.posts);
  console.log("rooms=", rooms);
  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleAddRoom = (id) => {
    console.log("addRoom=", id);
    navigate(`/dormitory/roomadd/${id}`);
    setMenuAnchor(null);
  };
  const handleEdit = (id) => {
    console.log("handleEdit=", id);
    navigate(`/dormitory/postedit/${id}`);
    setMenuAnchor(null);
  };
  const handleDelete = async (dormitoryId) => {
    console.log("handleDelete=", id);
    const res = await deletePost(id, dormitoryId);
    console.log("deletePost=", res);
    let { status } = res;
    if (status === 204) {
      const newPost = posts.filter((post) => post.id !== parseInt(dormitoryId));
      dispatch(setPosts(newPost));
      console.log("deleted", posts);
      setSuccessMessageOpen(true);
      setTimeout(() => {
        handleSuccessMessageClose();
      }, 3000);
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
    setMenuAnchor(null);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const [markerPosition, setMarkerPosition] = useState({
    latitude: item.lat,
    longitude: item.lon,
  });
  const [viewport, setViewport] = useState({
    latitude: item.lat,
    longitude: item.lon,
    zoom: 12,
  });
  const renderRoomCards = () => {
    return rooms.map((room, index) => (
      <RoomCard key={index} item={room} dormitoryId={item.id} />
    ));
  };
  return (
    <Card
      sx={{
        width: 800,
        margin: "auto",
        borderRadius: 1,
        boxShadow: 5,
        marginTop: "50px",
      }}
    >
      <CardHeader
        title={
          <>
            <Typography
              variant="body1"
              sx={{ fontWeight: "600", marginBottom: "15px" }}
            >
              {item.name}
            </Typography>
          </>
        }
        avatar={
          <img
            src={item.image !== "" ? item.ownerImage : "path_to_default_image"}
            alt="Profile"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
            }}
          />
        }
        action={
          <div>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleAddRoom(item.id)}>
                Add a Room
              </MenuItem>
              <MenuItem onClick={() => handleEdit(item.id)}>Edit</MenuItem>
              <MenuItem onClick={() => handleDelete(item.id)}>delete</MenuItem>
            </Menu>
          </div>
        }
      />

      <CardMedia
        component="img"
        alt="Dormitory Photo"
        image={item.image !== "" ? item.image : null}
        style={{
          objectFit: "fill",
          width: "100%", // Set the width to 100% to cover the container
          height: "450px", // Set the maximum height
        }}
      />
      <CardContent sx={{ flexDirection: "row", display: "flex" }}>
        <Box sx={{ width: "50%" }}>
          <Typography variant="body1" gutterBottom>
            Rooms: {item.numRooms}
          </Typography>
          <Grid container alignItems="center" spacing={1}>
            {item.gender === "male" && (
              <>
                <Grid item>
                  <Typography variant="body1">Males</Typography>
                </Grid>
              </>
            )}

            {item.gender === "female" && (
              <>
                <Grid item>
                  <Typography variant="body1">Females</Typography>
                </Grid>
              </>
            )}
          </Grid>
          <Typography variant="body1">Phone: {item.phoneNum}</Typography>
          <Typography variant="body1" gutterBottom>
            Services: <i>{item.services}</i>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Distance to campus:</b> {item.distance} km
          </Typography>
        </Box>
        <Box sx={{ width: "50%" }}>
          <MapGL
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            onMove={(evt) => setViewport(evt.viewState)}
            mapboxAccessToken={APIKEY}
          >
            <Marker
              {...markerPosition}
              draggable={false}
              onDragEnd={(event) => {
                const { lngLat } = event;
                setMarkerPosition({
                  latitude: lngLat.lat,
                  longitude: lngLat.lng,
                });
              }}
            />
          </MapGL>
        </Box>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        flexDirection="row"
        flex={1}
        justifyContent="center"
        alignItems="center"
        mt={1}
      >
        <Typography
          sx={{ color: "#8F00FF", fontSize: "20px", fontWeight: "600" }}
        >
          Rooms
        </Typography>
      </Box>

      <CardContent sx={{ mb: 2 }}>
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={2}
          slidesToScroll={1}
        >
          {renderRoomCards()}
        </Slider>
      </CardContent>
      <SuccessMessage
        open={successMessageOpen}
        onClose={handleSuccessMessageClose}
        message="data deleted successfully"
      />
    </Card>
  );
};

export default DormitoryCard;
