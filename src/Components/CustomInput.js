import React from "react";
import { TextField, Typography } from "@mui/material";
import "./CustomInput.css";

const CustomInput = ({ type, placeholder, value, setValue, formik }) => {
  const isError = (field) =>
    formik.touched[field] && Boolean(formik.errors[field]);

  return (
    <div className="input-container">
      <TextField
        sx={{
          "& label.Mui-focused": {
            color: "#8F00FF",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#8F00FF",
            },
          },
        }}
        variant="outlined"
        margin="normal"
        fullWidth
        id={type}
        label={placeholder}
        name={type}
        autoFocus
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          formik.handleChange(e);
        }}
        error={isError(type)}
        helperText={isError(type) ? formik.errors[type] : ""}
      />
    </div>
  );
};

export default CustomInput;
