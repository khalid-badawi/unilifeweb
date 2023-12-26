import React from "react";
import CustomInput from "../Components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Container, Link, Paper, Typography } from "@mui/material";
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
          paddingRight: 40,
          paddingLeft: 40,
          margin: "auto",
        }}
      >
        <img src={Logo1} alt="uniLife" className="img" />
        <Typography variant="h4" component="h3" sx={{ marginBottom: 3 }}>
          Sign In
        </Typography>
        <form onSubmit={formik.handleSubmit}>
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
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#8F00FF",
              paddingX: 5,
              paddingY: 1,
              marginY: 1,
            }}
          >
            Sign In
          </Button>
        </form>
        <Button sx={{ color: "gray" }}>Forgot Password?</Button>
      </Paper>
    </Container>
  );
}
