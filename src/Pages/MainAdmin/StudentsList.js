import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Box, Button } from "@mui/material";
import { getStudents } from "../../APIS/adminAPI";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slice/user";

const StudentsList = () => {
  const id = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  useEffect(() => {
    async function fetcData() {
      const res = await getStudents(id);
      console.log(res);
      let { status } = res;
      if (status === 200) {
        const { data } = res;
        setStudents(data);
      } else {
        status = res.response.status;
        const {
          response: {
            data: { message },
          },
        } = res;
        if (status === 401 || status === 403) {
          dispatch(setError(message));
        }
      }
    }
    fetcData();
  }, []);
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
    { field: "username", headerName: "Username", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "major", headerName: "Major", width: 200 },
    { field: "phoneNum", headerName: "Phone Number", width: 150 },
    { field: "createdAt", headerName: "Joined In", width: 150 },
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
          {params.row.banned ? "Unban" : "Ban"}
        </Button>
      ),
    },
  ];

  return (
    <Box pl={2}>
      <Box sx={{ height: 800 }}>
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
