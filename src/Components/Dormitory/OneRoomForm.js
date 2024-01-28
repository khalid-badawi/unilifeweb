import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CustomInput from "../CustomInput";
import Topbar from "../Restaurant/Topbar";

const OneRoomForm = ({ formik }) => {
  console.log("one room form=", formik);
  return (
    <Box pl={2} pb={2}>
      <Topbar></Topbar>
      <CustomInput
        type="numberOfPerson"
        placeholder="Capacity"
        formik={formik}
        value={formik.values.numberOfPerson}
        setValue={(value) => formik.setFieldValue("numberOfPerson", value)}
      />
      <CustomInput
        type="avilableSeat"
        placeholder="Available Seat"
        formik={formik}
        value={formik.values.avilableSeat}
        setValue={(value) => formik.setFieldValue("avilableSeat", value)}
      />
      <FormControl fullWidth sx={{ marginBottom: "15px" }}>
        <InputLabel id="roomType-label">Room Type</InputLabel>
        <Select
          labelId="roomType-label"
          id="roomType"
          label="Room Type"
          value={formik.values.type}
          onChange={(event) => formik.setFieldValue("type", event.target.value)}
        >
          <MenuItem value="master">Master</MenuItem>
          <MenuItem value="standard">Standard</MenuItem>
          <MenuItem value="studio">Studio</MenuItem>
        </Select>
      </FormControl>
      <CustomInput
        type="rent"
        placeholder="Rent Per Person"
        formik={formik}
        value={formik.values.rent}
        setValue={(value) => formik.setFieldValue("rent", value)}
      />
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <input
          id="room-image-picker"
          name="image"
          type="file"
          accept="image/*"
          onChange={(event) => {
            const selectedImage = event.target.files[0];
            formik.setFieldValue("roomImage", selectedImage);
            formik.setFieldTouched("roomImage", true);
          }}
          style={{ display: "none" }}
        />
        <label htmlFor="room-image-picker">
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
            Upload Room Image
          </Button>
        </label>
        {formik.touched.roomImage && formik.errors.roomImage && (
          <div style={{ color: "#d32f6b", fontSize: 12, marginLeft: "10px" }}>
            {formik.errors.roomImage}
          </div>
        )}
      </FormControl>
      <Divider />
    </Box>
  );
};

export default OneRoomForm;
