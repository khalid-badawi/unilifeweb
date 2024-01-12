import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Box, Button } from "@mui/material";
import { restaurants } from "../../data/mockData";

const RestaurantsList = () => {
  const columns = [
    {
      field: "avatar",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <Avatar alt="profile picture" src="/static/images/avatar/1.jpg" />
      ),
    },
    { field: "id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Restaurant Name", width: 200 },
    { field: "Email", headerName: "Email", width: 200 },

    { field: "phoneNum", headerName: "Phone Number", width: 150 },
    { field: "joinedIn", headerName: "Registered on", width: 150 },

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
          color="primary"
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <Box pl={2}>
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
