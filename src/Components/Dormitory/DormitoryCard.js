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
const APIKEY =
  "pk.eyJ1IjoiajFyZW4iLCJhIjoiY2xvcm9zdm85MHY5czJrbzZrdXI1amZmMSJ9.UW9QsP8ErGFgGNctDwoG5w";
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
const DormitoryCard = ({ item, posts, setPosts, type }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 32.2268,
    longitude: 35.2424,
  });
  const [viewport, setViewport] = useState({
    latitude: 32.2268,
    longitude: 35.2424,
    zoom: 12,
  });
  const renderRoomCards = () => {
    return dummyRoomData.map((room, index) => (
      <RoomCard key={index} item={room} index={index} />
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
            <Typography variant="body1" sx={{ fontWeight: "600" }}>
              {item.username}
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
              <MenuItem>Add a Room</MenuItem>
              <MenuItem>Edit</MenuItem>
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
          slidesToShow={2} // Set the number of rooms to show at once
          slidesToScroll={1}
        >
          {renderRoomCards()}
        </Slider>
      </CardContent>
    </Card>
  );
};

export default DormitoryCard;
