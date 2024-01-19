import React from "react";
import { Box, Button } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import RoomForm from "../../Components/Dormitory/RoomForm";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slice/user";
import { useLocation } from "react-router-dom";

const RoomInformation = () => {
  const id = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const location = useLocation();
  const { dormitoryValues } = location.state;
  const formik = useFormik({
    initialValues: {
      rooms: Array.from({ length: dormitoryValues.numRooms }, (_, index) => ({
        roomImage: null,
        numPeople: 0,
        availablePlaces: 0,
        roomType: "",
        pricePerPerson: 0,
      })),
    },
    // validationSchema: Yup.object({
    //   rooms: Yup.array().of(
    //     Yup.object().shape({
    //       roomImage: Yup.mixed().required("Required"),
    //       numPeople: Yup.number()
    //         .required("Required")
    //         .min(1, "Should be at least 1 person"),
    //       availablePlaces: Yup.number()
    //         .required("Required")
    //         .min(0, "Should be at least 0 place"),
    //       roomType: Yup.string().required("Required"),
    //       pricePerPerson: Yup.number()
    //         .required("Required")
    //         .min(0, "Should be at least 0"),
    //     })
    //   ),
    // }),

    onSubmit: async (values) => {
      // Perform API call to add room information
      console.log("Hello");
      console.log("values:", values);
    },
  });

  return (
    <Box pl={2} pr={2}>
      <form onSubmit={formik.handleSubmit}>
        {formik.values.rooms.map((_, index) => (
          <RoomForm key={index} formik={formik} roomIndex={index} />
        ))}

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
            Add Dormitory
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RoomInformation;
