import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { orders } from "../../data/mockData";
import OrderDetails from "./OrderDetails";
export default function Orders() {
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
    { field: "orderedAt", headerName: "Ordered At", width: 200 },
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

  const handleUpdateClick = (orderId, currentStatus) => {
    const nextStatus = getNextStatus(currentStatus);
    console.log(
      `Button clicked for order ID: ${orderId}. Updating status to: ${nextStatus}`
    );
    // Perform any other necessary actions here, like updating the order status.
  };
  const handleDetailsClick = (orderId) => {
    console.log(`Button clicked for order ID: ${orderId}.`);
    handleOpenModal();
    // Perform any other necessary actions here, like updating the order status.
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
      </Box>
      <OrderDetails
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </Box>
  );
}
