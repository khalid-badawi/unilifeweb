import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Logo1 from "../../assets/bozz.png";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function PostCard() {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleDeletePost = () => {
    handleMenuClose();
  };

  const handleBanUser = () => {
    handleMenuClose();
  };
  return (
    <Card sx={{ width: 600, p: "1px", mb: 3, mt: 1 }} elevation={3}>
      <CardHeader
        avatar={
          <Avatar alt="profile picture" src="/static/images/avatar/1.jpg" />
        }
        action={
          <div>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
              <MenuItem onClick={handleBanUser}>Ban User</MenuItem>
            </Menu>
          </div>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
        sx={{}}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image={Logo1}
        alt="Paella dish"
        width={600}
        sx={{ objectFit: "cover" }}
      />
    </Card>
  );
}
