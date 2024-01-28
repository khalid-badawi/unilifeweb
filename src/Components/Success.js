import React, { useState, useEffect } from "react";
import { Snackbar, SnackbarContent, IconButton } from "@mui/material";
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const SuccessMessage = ({ open, onClose, message }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={5000} // Adjust as needed
      onClose={onClose}
    >
      <SnackbarContent
        style={{ backgroundColor: "#4CAF50" }} // Customize background color
        message={
          <span style={{ display: "flex", alignItems: "center" }}>
            <CheckCircleOutlineIcon style={{ marginRight: "8px" }} />
            {message}
          </span>
        }
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default SuccessMessage;
