import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import StatBox from "../../Components/StatBox";
import MoneyIcon from "@mui/icons-material/PriceCheck";
import OrdersIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import BarChart from "../../Components/BarChart";
import ReviewCard from "../../Components/Restaurant/ReviewCard";
function Home() {
  return (
    <Box m="20px">
      <StatBox
        title="12,361₪"
        subtitle="Today's Revenue"
        icon={<MoneyIcon sx={{ color: "#8F00FF", fontSize: 30 }} />}
      />
      <p>gg</p>
      <StatBox
        title="100"
        subtitle="Today's Total Orders"
        icon={<OrdersIcon sx={{ color: "#8F00FF", fontSize: 30 }} />}
      />
      <p>gg</p>
      <StatBox
        title="100"
        subtitle="Users Ordered last 7 days"
        icon={<PeopleIcon sx={{ color: "#8F00FF", fontSize: 30 }} />}
      />

      <Box height={500} width={500}>
        <BarChart />
      </Box>
      <ReviewCard
        reviewer="khalid badawi"
        date="4-1-2023"
        content="very good delicious"
        rating={3}
      />
    </Box>
  );
}

export default Home;
