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
import CustomInput from "../CustomInput";

const RoomForm = ({ formik, roomIndex }) => {
  return (
    <Box key={roomIndex} mt={2}>
      <Typography sx={{ color: "#8F00FF", fontWeight: "bold", mb: 1 }}>
        Room {roomIndex + 1}
      </Typography>
      <CustomInput
        type="numberOfPerson"
        placeholder="Capacity"
        formik={formik}
        value={formik.values.rooms[roomIndex].numberOfPerson}
        setValue={(value) =>
          formik.setFieldValue(`rooms[${roomIndex}].numberOfPerson`, value)
        }
      />
      <CustomInput
        type="avilableSeat"
        placeholder={`avilableSeat`}
        formik={formik}
        value={formik.values.rooms[roomIndex].avilableSeat}
        setValue={(value) =>
          formik.setFieldValue(`rooms[${roomIndex}].avilableSeat`, value)
        }
      />
      <FormControl fullWidth sx={{ marginBottom: "15px" }}>
        <InputLabel id={`roomType-label-${roomIndex}`}>Room Type</InputLabel>
        <Select
          labelId={`roomType-label-${roomIndex}`}
          id={`roomType-${roomIndex}`}
          label={`Room Type ${roomIndex + 1}`}
          value={formik.values.rooms[roomIndex].type}
          onChange={(event) =>
            formik.setFieldValue(`rooms[${roomIndex}].type`, event.target.value)
          }
        >
          <MenuItem value="master">Master</MenuItem>
          <MenuItem value="standard">Standard</MenuItem>
          <MenuItem value="studio">Studio</MenuItem>
        </Select>
      </FormControl>
      <CustomInput
        type={`rent${roomIndex}`}
        placeholder={`Rent Per Person in Room ${roomIndex + 1}`}
        formik={formik}
        value={formik.values.rooms[roomIndex].rent}
        setValue={(value) =>
          formik.setFieldValue(`rooms[${roomIndex}].rent`, value)
        }
      />
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <input
          id="dormitory-image-picker"
          name="image"
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
