import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/CustomInput";
import { addRestaurant, editRestaurants } from "../../APIS/adminAPI";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slice/user";
import admin from "../../slice/admin";
import { useParams } from "react-router";
import Topbar from "../../Components/Restaurant/Topbar";

export default function EditRestaurant() {
  const { restaurantId } = useParams();
  console.log(restaurantId);
  const restaurants = useSelector((state) => state.admin.restaurants);
  const data = restaurants.filter(
    (restaurant) => restaurant.id === parseInt(restaurantId)
  )[0];
  const { username, email, phoneNum, image } = data;
  const adminId =
    useSelector((state) => state.user.id) || localStorage.getItem("id");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      restaurantName: username,
      email,
      phoneNum,
      image,
    },
    validationSchema: Yup.object({
      restaurantName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email format").required("Required"),
      phoneNum: Yup.string()
        .matches(/^\d{10}$/, "Invalid phone number format")
        .required("Required"),
      image: Yup.mixed().required("Required"), // Use Yup.mixed() for file uploads
    }),
    onSubmit: async (values) => {
      console.log("values:", values);
      const res = await editRestaurants(values, adminId, restaurantId);
      console.log("res:", res);
      let status = res.status;
      if (status === 200) {
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
  console.log(formik.values.image);
  return (
    <Box pl={2} pr={2}>
      <Topbar></Topbar>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth>
          <CustomInput
            type="restaurantName"
            placeholder="Restaurant Name"
            formik={formik}
            value={formik.values.restaurantName}
            setValue={(value) => formik.setFieldValue("restaurantName", value)}
          />
        </FormControl>

        <CustomInput
          type="email"
          placeholder="Email"
          formik={formik}
          value={formik.values.email}
          setValue={(value) => formik.setFieldValue("email", value)}
        />

        <CustomInput
          type="phoneNum"
          placeholder="Phone Number"
          formik={formik}
          value={formik.values.phoneNum}
          setValue={(value) => formik.setFieldValue("phoneNum", value)}
        />

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
              paddingX: 15,
              paddingY: 1,
              height: 40,

              ":hover": {
                backgroundColor: "#6A00CC", // Change this color for hover effect
                cursor: "pointer", // Optional: Change cursor on hover
              },
            }}
          >
            Edit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
