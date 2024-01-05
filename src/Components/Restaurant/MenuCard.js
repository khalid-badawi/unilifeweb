import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteFood } from "../../APIS/restaurantAPI";
import { setMenu } from "../../slice/restaurant";
import { setError } from "../../slice/user";
import { useNavigate } from "react-router";
///import { idID } from "@mui/material/locale";

export default function MenuCard({ title, desc, img, price, foodId }) {
  const menu = useSelector((state) => state.restaurant.menu);
  const naviagte = useNavigate();
  const id = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  async function handleDelete(e) {
    e.preventDefault();
    const res = await deleteFood(id, foodId);
    console.log(res);
    let status = res.status;
    if (status === 204) {
      console.log(status);
      const newMenu = menu.filter((item) => item.foodId !== foodId);
      dispatch(setMenu(newMenu));
    } else {
      status = res.response.status;
      console.log(status);
      if (status === 403 || status === 401 || status === 404) {
        const message = res.response.data.message;
        dispatch(setError(message));
      }
    }
  }
  return (
    <Card sx={{ maxWidth: 345 }} elevation={5}>
      <CardMedia
        component="img"
        alt="menu item"
        height="140"
        image={img} //"/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CardActions>
          <Button
            size="small"
            sx={{ color: "#8F00FF" }}
            onClick={() => naviagte(`/restaurant/menuedit/${foodId}`)}
          >
            Edit
          </Button>
          <Button
            size="small"
            sx={{ color: "#8F00FF" }}
            onClick={(e) => handleDelete(e)}
          >
            Delete
          </Button>
        </CardActions>
        <Typography variant="subtitle2" sx={{ mt: 1.5, mr: 2 }}>
          {price}₪
        </Typography>
      </Box>
    </Card>
  );
}
