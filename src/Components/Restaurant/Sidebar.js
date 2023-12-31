import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/RestaurantMenu";
import OrdersIcon from "@mui/icons-material/TableRestaurant";
import ReviewsIcon from "@mui/icons-material/StarHalf";
import AddIcon from "@mui/icons-material/Add";
import Logo1 from "../../assets/Logo1.png";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  return (
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      <MenuItem
        active={selected === title}
        style={{ color: "#8F00FF" }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  );
};

export default function SidebarNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "blue !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "green !important",
        },
        "& .pro-menu-item.active": {
          color: "red !important",
        },
        display: "flex",
        flex: 1,
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          {isCollapsed && (
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={<MenuOutlinedIcon />}
            ></MenuItem>
          )}
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
              mt="5px"
            >
              <Typography variant="h4" color="#8F00FF" sx={{ mt: 1, mb: 1 }}>
                Admin
              </Typography>
              <IconButton
                onClick={() => {
                  setIsCollapsed(!isCollapsed);
                }}
              >
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
          {!isCollapsed && (
            <Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 2, mt: 3 }}
              >
                <img
                  alt="Admin"
                  width="120px"
                  height="100px"
                  src={Logo1}
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Box>
          )}

          <Box>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Menu"
              to="/menu"
              icon={<MenuIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add to menu"
              to="/menuadd"
              icon={<AddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders"
              to="/orders"
              icon={<OrdersIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Ratings"
              to="/reviews"
              icon={<ReviewsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
}
