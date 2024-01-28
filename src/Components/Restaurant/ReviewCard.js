import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import { CardMedia, Typography } from "@mui/material";
import Boss from "../../assets/bozz.png";

export default function ReviewCard({
  reviewer,
  date,
  content,
  rating,
  image,
  phoneNum,
  orderId,
  id,
}) {
  console.log("rating:", image);
  return (
    <Card
      sx={{
        width: 400, // Adjust the maximum width as needed
        height: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      elevation={5}
    >
      <CardMedia
        component="img"
        alt="profile"
        image={image}
        sx={{
          width: "100%",
          height: "50%",
          borderRadius: 1,
          objectFit: "cover",
        }}
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h6">{reviewer}</Typography>
        <Typography variant="body2">{`Order Id:${orderId}`}</Typography>
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
