import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import PostCard from "../../Components/Main Admin/PostCard";
// import DateSelector from "../../Components/Main Admin/DateSelector";
import Search from "../../Components/Search";

export default function Posts() {
  var currentDate = new Date();
  const [date, setDate] = useState(currentDate);
  return (
    <Box height="90%" sx={{ overflowY: "scroll", pt: 1 }}>
      <Box sx={{ ml: 2, mb: 2, display: "flex", flexDirection: "row" }}>
        <Search />
        {/* <Box ml={1}>
          <DateSelector label="Posted On" value={date} setValue={setDate} />
        </Box> */}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pr: 3,
        }}
      >
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </Box>
    </Box>
  );
}
