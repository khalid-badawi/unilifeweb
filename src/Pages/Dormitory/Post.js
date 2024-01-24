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
} from "@mui/material";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import MapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
const APIKEY =
  "pk.eyJ1IjoiajFyZW4iLCJhIjoiY2xvcm9zdm85MHY5czJrbzZrdXI1amZmMSJ9.UW9QsP8ErGFgGNctDwoG5w";
export default function Post() {
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
    <Card sx={{ maxWidth: 800 }}>
      <CardMedia component="img" alt="green iguana" height="400" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Dormitory name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            female
          </Typography>
          <Typography variant="body2" color="text.secondary">
            services
          </Typography>
        </CardContent>
        <Box width={600}>
          {/* Mapbox Map */}
          <MapGL
            style={{ height: 500, width: 500 }}
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            scrollZoom={true}
            onMove={(evt) => setViewport(evt.viewState)}
            mapboxAccessToken={APIKEY}
          >
            <Marker
              {...markerPosition}
              draggable={true}
              onDragEnd={(event) => {
                const { lngLat } = event;
                setMarkerPosition({
                  latitude: lngLat.lat,
                  longitude: lngLat.lng,
                });
              }}
            />
          </MapGL>
          {markerPosition.latitude !== 0 && markerPosition.longitude !== 0 && (
            <>
              <Typography>{`Longitue:${markerPosition.longitude}`}</Typography>
              <Typography>{`Latitude:${markerPosition.latitude}`}</Typography>
              <Typography>
                {/* Distance:{distance}km away from An-Najah University*/}
              </Typography>
            </>
          )}
          {markerPosition.latitude === 0 && markerPosition.longitude === 0 && (
            <div style={{ color: "#d32f6b", fontSize: 12, marginLeft: "10px" }}>
              assign dormitory location please
            </div>
          )}
        </Box>
      </Box>
      <CardActions sx={{ alignItems: "center", justifyContent: "center" }}>
        <Button size="small">Veiw Rooms</Button>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
