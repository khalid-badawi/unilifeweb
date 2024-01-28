import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import MapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CustomInput from "../../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "../../Components/Restaurant/Topbar";
import { editPost } from "../../APIS/dormitoryAPI";
import { setError } from "../../slice/user";
import SuccessMessage from "../../Components/Success";

export default function EditPost() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.id);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const handleSuccessMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessMessageOpen(false);
  };
  const posts = useSelector((state) => state.dormitory.posts);
  console.log("edit pots", posts);
  const dispatch = useDispatch();
  const { dormitoryId } = useParams();
  console.log("dormitoryId", dormitoryId);
  const post = posts.filter((post) => post.id === parseInt(dormitoryId))[0];
  const { lon, lat, services, gender, name } = post;
  const [distance, setDistance] = useState(post.distance);
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lon,
    zoom: 12,
  });

  const [markerPosition, setMarkerPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const assignMarker = () => {
    setMarkerPosition({
      latitude: viewport.latitude,
      longitude: viewport.longitude,
    });
  };
  console.log("position:", markerPosition);
  const formik = useFormik({
    initialValues: {
      dormitoryName: name,
      services,
      gender,
      dormitoryImage: "",
    },

    validationSchema: Yup.object({
      dormitoryName: Yup.string().required("Required"),
      services: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      dormitoryImage: Yup.mixed(),
    }),
    onSubmit: async (values) => {
      console.log("values:", values);
      const data = {
        ...values,
        distance,
        lon: markerPosition.longitude,
        lat: markerPosition.latitude,
      };
      console.log("data:", data);
      const res = await editPost(id, dormitoryId, data);
      console.log("res:", res);
      let status = res.status;
      if (status === 200) {
        setSuccessMessageOpen(true);
        setTimeout(() => {
          handleSuccessMessageClose();
        }, 3000);
      } else {
        status = res.response.status;
        if (status === 401 || status === 409 || status === 403) {
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
    },
  });
  // ... (other imports)

  // ... (rest of the component code)

  const calculateDistance = async () => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${
          markerPosition.longitude
        },${
          markerPosition.latitude
        };${35.22219},${32.22699}?geometries=geojson&access_token=pk.eyJ1IjoiajFyZW4iLCJhIjoiY2xvcm9zdm85MHY5czJrbzZrdXI1amZmMSJ9.UW9QsP8ErGFgGNctDwoG5w`
      );

      console.log(response);
      const firstRoute = response.data.routes[0];

      // Extracting the distance from the first route
      const newDistance = firstRoute.distance / 1000;
      const roundedDistance = Number(newDistance.toFixed(2));

      console.log("Distance:", roundedDistance);
      setDistance(roundedDistance);
      //   const newDistance = response.data.distances[0][1] / 1000; // Convert distance to kilometers
      //   setDistance(newDistance.toFixed(2));
      //   console.log(newDistance); // Set distance with 2 decimal places
    } catch (error) {
      console.error("Error calculating distance:", error);
    }
  };

  useEffect(() => {
    calculateDistance();
  }, [markerPosition]);

  return (
    <Box pl={2} pr={2}>
      <Topbar></Topbar>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth>
          <CustomInput
            type="dormitoryName"
            placeholder="Dormitory Name"
            formik={formik}
            value={formik.values.dormitoryName}
            setValue={(value) => formik.setFieldValue("dormitoryName", value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <CustomInput
            type="services"
            placeholder="Services"
            formik={formik}
            value={formik.values.services}
            setValue={(value) => formik.setFieldValue("services", value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            value={formik.values.gender}
            label="Gender"
            onChange={(event) =>
              formik.setFieldValue("gender", event.target.value)
            }
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 3 }}>
          <input
            id="dormitory-image-picker"
            name="image"
            type="file"
            accept="image/*"
            onChange={(event) => {
              const selectedImage = event.target.files[0];
              formik.setFieldValue("dormitoryImage", selectedImage);
              formik.setFieldTouched("dormitoryImage", true);
            }}
            style={{ display: "none" }}
          />
          <label htmlFor="dormitory-image-picker">
            <Button
              component="span"
              variant="outlined"
              sx={{
                borderColor: "#8F00FF",
                color: "#8F00FF",
                ":hover": {
                  backgroundColor: "#8F00FF",
                  color: "white",
                  cursor: "pointer",
                },
              }}
            >
              Upload Dormitory Image
            </Button>
          </label>
          {formik.touched.dormitoryImage && formik.errors.dormitoryImage && (
            <div style={{ color: "#d32f6b", fontSize: 12, marginLeft: "10px" }}>
              {formik.errors.dormitoryImage}
            </div>
          )}
        </FormControl>
        {markerPosition.latitude === 0 && markerPosition.longitude === 0 && (
          <Button
            sx={{
              color: "#8F00FF",

              borderColor: "#8F00FF",
              ":hover": {
                color: "#8F00FF",
                backgroundColor: "white",
                borderColor: "#8F00FF",
              },
            }}
            variant="text"
            color="primary"
            onClick={assignMarker}
          >
            Assign Location
          </Button>
        )}

        <Box width={600}>
          {/* Mapbox Map */}
          <MapGL
            style={{ height: 500, width: 500 }}
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            scrollZoom={true}
            onMove={(evt) => setViewport(evt.viewState)}
            mapboxAccessToken="pk.eyJ1IjoiajFyZW4iLCJhIjoiY2xvcm9zdm85MHY5czJrbzZrdXI1amZmMSJ9.UW9QsP8ErGFgGNctDwoG5w" // Replace with your Mapbox API key
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
              <Typography>Longitue:{markerPosition.longitude}</Typography>
              <Typography>Latitude:{markerPosition.latitude}</Typography>
              <Typography>
                Distance:{distance}km away from An-Najah University
              </Typography>
            </>
          )}
          {markerPosition.latitude === 0 && markerPosition.longitude === 0 && (
            <div style={{ color: "#d32f6b", fontSize: 12, marginLeft: "10px" }}>
              assign dormitory location please
            </div>
          )}
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#8F00FF",
              paddingX: 15,
              paddingY: 1,
              height: 40,
              ":hover": {
                backgroundColor: "#6A00CC",
                cursor: "pointer",
              },
              mb: 1,
            }}
          >
            Edit
          </Button>
          <SuccessMessage
            open={successMessageOpen}
            onClose={handleSuccessMessageClose}
            message="Data edited successfully!" // Customize the success message
          />
        </Box>
      </form>
    </Box>
  );
}
