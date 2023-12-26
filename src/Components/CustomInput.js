import React from "react";
import { TextField } from "@mui/material";
import "./CustomInput.css";
const CustomInput = ({ type, placeholder, value, setValue, formik }) => {
  const fieldName = type === "password" ? "password" : "email";

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
        error={formik.touched[type] && Boolean(formik.errors[type])}
        helperText={formik.touched[type] ? formik.errors[type] : ""}
      />
    </div>
  );
};

export default CustomInput;
