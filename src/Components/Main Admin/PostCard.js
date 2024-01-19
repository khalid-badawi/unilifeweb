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
import { blockStudent, deletePost } from "../../APIS/adminAPI";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slice/user";
import { setPosts } from "../../slice/admin";

export default function PostCard({ data }) {
  const {
    description,
    id,
    createdAt,
    image,
    profileImage,
    username,
    studentId,
  } = data;
  const [menuAnchor, setMenuAnchor] = useState(null);
  const adminId = useSelector((state) => state.user.id);
  const posts = useSelector((state) => state.admin.posts);
  const dispatch = useDispatch();
  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleDeletePost = async () => {
    handleMenuClose();
    const res = await deletePost(adminId, studentId, id);
    let { status } = res;
    console.log(res);
    if (status === 204) {
      const newPosts = posts.filter((post) => post.id !== id);
      dispatch(setPosts(newPosts));
    } else {
      status = res.response.status;
      const {
        response: {
          data: { message },
        },
      } = res;
      if (status === 401 || status === 403 || status === 500) {
        dispatch(setError(message));
      }
    }
  };

  const handleBanUser = async () => {
    handleMenuClose();
    console.log(studentId);
    const res = await blockStudent(adminId, studentId);
    let { status } = res;
    if (status === 200) {
    } else {
      status = res.response.status;
      const {
        response: {
          data: { message },
        },
      } = res;
      if (status === 401 || status === 403 || status === 500) {
        dispatch(setError(message));
      }
    }
  };
  return (
    <Card sx={{ width: 600, p: "1px", mb: 3, mt: 1 }} elevation={3}>
      <CardHeader
        avatar={
          <Avatar
            alt="profile picture"
            src={profileImage ? profileImage : "/static/images/avatar/1.jpg"}
          />
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
        title={username}
        subheader={createdAt}
        sx={{}}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image={image}
        alt="Paella dish"
        width={600}
        sx={{ objectFit: "cover" }}
      />
    </Card>
  );
}
