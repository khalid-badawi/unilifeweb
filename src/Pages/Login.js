import React from "react";
import CustomInput from "../Components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  FormControl,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import Logo1 from "../assets/Logo1.png";
import "./Login.css";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // Handle authentication logic here
      console.log("Form values:", values);
    },
  });

  return (
    <Container
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={10}
        style={{
          paddingTop: 80,
          paddingBottom: 100,
          paddingRight: 70,
          paddingLeft: 70,
          width: 500,
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <img src={Logo1} alt="uniLife" className="img" />
          <Typography
            variant="h4"
            component="h3"
            sx={{
              marginBottom: 3,
              alignSelf: "center",
            }}
          >
            Sign In
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth>
              <CustomInput
                type="email"
                placeholder="Email"
                formik={formik}
                value={formik.values.email}
                setValue={(value) => formik.setFieldValue("email", value)}
              />
            </FormControl>

            <CustomInput
              type="password"
              placeholder="Password"
              formik={formik}
              value={formik.values.password}
              setValue={(value) => formik.setFieldValue("password", value)}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#8F00FF",
                paddingX: 10,
                paddingY: 1,
                marginY: 1,
                ":hover": {
                  backgroundColor: "#6A00CC", // Change this color for hover effect
                  cursor: "pointer", // Optional: Change cursor on hover
                },
                alignSelf: "center",
              }}
            >
              Sign In
            </Button>
          </form>
          <Button sx={{ color: "gray" }}>Forgot Password?</Button>
        </Box>
      </Paper>
    </Container>
  );
}
