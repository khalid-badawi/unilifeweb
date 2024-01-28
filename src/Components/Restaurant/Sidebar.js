import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Logo1 from "../../assets/Logo1.png";
import { useSelector } from "react-redux";

const Item = ({ title, to, icon, selected, setSelected }) => {
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

export default function SidebarNav({ menuItems }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const image = useSelector((state) => state.user.image);
  const role = useSelector((state) => state.user.role);
  const username = useSelector((state) => state.user.username);
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
                {username}
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
                  src={role === "admin" ? Logo1 : image}
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Box>
          )}

          <Box>
            {menuItems.map((section) => (
              <React.Fragment key={section.section}>
                <Box sx={{ mt: 2, ml: 2 }}>
                  <Typography
                    variant="subtitle1"
                    color="gray"
                    sx={{ fontSize: 12, fontWeight: "bold" }}
                  >
                    {section.section}
                  </Typography>
                </Box>
                {section.items.map((menuItem) => (
                  <Item
                    key={menuItem.title}
                    title={menuItem.title}
                    to={menuItem.to}
                    icon={menuItem.icon}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
              </React.Fragment>
            ))}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
}
