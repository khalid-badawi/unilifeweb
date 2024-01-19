import React from "react";
import { Box, Button } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slice/user";
import { useLocation } from "react-router-dom";
import RoomForm from "../../Components/Dormitory/RoomForm";
import { addPost } from "../../APIS/dormitoryAPI";

const RoomInformation = () => {
  const id = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const location = useLocation();
  const { dormitoryValues } = location.state;
  console.log("SS=", dormitoryValues);
  const formik = useFormik({
    initialValues: {
      rooms: Array.from(
        { length: dormitoryValues.numberOfRoom },
        (_, index) => ({
          roomImage: null,
          numberOfPerson: 0,
          avilableSeat: 0,
          type: "",
          rent: 0,
        })
      ),
    },
    /* validationSchema: Yup.object({
      rooms: Yup.array().of(
        Yup.object().shape({
          roomImage: Yup.mixed().required("Required"),
          numberOfPerson: Yup.number()
            .required("Required")
            .min(1, "Should be at least 1 person"),
          avilableSeat: Yup.number()
            .required("Required")
            .min(0, "Should be at least 0 place"),
          roomType: Yup.string().required("Required"),
          rent: Yup.number()
            .required("Required")
            .min(0, "Should be at least 0"),
        })
      ),
    }),*/

    onSubmit: async (values) => {
      console.log("AAAA");
      console.log("values:", values);
      const res = await addPost(id, dormitoryValues, values);
      console.log("res:", res);
      let status = res.status;
      if (status === 201) {
      } else {
        status = res.response.status;
        if (status === 401 || status === 409 || status === 403) {
          const {
            response: {
              data: { message },
            },
          } = res;
          dispatch(setError(message));
        }
      }
    },
  });
  //console.log(formik.values);
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
            onClick={() => formik.handleSubmit}
          >
            Add Dormitory
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RoomInformation;