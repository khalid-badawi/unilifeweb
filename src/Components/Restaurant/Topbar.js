import React from "react";
import { Box, Icon, IconButton, InputBase, Typography } from "@mui/material";
import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
export default function Topbar() {
  return (
    <Box display="flex" justifyContent="space-between" padding={2}>
      <Box display="flex" backgroundColor="#F0EFF1" borderRadius="5px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon sx={{}} />
        </IconButton>
      </Box>
      <Box display="flex">
        <IconButton>
          <Typography variant="body" component="body" sx={{ color: "#8F00FF" }}>
            Log Out
          </Typography>
          <LogoutIcon sx={{ color: "#8F00FF", ml: 1 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
