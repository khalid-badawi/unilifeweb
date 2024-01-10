import React, { useEffect } from "react";
import { Box, Button, FormControl } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { addFaculty, editFaculty } from "../../APIS/adminAPI";
import { setError } from "../../slice/user";
import { useParams } from "react-router";
import { setColleges } from "../../slice/admin";
export default function EditFaculty() {
  const id = useSelector((state) => state.user.id);
  const colleges = useSelector((state) => state.admin.colleges);
  const { facultyId } = useParams();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      facultyName: "",
      facultyNumber: "",
      coordinates: [{ lon: "", lat: "" }],
    },
    validationSchema: Yup.object({
      facultyName: Yup.string().required("Required"),
      facultyNumber: Yup.string().required("Required"),
      coordinates: Yup.array()
        .of(
          Yup.object().shape({
            lon: Yup.number()
              .typeError("Must be a number")
              .required("Required"),
            lat: Yup.number()
              .typeError("Must be a number")
              .required("Required"),
          })
        )
        .min(1, "At least one set of coordinates is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form values:", values);
      const res = await editFaculty(id, facultyId, values);
      console.log(res);
      let { status } = res;
      if (status === 200) {
        const newFaculties = colleges.map((item) =>
          item.facultyNumber === facultyId
            ? {
                facultyNumber: values.facultyNumber,
                facultyName: values.facultyName,
                coordinates: values.coordinates,
              }
            : item
        );
        dispatch(setColleges(newFaculties));
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
        }
      }
    },
  });
  useEffect(() => {
    const data = colleges.filter(
      (faculty) => faculty.id === parseInt(facultyId)
    )[0];
    const { facultyName, facultyNumber, locations } = data;
    formik.setFieldValue("facultyName", facultyName);
    formik.setFieldValue("facultyNumber", facultyNumber);
    formik.setFieldValue("coordinates", locations);
  }, []);
  const addCoordinates = () => {
    formik.setFieldValue("coordinates", [
      ...formik.values.coordinates,
      { lon: "", lat: "" },
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
                type={`coordinates[${index}].lon`}
                placeholder={`Longitude ${index + 1}`}
                formik={formik}
                value={coord.lon}
                setValue={(value) =>
                  formik.setFieldValue(`coordinates[${index}].lon`, value)
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
                type={`coordinates[${index}].lat`}
                placeholder={`Latitude ${index + 1}`}
                formik={formik}
                value={coord.lat}
                setValue={(value) =>
                  formik.setFieldValue(`coordinates[${index}].lat`, value)
                }
              />
              {formik.touched.coordinates &&
                formik.errors.coordinates &&
                formik.errors.coordinates[index] && (
                  <div
                    style={{ color: "#d32f6b", fontSize: 12, marginLeft: 15 }}
                  >
                    {formik.errors.coordinates[index].lat}
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
          Edit Faculty
        </Button>
      </form>
    </Box>
  );
}
