import React, { useState } from "react";

import { Box, Button, FormControl } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { addFaculty } from "../../APIS/adminAPI";
import { setError } from "../../slice/user";
import Topbar from "../../Components/Restaurant/Topbar";
import SuccessMessage from "../../Components/Success";
import { useNavigate } from "react-router";
export default function AddFaculty() {
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const handleSuccessMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessMessageOpen(false);
  };
  const navigate = useNavigate();
  const id =
    useSelector((state) => state.user.id) || localStorage.getItem("id");

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      facultyName: "",
      facultyNumber: "",
      coordinates: [
        { longitude: "", latitude: "" }, // Initial set of coordinates
      ],
    },
    validationSchema: Yup.object({
      facultyName: Yup.string().required("Required"),
      facultyNumber: Yup.string().required("Required"),
      coordinates: Yup.array()
        .of(
          Yup.object().shape({
            longitude: Yup.number()
              .typeError("Must be a number")
              .required("Required"),
            latitude: Yup.number()
              .typeError("Must be a number")
              .required("Required"),
          })
        )
        .min(1, "At least one set of coordinates is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Form values:", values);
      const res = await addFaculty(id, values);
      console.log(res);
      let { status } = res;
      if (status === 201) {
        resetForm();
        setSuccessMessageOpen(true);
        setTimeout(() => {
          handleSuccessMessageClose();
        }, 3000);
      } else {
        status = res.response.status;
        const {
          response: {
            data: { message },
          },
        } = res;
        console.log("message:", status);
        if (
          status === 401 ||
          status === 409 ||
          status === 403 ||
          status === 400
        ) {
          dispatch(setError(message));
        } else {
          dispatch(setError("An error occured please try again"));
        }
        navigate("/error");
      }
    },
  });

  const addCoordinates = () => {
    formik.setFieldValue("coordinates", [
      ...formik.values.coordinates,
      { longitude: "", latitude: "" },
    ]);
  };

  const removeCoordinates = (index) => {
    const updatedCoordinates = [...formik.values.coordinates];
    updatedCoordinates.splice(index, 1);
    formik.setFieldValue("coordinates", updatedCoordinates);
  };

  return (
    <Box pl={2} pr={2}>
      <Topbar></Topbar>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth>
          <CustomInput
            type="facultyName"
            placeholder="Faculty Name"
            formik={formik}
            value={formik.values.facultyName}
            setValue={(value) => formik.setFieldValue("facultyName", value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <CustomInput
            type="facultyNumber"
            placeholder="Faculty Number"
            formik={formik}
            value={formik.values.facultyNumber}
            setValue={(value) => formik.setFieldValue("facultyNumber", value)}
          />
        </FormControl>

        {formik.values.coordinates.map((coord, index) => (
          <div key={index}>
            <FormControl fullWidth>
              <CustomInput
                type={`coordinates[${index}].longitude`}
                placeholder={`Longitude ${index + 1}`}
                formik={formik}
                value={coord.longitude}
                setValue={(value) =>
                  formik.setFieldValue(`coordinates[${index}].longitude`, value)
                }
              />
              {formik.touched.coordinates &&
                formik.errors.coordinates &&
                formik.errors.coordinates[index] && (
                  <div
                    style={{ color: "#d32f6b", fontSize: 12, marginLeft: 15 }}
                  >
                    {formik.errors.coordinates[index].longitude}
                  </div>
                )}
            </FormControl>

            <FormControl fullWidth>
              <CustomInput
                type={`coordinates[${index}].latitude`}
                placeholder={`Latitude ${index + 1}`}
                formik={formik}
                value={coord.latitude}
                setValue={(value) =>
                  formik.setFieldValue(`coordinates[${index}].latitude`, value)
                }
              />
              {formik.touched.coordinates &&
                formik.errors.coordinates &&
                formik.errors.coordinates[index] && (
                  <div
                    style={{ color: "#d32f6b", fontSize: 12, marginLeft: 15 }}
                  >
                    {formik.errors.coordinates[index].latitude}
                  </div>
                )}
            </FormControl>

            {index !== 0 && (
              <Button
                type="button"
                onClick={() => removeCoordinates(index)}
                sx={{
                  color: "#8F00FF",
                  paddingX: 15,
                  paddingY: 1,
                  height: 40,
                  ":hover": {
                    backgroundColor: "rgba(0,0,0,0.05)",
                    cursor: "pointer",
                  },
                }}
              >
                Remove
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          onClick={addCoordinates}
          sx={{
            color: "#8F00FF",
            paddingX: 15,
            paddingY: 1,
            height: 40,
            ":hover": {
              backgroundColor: "rgba(0,0,0,0.05)",
              cursor: "pointer",
            },
          }}
        >
          Add Coordinates
        </Button>

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
          }}
        >
          Add Faculty
        </Button>
      </form>
      <SuccessMessage
        open={successMessageOpen}
        onClose={handleSuccessMessageClose}
        message="Data added successfully!"
      />
    </Box>
  );
}
