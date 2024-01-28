import React from "react";
import { Box, Button } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slice/user";
import { useLocation } from "react-router-dom";
import { addPost } from "../../APIS/dormitoryAPI";
import OneRoomForm from "../../Components/Dormitory/OneRoomForm";

const AddRoom = () => {
  //   const id = useSelector((state) => state.user.id);
  //   const dispatch = useDispatch();
  //   const location = useLocation();
  //   const { dormitoryValues } = location.state;

  const formik = useFormik({
    initialValues: {
      roomImage: null,
      numberOfPerson: 0,
      avilableSeat: 0,
      type: "",
      rent: 0,
    },
    validationSchema: Yup.object({
      roomImage: Yup.mixed()
        .test("fileFormat", "Invalid file format", (value) => {
          return value && ["image/jpeg", "image/png"].includes(value.type);
        })
        .required("Required"),
      numberOfPerson: Yup.number()
        .required("Required")
        .min(1, "Should be at least 1 person"),
      avilableSeat: Yup.number()
        .required("Required")
        .min(0, "Should be at least 0 place"),
      type: Yup.string().required("Required"),
      rent: Yup.number().required("Required").min(0, "Should be at least 0"),
    }),
    onSubmit: async (values) => {
      console.log("Submitting single room:", values);
      //   const res = await addPost(id, dormitoryValues, [values]);
      //   console.log("API Response:", res);
      //   let status = res.status;

      //   if (status === 201) {
      //     // Handle success, if needed
      //   } else {
      //     status = res.response.status;
      //     if (status === 401 || status === 409 || status === 403) {
      //       const {
      //         response: {
      //           data: { message },
      //         },
      //       } = res;
      //       dispatch(setError(message));
      //     }
      //   }
    },
  });

  return (
    <Box pl={2} pr={2}>
      <form onSubmit={formik.handleSubmit}>
        <OneRoomForm formik={formik} />

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
            Add Room
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddRoom;
