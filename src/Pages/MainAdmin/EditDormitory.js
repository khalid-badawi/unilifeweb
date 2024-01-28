import { Box, Button, FormControl } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/CustomInput";
import { editDormitory } from "../../APIS/adminAPI";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slice/user";
import { setDormitories } from "../../slice/admin";
import { useNavigate, useParams } from "react-router";
import Topbar from "../../Components/Restaurant/Topbar";
import { useState } from "react";
import SuccessMessage from "../../Components/Success";

export default function EditDormitory() {
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const handleSuccessMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessMessageOpen(false);
  };
  const navigate = useNavigate();

  console.log("EditDormitory");
  const id =
    useSelector((state) => state.user.id) || localStorage.getItem("id");
  const { dormitoryId } = useParams();

  const dormitories = useSelector((state) => state.admin.dormitories);
  const { username, email, SSN, image, phoneNum } = dormitories.filter(
    (dormitory) => dormitory.id === parseInt(dormitoryId)
  )[0];
  console.log(username, email, SSN, image, phoneNum);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      dormitoryName: username,
      email,
      phoneNum,
      SSN,
      image,
    },
    validationSchema: Yup.object({
      dormitoryName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email format").required("Required"),
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
      const { dormitoryName, email, SSN, phoneNum } = values;
      const res = await editDormitory(id, dormitoryId, values);
      console.log("res:", res);
      let status = res.status;
      if (status === 200) {
        const newDormitories = dormitories.map((dormitory) =>
          dormitory.id === dormitoryId
            ? { ...dormitory, dormitoryName, SSN, email, phoneNum }
            : dormitory
        );
        dispatch(setDormitories(newDormitories));
        setSuccessMessageOpen(true);
        setTimeout(() => {
          handleSuccessMessageClose();
        }, 3000);
      } else {
        status = res.response.status;
        if (
          status === 401 ||
          status === 404 ||
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
            Edit
          </Button>
        </Box>
      </form>
      <SuccessMessage
        open={successMessageOpen}
        onClose={handleSuccessMessageClose}
        message="data edited successfully"
      />
    </Box>
  );
}
