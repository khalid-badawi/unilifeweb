import React, { useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import StatBox from "../../Components/StatBox";
import MoneyIcon from "@mui/icons-material/PriceCheck";
import OrdersIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import BarChart from "../../Components/BarChart";
import ReviewCard from "../../Components/Restaurant/ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getWeeklyRevenue,
  getTotalPeople,
  getDashboardFood,
  getTotalOrder,
} from "../../APIS/restaurantAPI";
import {
  setWeeklyPerc,
  setWeeklyRevenue,
  setTotalPeople,
  setDashboard,
  setTotalOrder,
} from "../../slice/restaurant";
function Home() {
  const userId = useSelector((state) => state.user.id);
  const weeklyRevenue = useSelector((state) => state.restaurant.weeklyRevenue);
  const weeklyPerc = useSelector((state) => state.restaurant.weeklyPerc);
  const totalPeople = useSelector((state) => state.restaurant.totalPeople);
  const totalOrder = useSelector((state) => state.restaurant.totalOrder);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData(userId) {
      const [res1, res2, res3, res4] = await Promise.all([
        getWeeklyRevenue(userId),
        getTotalPeople(userId),
        getDashboardFood(userId),
        getTotalOrder(userId),
      ]);
      const status1 = res1.status;
      const status2 = res2.status;
      const status3 = res3.status;
      const status4 = res4.status;
      console.log(status1, status2);
      if (
        status1 === 200 &&
        status2 === 200 &&
        status3 === 200 &&
        status4 === 200
      ) {
        const { revenue, perc } = res1.data;
        const { count } = res2.data;
        const { data } = res3.data;
        const totalOrder = res4.data.count;
        console.log("from fetch:", data);
        dispatch(setWeeklyRevenue(revenue));
        dispatch(setWeeklyPerc(perc));
        dispatch(setTotalPeople(count));
        dispatch(setDashboard(data));
        dispatch(setTotalOrder(totalOrder));
      }
    }
    fetchData(userId);
  }, []);
  return (
    <Box m="20px">
      <StatBox
        title={`${weeklyRevenue}₪`}
        perc={weeklyPerc}
        subtitle="this week revenue"
        icon={<MoneyIcon sx={{ color: "#8F00FF", fontSize: 30 }} />}
      />
      <p>gg</p>
      <StatBox
        title={totalPeople}
        subtitle="Today's Total Orders"
        icon={<OrdersIcon sx={{ color: "#8F00FF", fontSize: 30 }} />}
      />
      <p>gg</p>
      <StatBox
        title={totalOrder}
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
