import React, { useEffect } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
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
  getLastReviwer,
  getTodayRevenue,
} from "../../APIS/restaurantAPI";
import {
  setWeeklyPerc,
  setWeeklyRevenue,
  setTotalPeople,
  setDashboard,
  setTotalOrder,
  setLastReviwer,
  setTodayRevenue,
  setTodayPerc,
} from "../../slice/restaurant";
import SwitchButton from "../../Components/Restaurant/SwitchButton";
import Topbar from "../../Components/Restaurant/Topbar";
import LastRatingsList from "../../Components/Restaurant/LastRatingsList";
function Home() {
  const userId = useSelector((state) => state.user.id);
  const weeklyRevenue = useSelector((state) => state.restaurant.weeklyRevenue);
  const todayRevenue = useSelector((state) => state.restaurant.todayRevenue);
  const weeklyPerc = useSelector((state) => state.restaurant.weeklyPerc);
  const totalPeople = useSelector((state) => state.restaurant.totalPeople);
  const totalOrder = useSelector((state) => state.restaurant.totalOrder);
  const lastReviwer = useSelector((state) => state.restaurant.lastReviwer);
  const todayPerc = useSelector((state) => state.restaurant.todayPerc);
  console.log("lastReviwer", lastReviwer);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData(userId) {
      const [res1, res2, res3, res4, res5, res6] = await Promise.all([
        getWeeklyRevenue(userId),
        getTotalPeople(userId),
        getDashboardFood(userId),
        getTotalOrder(userId),
        getLastReviwer(userId),
        getTodayRevenue(userId),
      ]);
      const status1 = res1.status;
      const status2 = res2.status;
      const status3 = res3.status;
      const status4 = res4.status;
      const status5 = res5.status;
      const status6 = res6.status;
      console.log("getWeeklyRevenue", res1);
      console.log("getTotalPeople", res2);
      console.log("getWeeklyRevenue", res3);
      console.log("getTotalOrder", res4);
      console.log("getLastReviwer", res5);
      console.log("getTodayRevenue", res6);
      if (
        status1 === 200 &&
        status2 === 200 &&
        status3 === 200 &&
        status4 === 200 &&
        status5 === 200 &&
        status6 === 200
      ) {
        const { revenue, perc } = res1.data;
        const { count } = res2.data;
        const { data } = res3.data;
        const totalOrder = res4.data.count;
        const reviewer = res5.data;
        const revenue2 = res6.data.revenue;
        const perc2 = res6.data.perc;
        console.log("from fetch:", reviewer);
        console.log("GG", data);
        dispatch(setWeeklyRevenue(revenue));
        dispatch(setWeeklyPerc(perc));
        dispatch(setTotalPeople(count));
        dispatch(setDashboard(data));
        dispatch(setTotalOrder(totalOrder));
        dispatch(setLastReviwer(reviewer));
        dispatch(setTodayRevenue(revenue2));
        dispatch(setTodayPerc(perc2));
      }
    }
    fetchData(userId);
  }, []);
  console.log(lastReviwer);
  return (
    <>
      (
      <Box pl={2} pr={2}>
        <Topbar>
          <SwitchButton />
        </Topbar>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12,1fr)"
          gridAutoRows="140px"
          gap="20px 30px"
        >
          <Box
            grid
            gridColumn="span 3"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={`${weeklyRevenue}₪`}
              perc={weeklyPerc}
              subtitle="this week revenue"
              icon={<PeopleIcon sx={{ color: "#8F00FF", fontSize: 30 }} />}
              withPercentage={true}
            />
          </Box>
          <Box
            grid
            gridColumn="span 3"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={todayRevenue}
              subtitle="Today's Revenue"
              icon={<PeopleIcon sx={{ color: "#8F00FF", fontSize: 30 }} />}
              withPercentage={true}
            />
          </Box>
          <Box
            grid
            gridColumn="span 3"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={totalOrder}
              subtitle="Today's Total Orders"
              icon={<OrdersIcon sx={{ color: "#8F00FF", fontSize: 30 }} />}
            />
          </Box>
          <Box
            grid
            gridColumn="span 3"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={totalPeople}
              subtitle="Users Ordered last 7 days"
              icon={<PeopleIcon sx={{ color: "#8F00FF", fontSize: 30 }} />}
            />
          </Box>
          <Box
            gridColumn="span 8"
            gridRow="span 4"
            backgroundColor="#f1eef0"
            padding="30px"
          >
            <Box>
              <Typography variant="h5" color="#8F00FF" fontWeight="600">
                Most Ordered
              </Typography>
            </Box>

            <Box height="400px">
              <BarChart />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 4"
            backgroundColor="#f1eef0"
            padding="30px"
          >
            <Typography variant="h5" color="#8F00FF" fontWeight="600" mb="30px">
              Latest Ratings
            </Typography>
            <LastRatingsList ratingsData={lastReviwer} />
          </Box>
        </Box>
      </Box>
      )
    </>
  );
}

export default Home;
