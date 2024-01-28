import React from "react";
import { Avatar, Box, Divider, Grid, Rating, Typography } from "@mui/material";

const LastRatingsList = ({ ratingsData }) => {
  return (
    <>
      {ratingsData.map((rating, index) => (
        <Box key={rating.id} sx={{ mb: 2 }}>
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Avatar alt={rating.reviewer} src={rating.image} />

            <Typography
              variant="body1"
              sx={{ fontWeight: "600", ml: 2, mr: 2 }}
            >
              {rating.reviewer}
            </Typography>
            <Rating
              value={rating.rating}
              size="medium"
              readOnly
              sx={{ color: "#8F00FF" }}
              precision={0.5}
            />
          </Box>
          <Divider sx={{ backgroundColor: "#8F00FF", height: 2 }} />
        </Box>
      ))}
    </>
  );
};

export default LastRatingsList;
