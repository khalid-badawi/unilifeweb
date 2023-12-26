import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/CustomInput";
export default function AddItem() {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      price: Yup.string()
        .matches(/^[0-9]+$/, "Price must be a number")
        .required("Required"),
      category: Yup.string().required("Required"),
      image: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // Handle authentication logic here
      console.log("Form values:", values);
    },
  });
  return (
    <Box pl={2} pr={2}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth>
          <CustomInput
            type="title"
            placeholder="title"
            formik={formik}
            value={formik.values.title}
            setValue={(value) => formik.setFieldValue("title", value)}
          />
        </FormControl>

        <CustomInput
          type="description"
          placeholder="Description"
          formik={formik}
          value={formik.values.description}
          setValue={(value) => formik.setFieldValue("description", value)}
        />
        <CustomInput
          type="price"
          placeholder="Price ₪"
          formik={formik}
          value={formik.values.price}
          setValue={(value) => formik.setFieldValue("password", value)}
        />
        <FormControl
          fullWidth
          sx={{
            mt: 2,
            "& label.Mui-focused": {
              color: "#8F00FF",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#8F00FF",
              },
            },
          }}
        >
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            value={formik.values.category}
            onChange={(event) =>
              formik.setFieldValue("category", event.target.value)
            }
            onBlur={formik.handleBlur}
            error={formik.touched.category && Boolean(formik.errors.category)}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          {formik.touched.category && formik.errors.category && (
            <div style={{ color: "#d32f6b", fontSize: 12, marginLeft: "10px" }}>
              {formik.errors.category}
            </div>
          )}
        </FormControl>
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <FormControl fullWidth sx={{}}>
            <input
              id="image-picker"
              name="image"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const selectedImage = event.target.files[0];
                formik.setFieldValue("image", selectedImage);
                formik.setFieldTouched("image", true);
              }}
              style={{ display: "none" }}
            />
            <label htmlFor="image-picker">
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
                Upload Image
              </Button>
            </label>
            {formik.touched.image && formik.errors.image && (
              <div
                style={{ color: "#d32f6b", fontSize: 12, marginLeft: "10px" }}
              >
                {formik.errors.image}
              </div>
            )}
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#8F00FF",
              paddingX: 10,
              paddingY: 1,
              height: 40,

              ":hover": {
                backgroundColor: "#6A00CC", // Change this color for hover effect
                cursor: "pointer", // Optional: Change cursor on hover
              },
            }}
          >
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
}
