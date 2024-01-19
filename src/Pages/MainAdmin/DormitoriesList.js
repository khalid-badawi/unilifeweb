import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Box, Button } from "@mui/material";
//import { restaurants } from "../../data/mockData";
import { useDispatch, useSelector } from "react-redux";
import { deleteDormitory, getDormitory } from "../../APIS/adminAPI";
import { setDormitories } from "../../slice/admin";
import { setError } from "../../slice/user";
import { useNavigate } from "react-router";

const DormitoriesList = () => {
  const adminId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dormitories = useSelector((state) => state.admin.dormitories);
  useEffect(() => {
    async function fetchData() {
      const res = await getDormitory(adminId);
      let { status } = res;
      if (status === 200) {
        const { data } = res;
        dispatch(setDormitories(data));
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
  async function handleEdit(dormitoryId) {
    console.log(dormitoryId);
    navigate(`/admin/dormitoryedit/${dormitoryId}`);
  }
  async function handleDelete(dormitoryId) {
    const res = await deleteDormitory(adminId, dormitoryId);
    let { status } = res;
    console.log(res);
    if (status === 204) {
      const newDormitories = dormitories.filter(
        (dormitory) => dormitory.id !== dormitoryId
      );
      dispatch(setDormitories(newDormitories));
    } else {
      status = res.response.status;
      const {
        response: {
          data: { message },
        },
      } = res;
      if (
        status === 401 ||
        status === 403 ||
        status === 500 ||
        status === 404
      ) {
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
    { field: "SSN", headerName: "SSN", width: 150 },

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
      <Box sx={{ height: 800 }}>
        <DataGrid
          columns={columns}
          rows={dormitories}
          getRowId={(row) => row.id}
          getRowClassName={(params) => `status-${params.row.status}`}
          pageSize={10}
          rowSelection={false}
        />
      </Box>
    </Box>
  );
};

export default DormitoriesList;
