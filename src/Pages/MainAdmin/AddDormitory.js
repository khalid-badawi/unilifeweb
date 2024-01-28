import { Box, Button, FormControl, Typography } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/CustomInput";
import { addDormitory } from "../../APIS/adminAPI";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slice/user";
import Topbar from "../../Components/Restaurant/Topbar";
import { useNavigate } from "react-router";
import SuccessMessage from "../../Components/Success";

export default function AddDormitory() {
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
      dormitoryName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNum: "",
      SSN: "",
      image: "",
    },
    validationSchema: Yup.object({
      dormitoryName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character"
        )
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      phoneNum: Yup.string()
        .matches(/^\d{10}$/, "Invalid phone number format")
        .required("Required"),
      SSN: Yup.string()
        .matches(/^\d{9}$/, "Invalid SSN format")
        .required("Required"),
      image: Yup.mixed().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log("values from dormitory:", values);

      const res = await addDormitory(id, values);
      console.log("res:", res);
      let status = res.status;
      if (status === 201) {
        setSuccessMessageOpen(true);
        setTimeout(() => {
          handleSuccessMessageClose();
        }, 3000);
        formik.setFieldValue("email", "");
        formik.setFieldValue("SSN", "");
        formik.setFieldValue("dormitoryName", "");
        formik.setFieldValue("password", "");
        formik.setFieldValue("confirmPassword", "");
        formik.setFieldValue("phoneNum", "");
      } else {
        status = res.response.status;
        if (
          status === 401 ||
          status === 409 ||
          status === 403 ||
          status === 400
        ) {
          const {
            response: {
              data: { message },
            },
          } = res;
          dispatch(setError(message));
        } else {
          dispatch(setError("An error occured please try again"));
        }
        navigate("/error");
      }
    },
  });
  console.log(formik.values);
  return (
    <Box pl={2} pr={2}>
      <Topbar></Topbar>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth>
          <CustomInput
            type="dormitoryName"
            placeholder="dormitory Name"
            formik={formik}
            value={formik.values.dormitoryName}
            setValue={(value) => formik.setFieldValue("dormitoryName", value)}
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
          type="password"
          placeholder="Password"
          formik={formik}
          value={formik.values.password}
          setValue={(value) => formik.setFieldValue("password", value)}
        />
        <CustomInput
          type="confirmPassword"
          placeholder="Confirm Password"
          formik={formik}
          value={formik.values.confirmPassword}
          setValue={(value) => formik.setFieldValue("confirmPassword", value)}
        />

        <CustomInput
          type="phoneNum"
          placeholder="Phone Number"
          formik={formik}
          value={formik.values.phoneNum}
          setValue={(value) => formik.setFieldValue("phoneNum", value)}
        />
        <CustomInput
          type="SSN"
          placeholder="SSN"
          formik={formik}
          value={formik.values.SSN}
          setValue={(value) => formik.setFieldValue("SSN", value)}
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
                backgroundColor: "#6A00CC",
                cursor: "pointer",
              },
            }}
          >
            Add
          </Button>
        </Box>
      </form>
      <SuccessMessage
        open={successMessageOpen}
        onClose={handleSuccessMessageClose}
        message="Data added successfully!"
      />
    </Box>
  );
}
