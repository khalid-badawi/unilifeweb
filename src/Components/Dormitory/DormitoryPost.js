import img from "../../assets/bozz.png";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CardMedia,
  CardActions,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import MapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomInput from "../CustomInput";
import { useDispatch, useSelector } from "react-redux";
const APIKEY =
  "pk.eyJ1IjoiajFyZW4iLCJhIjoiY2xvcm9zdm85MHY5czJrbzZrdXI1amZmMSJ9.UW9QsP8ErGFgGNctDwoG5w";
export default function DormitoryPost() {
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 32,
    longitude: 31,
  });
  const [viewport, setViewport] = useState({
    latitude: 32.2268,
    longitude: 35.2424,
    zoom: 12,
  });
  const assignMarker = () => {
    setMarkerPosition({
      latitude: viewport.latitude,
      longitude: viewport.longitude,
    });
  };
  return (
    <Card sx={{ width: 600 }}>
      <CardMedia
        component="img"
        alt="Dormitory Image"
        image={img}
        sx={{
          objectFit: "fill",
          width: 600,
          height: 500,
          marginBottom: 1,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <Box width="45%" pl={1}>
          <Typography
            sx={{ mb: "5px" }}
            gutterBottom
            variant="h6"
            component="div"
          >
            Dormitory name
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "5px" }}>
            Females
          </Typography>
          <Typography sx={{}} variant="subtitle2">
            Services:
          </Typography>
          <Typography sx={{ mb: "5px" }} variant="body2" color="text.secondary">
            Wifi,Laundaries Wifi,Laundaries Wifi,Laundaries Wifi,Laundaries
          </Typography>
          <Typography sx={{ mb: "5px", color: "#8F00FF" }} variant="subtitle2">
            6.5km away from An-Najah University
          </Typography>
        </Box>
        <Box width="55%">
          {/* Mapbox Map */}
          <MapGL
            style={{ height: 250, width: "100%" }}
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            scrollZoom={true}
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
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              variant="subtitle2"
              sx={{ mr: 2 }}
            >{`Longitue:${markerPosition.longitude}`}</Typography>
            <Typography variant="subtitle2">{`Latitude:${markerPosition.latitude}`}</Typography>
          </Box>
          <Typography>
            {/* Distance:{distance}km away from An-Najah University*/}
          </Typography>
          {markerPosition.latitude === 0 && markerPosition.longitude === 0 && (
            <div style={{ color: "#d32f6b", fontSize: 12, marginLeft: "10px" }}>
              assign dormitory location please
            </div>
          )}
        </Box>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button size="small" sx={{ color: "#8F00FF", fontWeight: "bold" }}>
          Veiw Rooms
        </Button>
        <Button size="small" sx={{ color: "#8F00FF", fontWeight: "bold" }}>
          Edit
        </Button>
        <Button size="small" sx={{ color: "#8F00FF", fontWeight: "bold" }}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
