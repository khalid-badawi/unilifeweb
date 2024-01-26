import React from "react";
import { Box, Icon, IconButton, InputBase, Typography } from "@mui/material";
import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { setSatesUser, setRole } from "../../slice/user";
import { setAdminState } from "../../slice/admin";
import { setStateRestaurant } from "../../slice/restaurant";
import { setStateDormitory } from "../../slice/dormitory";

export default function Topbar({ children }) {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);
  function logout(e) {
    e.preventDefault();
    dispatch(setSatesUser(""));
    if (role === "admin") {
      dispatch(setAdminState(""));
    } else if (role === "restaurant") {
      dispatch(setStateRestaurant(""));
    } else if (role === "dormitory") {
      dispatch(setStateDormitory(""));
    }
    dispatch(setRole(""));
    localStorage.setItem("token", "");
  }
  return (
    <Box display="flex" justifyContent="space-between" padding={2}>
      {children}
      <Box display="flex" color="white" marginLeft="auto">
        <IconButton>
          <Typography
            variant="body"
            component="body"
            sx={{ color: "#8F00FF", backgroundColor: "transparent" }}
            onClick={(e) => logout(e)}
          >
            Log Out
          </Typography>
          <LogoutIcon sx={{ color: "#8F00FF", ml: 1 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
