import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Box, Button } from "@mui/material";

export const students = [
  {
    id: 1,
    username: "Khalid",
    email: "Khalid@gmail.com",
    major: "Computer Engineering",
    phoneNum: "0597401453",
    joinedIn: "14-5-2023",
    banned: false,
  },
];

const StudentsList = () => {
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
    { field: "username", headerName: "Username", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "major", headerName: "Major", width: 200 },
    { field: "phoneNum", headerName: "Phone Number", width: 150 },
    { field: "joinedIn", headerName: "Joined In", width: 150 },
    {
      field: "banned",
      headerName: "Banned?",
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            color: params.row.banned ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {params.row.banned ? "Yes" : "No"}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 200,

      renderCell: (params) => (
        <Button
          sx={{
            backgroundColor: "#8F00FF",
            color: "white",
            width: 130,
            borderColor: "#8F00FF",
            ":hover": {
              color: "#8F00FF",
              backgroundColor: "white",
              borderColor: "#8F00FF",
            },
          }}
          variant="outlined"
          color="primary"
        >
          {params.row.banned ? "Unban" : "Ban"}
        </Button>
      ),
    },
  ];

  return (
    <Box pl={2}>
      <Box sx={{ height: 500 }}>
        <DataGrid
          columns={columns}
          rows={students}
          getRowId={(row) => row.id}
          getRowClassName={(params) => `status-${params.row.status}`}
          pageSize={10}
          rowSelection={false}
        />
      </Box>
    </Box>
  );
};

export default StudentsList;
