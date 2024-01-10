import React, { useState, useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../APIS/userAPI";
import {
  Box,
  Button,
  Container,
  FormControl,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setId, setRole, setError, setIsAuth } from "../slice/user";
import Logo1 from "../assets/Logo1.png";
import "./Login.css";
import { useNavigate } from "react-router";

export default function Login() {
  const role = useSelector((state) => state.user.role);
  const isAuth = useSelector((state) => state.user.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "12345678",
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
  const { email, password } = formik.values;
  console.log(formik.values.email, formik.values.password);
  async function action(e) {
    e.preventDefault();
    try {
      const res = await login(formik.values.email, formik.values.password);
      console.log("res:", res);
      //const { token } = res.data;
      let { status } = res;
      console.log("status", status);
      if (status === 200) {
        const {
          data: {
            token,
            data: { id, role },
          },
        } = res;
        localStorage.setItem("token", token);
        dispatch(setIsAuth(true));
        dispatch(setId(id));
        dispatch(setRole(role));
      } else {
        console.log("status", res.response.data);
        status = res.response.status;
        const {
          response: {
            data: { message },
          },
        } = res;
        console.log("message:", message);
        dispatch(setIsAuth(false));
        if (status === 400) {
          dispatch(setError(message));
        } else if (status === 500) {
          dispatch(setError("Internal Server Error"));
        }
      }
    } catch (err) {
      dispatch(setError("Internal Server Error"));
      //console.log("The error:", err);
    }
  }
  useEffect(() => {
    console.log("The isAuth:", isAuth);
    if (isAuth) {
      if (role === "admin") navigate("/admin/home", { replace: true });
      else if (role === "restaurant")
        navigate("/restaurant/home", { replace: true });
      else if (role === "dormitory") navigate("/dormitory", { replace: true });
    } //else navigate("/");
  }, [isAuth, role, navigate]);
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
                value={email}
                setValue={(value) => formik.setFieldValue("email", value)}
              />
            </FormControl>

            <CustomInput
              type="password"
              placeholder="Password"
              formik={formik}
              value={password}
              setValue={(value) => formik.setFieldValue("password", value)}
            />
            <Button
              variant="contained"
              type="submit"
              onClick={(e) => action(e)}
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
