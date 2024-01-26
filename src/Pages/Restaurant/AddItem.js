import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/CustomInput";
import SwitchButton from "../../Components/Restaurant/SwitchButton";
import { addToMenu } from "../../APIS/restaurantAPI";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slice/user";
import DateSelector from "../../Components/Main Admin/DateSelector";

export default function AddItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [until, setUntil] = useState(new Date());
  const id = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  async function handleAdd(e) {
    e.preventDefault();
    const data = JSON.stringify({
      nameOfFood: title,
      description,
      category: formik.values.category,
      price,
      until,
    });
    const res = await addToMenu(id, data, image);
    let status = res.status;
    if (status === 201) {
      console.log(status);
    } else {
      status = res.response.status;
      console.log(status);
      if (
        status === 409 ||
        status === 404 ||
        status === 401 ||
        status === 403
      ) {
        const message = res.response.data.message;
        dispatch(setError(message));
      }
      console.log(res);
    }
  }
  console.log(image);
  const formik = useFormik({
    initialValues: {
      title,
      description,
      price,
      category,
      image,
      until,
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
  console.log(formik.values.until);
  console.log(until);
  return (
    <Box pl={2} pr={2}>
      <SwitchButton />
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth>
          <CustomInput
            type="title"
            placeholder="title"
            formik={formik}
            value={formik.values.title}
            setValue={
              (value) =>
                setTitle(value) /*formik.setFieldValue("title", value)*/
            }
          />
        </FormControl>

        <CustomInput
          type="description"
          placeholder="Description"
          formik={formik}
          value={formik.values.description}
          setValue={
            (value) =>
              setDescription(
                value
              ) /*formik.setFieldValue("description", value)*/
          }
        />
        <CustomInput
          type="price"
          placeholder="Price ₪"
          formik={formik}
          value={formik.values.price}
          setValue={
            (value) =>
              setPrice(value) /*formik.setFieldValue("password", value)*/
          }
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
            onChange={(event) => {
              setCategory(event.target.value);
              formik.setFieldValue(`category`, event.target.value);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.category && Boolean(formik.errors.category)}
          >
            <MenuItem value="Meals">Meals</MenuItem>
            <MenuItem value="Sandwiches">Sandwiches</MenuItem>
            <MenuItem value="Salads">Salads</MenuItem>
            <MenuItem value="Special Offers">Special Offers</MenuItem>
            <MenuItem value="Drinks">Drinks</MenuItem>
            <MenuItem value="Sauces">Sauces</MenuItem>
            <MenuItem value="Appetizers">Appetizers</MenuItem>
          </Select>
          {formik.touched.category && formik.errors.category && (
            <div style={{ color: "#d32f6b", fontSize: 12, marginLeft: "10px" }}>
              {formik.errors.category}
            </div>
          )}
        </FormControl>
        {formik.values.category === "Special Offers" && (
          <Box sx={{ mt: 1 }}>
            <DateSelector
              label="valid until"
              value={until}
              setValue={(value) => setUntil(value)}
            />
          </Box>
        )}

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
                /* formik.setFieldValue("image", selectedImage);*/
                setImage(selectedImage);
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
            onClick={(e) => handleAdd(e)}
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
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
}
