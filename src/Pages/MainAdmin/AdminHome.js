import React, { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import StatBox from "../../Components/StatBox";
import MoneyIcon from "@mui/icons-material/PriceCheck";
import OrdersIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import BarChart from "../../Components/BarChart";
import ReviewCard from "../../Components/Restaurant/ReviewCard";
import { useSelector } from "react-redux";
import {
  getUserJoined,
  getTotalPosts,
  getTopResaurants,
  getPoularResaurants,
} from "../../APIS/adminAPI";
import AdminBarChart from "../../Components/Main Admin/AdminBarChart";
function AdminHome() {
  const userId =
    useSelector((state) => state.user.id) || localStorage.getItem("id");
  const [totalUsers, setTotalUsers] = useState("");
  const [totalPosts, setTotalPosts] = useState("");
  const [topRestaurants, setTopRestaurants] = useState("");
  const [popularRestaurants, setPopularRestaurants] = useState("");
  useEffect(() => {
    async function fetchData(userId) {
      const [res1, res2, res3, res4] = await Promise.all([
        getUserJoined(userId),
        getTotalPosts(userId),
        getTopResaurants(userId),
        getPoularResaurants(userId),
      ]);
      const status1 = res1.status;
      const status2 = res2.status;
      const status3 = res3.status;
      const status4 = res4.status;
      console.log(res1);
      console.log(res2);
      console.log(res3);
      console.log(res4);
      console.log(status1, status2);
      if (
        status1 === 200 &&
        status2 === 200 &&
        status3 === 200 &&
        status4 === 200
      ) {
        const { totalUsers } = res1.data;
        const { totalPosts } = res2.data;
        const { popularRestaurants } = res3.data;
        const { topRestaurants } = res4.data;
        setTotalUsers(totalUsers);
        setTotalPosts(totalPosts);
      }
    }
    fetchData(userId);
  }, []);
  return (
    <Box m="20px">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <StatBox
            title={`${totalUsers}₪`}
            // perc={weeklyPerc}
            subtitle="New user this week"
            icon={<MoneyIcon sx={{ color: "#8F00FF", fontSize: 30 }} />}
          />
        </Grid>
        <Grid item xs={3}>
          <StatBox
            title={totalPosts}
            subtitle="Total post today"
            icon={<PeopleIcon sx={{ color: "#8F00FF", fontSize: 30 }} />}
          />
        </Grid>
        <Grid item xs={3}>
          <StatBox
            title={topRestaurants}
            subtitle="Top Restaurants"
            icon={<OrdersIcon sx={{ color: "#8F00FF", fontSize: 30 }} />}
          />{" "}
        </Grid>
        <Grid item xs={3}>
          <StatBox
            title={popularRestaurants}
            subtitle="Popular Restaurants"
            icon={<PeopleIcon sx={{ color: "#8F00FF", fontSize: 30 }} />}
          />{" "}
        </Grid>
      </Grid>
      <AdminBarChart />
    </Box>
  );
}

export default AdminHome;
