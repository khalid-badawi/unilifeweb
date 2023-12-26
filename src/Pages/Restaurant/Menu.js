import { Box, Grid } from "@mui/material";
import React from "react";
import MenuCard from "../../Components/Restaurant/MenuCard";

export default function Menu() {
  return (
    <Box sx={{ pl: 2 }} display="grid">
      <Grid container spacing={1} rowSpacing={3}>
        <Grid item xs={3}>
          <MenuCard />
        </Grid>

        <Grid item xs={3}>
          <MenuCard />
        </Grid>

        <Grid item xs={3}>
          <MenuCard />
        </Grid>

        <Grid item xs={3}>
          <MenuCard />
        </Grid>

        <Grid item xs={3}>
          <MenuCard />
        </Grid>

        <Grid item xs={3}>
          <MenuCard />
        </Grid>
      </Grid>
    </Box>
  );
}
