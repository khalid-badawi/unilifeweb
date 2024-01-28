import React, { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import StatBox from "../../Components/StatBox";
import MoneyIcon from "@mui/icons-material/PriceCheck";
import OrdersIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import BarChart from "../../Components/BarChart";
import ReviewCard from "../../Components/Restaurant/ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserJoined,
  getTotalPosts,
  getTopResaurants,
  getPoularResaurants,
  getDormitoryPostCount,
  getReportedPostCount,
} from "../../APIS/adminAPI";
import AdminBarChart from "../../Components/Main Admin/AdminBarChart";
import Topbar from "../../Components/Restaurant/Topbar";
import { setPopularRestaurant } from "../../slice/admin";
import LastRatingsList from "../../Components/Restaurant/LastRatingsList";
import { setError } from "../../slice/user";
import { useNavigate } from "react-router";
import SuccessMessage from "../../Components/Success";
function AdminHome() {
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const handleSuccessMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessMessageOpen(false);
  };
  const navigate = useNavigate();
  const userId =
    useSelector((state) => state.user.id) || localStorage.getItem("id");
  const [users, setUsers] = useState({});
  const [posts, setPosts] = useState({});
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [dormitories, setDormitories] = useState({});
  const [reportedPostCount, setReportedPostCount] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData(userId) {
      const [res1, res2, res3, res4, res5, res6] = await Promise.all([
        getUserJoined(userId),
        getTotalPosts(userId),
        getTopResaurants(userId),
        getPoularResaurants(userId),
        getDormitoryPostCount(userId),
        getReportedPostCount(userId),
      ]);
      const status1 = res1.status;
      const status2 = res2.status;
      const status3 = res3.status;
      const status4 = res4.status;
      const status5 = res5.status;
      const status6 = res6.status;
      console.log("res1", res1);
      console.log("res2", res2);
      console.log("res3", res3);
      console.log("res4", res4);
      console.log("res5", res5);
      console.log("res6", res6);
      console.log(status1, status2);
      if (
        status1 === 200 &&
        status2 === 200 &&
        status3 === 200 &&
        status4 === 200 &&
        status5 === 200 &&
        status6 === 200
      ) {
        const { allUsers, totalUsers } = res1.data;
        console.log(res1.data);
        const { totalPosts, allPosts } = res2.data;
        console.log("H", totalPosts);
        const topRest = res4.data;
        const popRestaurants = res3.data;
        const { todayDorms, allDorms } = res5.data;
        const countReported = res6.data;
        dispatch(setPopularRestaurant(popRestaurants));
        setTopRestaurants(topRest);
        setUsers({ allUsers, totalUsers });
        setPosts({ totalPosts, allPosts });
        setDormitories({ todayDorms, allDorms });
        setReportedPostCount(countReported);
        console.log(users);
      } else {
        dispatch(setError("An error occured please try again"));
      }
      //navigate("/error");
    }
    fetchData(userId);
  }, []);
  return (
    <>
      <Box pl={2} pr={2}>
        <Topbar></Topbar>
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
              title={users.totalUsers}
              total={users.allUsers}
              subtitle="Users Joined Last 7 days"
              icon={<PeopleIcon sx={{ color: "#8F00FF", fontSize: 30 }} />}
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
              title={posts.totalPosts}
              total={posts.allPosts}
              subtitle="Today's Exchange Posts"
              icon={<PeopleIcon sx={{ color: "#8F00FF", fontSize: 30 }} />}
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
              title={reportedPostCount}
              subtitle="Reported Posts Today"
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
              title={dormitories.todayDorms}
              total={dormitories.allDorms}
              subtitle="Dormitory Posts Last 7 Days"
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
                Top Restaurants
              </Typography>
            </Box>

            <Box height="400px">
              <AdminBarChart />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 4"
            backgroundColor="#f1eef0"
            padding="30px"
          >
            <Typography variant="h5" color="#8F00FF" fontWeight="600" mb="30px">
              Restaurants Rating
            </Typography>
            <LastRatingsList ratingsData={topRestaurants} />
          </Box>
        </Box>
        <SuccessMessage
          open={successMessageOpen}
          onClose={handleSuccessMessageClose}
          message="Data added successfully!"
        />
      </Box>
    </>
  );
}

export default AdminHome;
