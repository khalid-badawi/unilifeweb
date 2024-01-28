import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Box, Button } from "@mui/material";
//import { restaurants } from "../../data/mockData";
import { useDispatch, useSelector } from "react-redux";
import { deleteRestaurants, getRestaurants } from "../../APIS/adminAPI";
import { setRestaurants } from "../../slice/admin";
import { setError } from "../../slice/user";
import { useNavigate } from "react-router";
import Topbar from "../../Components/Restaurant/Topbar";

const RestaurantsList = () => {
  const adminId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurants = useSelector((state) => state.admin.restaurants);
  useEffect(() => {
    async function fetchData() {
      const res = await getRestaurants(adminId);
      let { status } = res;
      if (status === 200) {
        const { data } = res;
        dispatch(setRestaurants(data));
      } else {
        status = res.response.status;
        const {
          response: {
            data: { message },
          },
        } = res;
        if (status === 401 || status === 403 || status === 500) {
          dispatch(setError(message));
        }
      }
    }
    fetchData();
  }, []);
  async function handleEdit(restaurantId) {
    console.log(restaurantId);
    navigate(`/admin/restaurantedit/${restaurantId}`);
  }
  async function handleDelete(restaurantId) {
    const res = await deleteRestaurants(adminId, restaurantId);
    let { status } = res;
    console.log(res);
    if (status === 204) {
      const newRestaurants = restaurants.filter(
        (restaurant) => restaurant.id !== restaurantId
      );
      dispatch(setRestaurants(newRestaurants));
    } else {
      status = res.response.status;
      const {
        response: {
          data: { message },
        },
      } = res;
      if (status === 401 || status === 403 || status === 500) {
        dispatch(setError(message));
      }
    }
  }
  const columns = [
    {
      field: "avatar",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <Avatar alt="profile picture" src={params.row.image} />
      ),
    },
    { field: "id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Restaurant Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },

    { field: "phoneNum", headerName: "Phone Number", width: 150 },
    { field: "createdAt", headerName: "Registered on", width: 150 },

    {
      field: "action1",
      headerName: "",
      width: 100,

      renderCell: (params) => (
        <Button
          sx={{
            color: "#8F00FF",
            paddingY: 1,
            height: 40,
            ":hover": {
              backgroundColor: "rgba(0,0,0,0.05)",
              cursor: "pointer",
            },
          }}
          onClick={() => handleEdit(params.row.id)}
          color="primary"
        >
          Edit
        </Button>
      ),
    },
    {
      field: "action2",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <Button
          type="button"
          sx={{
            color: "#8F00FF",
            paddingY: 1,
            height: 40,
            ":hover": {
              backgroundColor: "rgba(0,0,0,0.05)",
              cursor: "pointer",
            },
          }}
          onClick={() => handleDelete(params.row.id)}
          color="primary"
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <Box pl={2}>
      <Topbar></Topbar>
      <Box sx={{ height: 800 }}>
        <DataGrid
          columns={columns}
          rows={restaurants}
          getRowId={(row) => row.id}
          getRowClassName={(params) => `status-${params.row.status}`}
          pageSize={10}
          rowSelection={false}
        />
      </Box>
    </Box>
  );
};

export default RestaurantsList;
