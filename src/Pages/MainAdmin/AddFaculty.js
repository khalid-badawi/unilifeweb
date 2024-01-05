import React from "react";
import { Box, Button, FormControl } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/CustomInput";

export default function AddFaculty() {
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
    onSubmit: (values) => {
      console.log("Form values:", values);
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
    </Box>
  );
}
