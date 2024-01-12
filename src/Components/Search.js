import { Box, IconButton, InputBase, colors } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  return (
    <Box backgroundColor="#F0EFF1" borderRadius="5px" width="250px" sx={{}}>
      <InputBase sx={{ ml: 2, pt: "12px" }} placeholder="Search" />
      <IconButton
        type="button"
        sx={{ ":disabled": { color: "black" } }}
        disabled
      >
        <SearchIcon sx={{}} />
      </IconButton>
    </Box>
  );
}
