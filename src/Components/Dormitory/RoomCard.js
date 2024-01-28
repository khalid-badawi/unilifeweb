import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Grid,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Save, Delete } from "@mui/icons-material";

const RoomCard = ({ item, index }) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const typeCap = capitalizeFirstLetter(item.type);

  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    // Add logic for edit functionality
    handleMenuClose();
  };

  const handleDelete = () => {
    // Add logic for delete functionality
    handleMenuClose();
  };

  return (
    <Card sx={{ width: 350, margin: "5px", borderRadius: 1, boxShadow: 5 }}>
      <Box sx={{ width: "100%" }}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/unilife-1b22d.appspot.com/o/restaurant%2F4?alt=media&token=8f4c3666-7678-4a8a-9c7d-69d42d0c7bd7"
          alt="Dormitory"
          style={{ width: "100%", height: 220, objectFit: "fill" }}
        />
      </Box>

      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {typeCap} Room
          </Typography>
          <Typography variant="body1">
            {item.avilableSeat} Places Available ({item.numberOfPerson} Total)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            sx={{ color: "#8F00FF", fontWeight: "bold" }}
          >
            Monthly Rent: {item.rent}₪
          </Typography>
        </Grid>
      </Grid>

      <Button
        type="button"
        sx={{
          color: "#8F00FF",
          paddingY: 1,
          height: 40,
          ":hover": {
            backgroundColor: "rgba(0,0,0,0.05)",
            cursor: "pointer",
          },
        }}
      >
        Edit
      </Button>
      <Button
        type="button"
        sx={{
          color: "#8F00FF",
          paddingY: 1,
          height: 40,
          ":hover": {
            backgroundColor: "rgba(0,0,0,0.05)",
            cursor: "pointer",
          },
        }}
      >
        Delete
      </Button>
    </Card>
  );
};

export default RoomCard;
