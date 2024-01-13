import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
//import { orders } from "../../data/mockData";
import OrderDetails from "./OrderDetails";
import { setOrder } from "../../slice/restaurant";
import { setError } from "../../slice/user";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrders } from "../../APIS/restaurantAPI";
export default function Orders() {
  let orders = useSelector((state) => state.restaurant.orders);
  const id = useSelector((state) => state.user.id);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchOrder() {
      const res = await getOrders(id);
      console.log(res);
      let status = res.status;
      if (status === 200) {
        dispatch(setOrder(res.data.data));
      } else {
        status = res.response.status;
        console.log(status);
        if (status === 404 || status === 401 || status === 403) {
          const message = res.response.data.message;
          dispatch(setError(message));
        }
        console.log(res);
      }
    }
    fetchOrder();
  }, []);
  // console.log("orders:", orders[0].items);
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const statusList = [
    "pending",
    "received",
    "in progress",
    "ready",
    "delivered",
  ];

  const columns = [
    { field: "id", headerName: "Order ID", width: 200 },
    { field: "studentName", headerName: "Student Name", width: 200 },
    { field: "createdAt", headerName: "Ordered At", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: getStatusColor(params.row.status),
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          {params.row.status}
        </div>
      ),
    },
    { field: "phoneNum", headerName: "Phone Number", width: 200 },
    {
      field: "actions",
      headerName: "Update To",
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
          onClick={() => handleUpdateClick(params.row.id, params.row.status)}
        >
          {getNextStatus(params.row.status)}
        </Button>
      ),
    },
    {
      field: "cancel",
      headerName: "",
      width: 150,
      renderCell: (params) => (
        <Button
          sx={{
            color: "#8F00FF",
            width: 130,
            borderColor: "#8F00FF",
            ":hover": {
              color: "#8F00FF",
              backgroundColor: "white",
              borderColor: "#8F00FF",
            },
          }}
          variant="text"
          color="primary"
          onClick={() => handleDetailsClick(params.row.id)}
        >
          cancel
        </Button>
      ),
    },
    {
      field: "details",
      headerName: "",
      width: 150,
      renderCell: (params) => (
        <Button
          sx={{
            color: "#8F00FF",
            width: 130,
            borderColor: "#8F00FF",
            ":hover": {
              color: "#8F00FF",
              backgroundColor: "white",
              borderColor: "#8F00FF",
            },
          }}
          variant="text"
          color="primary"
          onClick={() => handleDetailsClick(params.row.id)}
        >
          Show Details
        </Button>
      ),
    },
  ];

  const getNextStatus = (currentStatus) => {
    const currentIndex = statusList.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusList.length;
    return statusList[nextIndex];
  };

  const handleUpdateClick = async (orderId, currentStatus) => {
    const nextStatus = getNextStatus(currentStatus);
    console.log(
      `Button clicked for order ID: ${orderId}. Updating status to: ${nextStatus}`
    );
    const res = await updateOrders(id, orderId);
    let status = res.status;
    if (status === 200) {
      const newOrder = orders.map((order) =>
        order.id === orderId ? { ...order, status: nextStatus } : order
      );
      dispatch(setOrder(newOrder));
    } else {
      status = res.response.status;
      console.log(status);
      if (status === 404 || status === 401 || status === 403) {
        const message = res.response.data.message;
        dispatch(setError(message));
      }
      console.log(res);
    }

    console.log(res);
  };
  const handleDetailsClick = (orderId) => {
    console.log(`Button clicked for order ID: ${orderId}.`);
    setOrderId(orderId);
    handleOpenModal();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "red"; // yellow
      case "received":
        return "orange"; // green
      case "in progress":
        return "#FFD700"; // blue
      case "ready":
        return "green"; // orange
      case "delivered":
        return "#8F00FF"; // dark green
      case "cancelled":
        return "red"; // dark green
      default:
        return "#ffffff"; // default color
    }
  };

  // ... rest of the component

  return (
    <Box pl={2}>
      <Box sx={{ height: 900 }}>
        (
        <DataGrid
          columns={columns}
          rows={orders}
          getRowId={(row) => row.id}
          getRowClassName={(params) => `status-${params.row.status}`}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 30,
              },
            },
          }}
          rowSelection={false}
        />
        )
      </Box>
      {orderId && (
        <OrderDetails
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          id={orderId}
          handleUpdateClick={handleUpdateClick}
        />
      )}
    </Box>
  );
}
