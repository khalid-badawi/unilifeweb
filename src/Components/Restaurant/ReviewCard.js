import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import { CardMedia, Typography } from "@mui/material";
import Boss from "../../assets/bozz.png";

export default function ReviewCard({ lastReviwer }) {
  const { reviewer, date, content, rating, image } = lastReviwer;
  console.log("rating:", rating);
  return (
    <Card
      sx={{
        maxWidth: 400, // Adjust the maximum width as needed
        height: 550,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      elevation={5}
    >
      <CardMedia
        component="img"
        alt="menu item"
        image={image}
        sx={{
          width: "80%",
          height: "50%",
          borderRadius: 500,
          objectFit: "cover",
          mt: 2,
        }}
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h6">{reviewer}</Typography>
        <Typography variant="body2">{`Date: ${date}`}</Typography>

        <Rating
          value={rating}
          readOnly
          sx={{ color: "#8F00FF", mt: 1 }}
          precision={0.5}
        />
        <Typography variant="body1" sx={{ mt: 1 }}>
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}
