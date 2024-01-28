import { Box, Button, FormControl } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/CustomInput";
import { editAd } from "../../APIS/adminAPI";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slice/user";
import { useParams } from "react-router";
import { setAds } from "../../slice/admin";
import Topbar from "../../Components/Restaurant/Topbar";

export default function EditAd() {
  const id =
    useSelector((state) => state.user.id) || localStorage.getItem("id");
  const ads = useSelector((state) => state.admin.ads);
  const { adId } = useParams();
  console.log("edit ad=", useParams());
  const ad = ads.filter((ad) => ad.id === parseInt(adId))[0];
  const { title, description, link } = ad;
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title,
      description,
      link,
      image: "",
    },
    validationSchema: Yup.object({
      title: Yup.string(),
      description: Yup.string(),
      link: Yup.string(),
      image: Yup.mixed(),
    }),
    onSubmit: async (values) => {
      console.log("values:", values);
      const res = await editAd(id, adId, values);
      console.log(res);
      let status = res.status;
      if (status === 200) {
        const newAds = ads.map((ad) =>
          ad.id !== adId ? ad : { ...ad, title, description, link }
        );
        dispatch(setAds(newAds));
      } else {
        status = res.response.status;
        if (
          status === 401 ||
          status === 409 ||
          status === 403 ||
          status === 500
        ) {
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
            type="title"
            placeholder="AD title"
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
          type="link"
          placeholder="link"
          formik={formik}
          value={formik.values.link}
          setValue={(value) => formik.setFieldValue("link", value)}
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
            EDIT
          </Button>
        </Box>
      </form>
    </Box>
  );
}
