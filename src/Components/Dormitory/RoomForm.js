import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CustomInput from "../../Components/CustomInput";

const RoomForm = ({ formik, roomIndex }) => {
  return (
    <Box key={roomIndex} mt={2}>
      <Typography sx={{ color: "#8F00FF", fontWeight: "bold", mb: 1 }}>
        Room {roomIndex + 1}
      </Typography>
      <CustomInput
        type={`numPeople`}
        placeholder={`Capacity`}
        formik={formik}
        value={formik.values.rooms[roomIndex].numPeople}
        setValue={(value) =>
          formik.setFieldValue(`rooms[${roomIndex}].numPeople`, value)
        }
      />
      <CustomInput
        type={`availablePlaces`}
        placeholder={`Available Places `}
        formik={formik}
        value={formik.values.rooms[roomIndex].availablePlaces}
        setValue={(value) =>
          formik.setFieldValue(`rooms[${roomIndex}].availablePlaces`, value)
        }
      />
      <FormControl fullWidth sx={{ marginBottom: "15px" }}>
        <InputLabel id={`roomType-label-${roomIndex}`}>Room Type</InputLabel>
        <Select
          labelId={`roomType-label-${roomIndex}`}
          id={`roomType-${roomIndex}`}
          label={`Room Type ${roomIndex + 1}`}
          value={formik.values.rooms[roomIndex].roomType}
          onChange={(event) =>
            formik.setFieldValue(
              `rooms[${roomIndex}].roomType`,
              event.target.value
            )
          }
        >
          <MenuItem value="master">Master</MenuItem>
          <MenuItem value="standard">Standard</MenuItem>
          <MenuItem value="studio">Studio</MenuItem>
        </Select>
      </FormControl>
      <CustomInput
        type={`pricePerPerson${roomIndex}`}
        placeholder={`Price Per Person in Room ${roomIndex + 1}`}
        formik={formik}
        value={formik.values.rooms[roomIndex].pricePerPerson} // Update this line
        setValue={
          (value) =>
            formik.setFieldValue(`rooms[${roomIndex}].pricePerPerson`, value) // Update this line
        }
      />
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <input
          id="dormitory-image-picker"
          name="dormitoryImage"
          type="file"
          accept="image/*"
          onChange={(event) => {
            const selectedImage = event.target.files[0];
            formik.setFieldValue(
              `rooms[${roomIndex}].roomImage`,
              selectedImage
            );
            formik.setFieldTouched(`rooms[${roomIndex}].roomImage`, true);
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
        {formik.touched.rooms && formik.errors.rooms && (
          <div style={{ color: "#d32f6b", fontSize: 12, marginLeft: "10px" }}>
            {formik.errors.rooms[roomIndex]?.roomImage}
          </div>
        )}
      </FormControl>
      <Divider />
      <Divider />
      <Divider />
    </Box>
  );
};

export default RoomForm;
