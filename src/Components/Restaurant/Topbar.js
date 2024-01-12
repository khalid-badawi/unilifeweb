import React from "react";
import { Box, Icon, IconButton, InputBase, Typography } from "@mui/material";
import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Topbar() {
  return (
    <Box display="flex" justifyContent="space-between" padding={2}>
      <Box display="flex" color="white" marginLeft="auto">
        <IconButton>
          <Typography
            variant="body"
            component="body"
            sx={{ color: "#8F00FF", backgroundColor: "transparent" }}
          >
            Log Out
          </Typography>
          <LogoutIcon sx={{ color: "#8F00FF", ml: 1 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
