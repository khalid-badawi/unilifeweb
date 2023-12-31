import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function MenuCard({ title, desc, img }) {
  return (
    <Card sx={{ maxWidth: 345 }} elevation={5}>
      <CardMedia
        component="img"
        alt="menu item"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Mashroom
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CardActions>
          <Button size="small" sx={{ color: "#8F00FF" }}>
            Edit
          </Button>
          <Button size="small" sx={{ color: "#8F00FF" }}>
            Delete
          </Button>
        </CardActions>
        <Typography variant="subtitle2" sx={{ mt: 1.5, mr: 2 }}>
          100₪
        </Typography>
      </Box>
    </Card>
  );
}
