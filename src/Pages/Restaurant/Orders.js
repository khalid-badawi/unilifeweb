import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
//import { orders } from "../../data/mockData";
import OrderDetails from "./OrderDetails";
import { setOrder } from "../../slice/restaurant";
import { setError } from "../../slice/user";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrders } from "../../APIS/restaurantAPI";
import io from "socket.io-client";
const socket = io.connect("http://192.168.1.8:3000");

export default function Orders() {
  useEffect(() => {
    // Connect to the server and listen for private messages
    const connectToSocket = () => {
      socket.connect();
      console.log("CONNEEEEEEEEEEEECTING");
    };

    const handleReconnect = (attemptNumber) => {
      console.log(`Reconnecting... Attempt ${attemptNumber}`);
    };

    const handleConnect = () => {
      console.log("Connected to Socket.IO");
    };

    const handleDisconnect = () => {
      console.log("Disconnected from Socket.IO");
      // Attempt to reconnect when disconnected
      connectToSocket();
    };

    // Set up event listeners for connection status
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    socket.io.opts.reconnection = true; // Enable reconnection
    socket.io.opts.reconnectionAttempts = Infinity; // Retry indefinitely
    socket.io.opts.reconnectionDelay = 1000; // Initial delay before reconnecting
    socket.io.opts.reconnectionDelayMax = 5000; // Maximum delay between reconnects
    socket.io.opts.randomizationFactor = 0.5; // Randomization factor for delay

    // Start the initial connection
    connectToSocket();

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
      //Remove event listeners
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  let orders = useSelector((state) => state.restaurant.orders);
  const id = useSelector((state) => state.user.id);
  const [orderId, setOrderId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNewOrder, setIsNewOrder] = useState(false);
  const dispatch = useDispatch();
  console.log(isNewOrder);
  useEffect(() => {
    // Connect to the server and listen for private messages
    socket.emit("restaurantLogin", id);

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.connect();
    console.log("xd");

    const handleNewOrder = () => {
      setIsNewOrder((prevIsNewOrder) => !prevIsNewOrder);
      console.log("GG");
    };

    socket.on("newOrder", handleNewOrder);

    // Cleanup on component unmount
    return () => {
      socket.off("newOrder", handleNewOrder);
      socket.disconnect();
    };
  }, []);

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
  }, [isNewOrder]);
  // console.log("orders:", orders[0].items);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const statusList = [
    "PENDING",
    "RECEIVED",
    "IN PROGRESS",
    "READY",
    "DELIVERED",
  ];

  const columns = [
    { field: "id", headerName: "Order ID", width: 200 },
    { field: "studentName", headerName: "Student Name", width: 200 },
    {
      field: "createdAt",
      headerName: "Ordered At",
      width: 200,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(date);
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: getStatusColor(params.row.status),
            width: "70%",
            height: "85%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "500",
            color: "#fff",
            margin: 2,
            borderRadius: 20,
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

      renderCell: (params) =>
        params.row.status !== "DELIVERED" && (
          <Button
            sx={{
              backgroundColor: "#8F00FF",
              color: "white",
              width: 130,
              borderColor: "#8F00FF",
              borderRadius: 25,
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
      renderCell: (params) =>
        params.row.status !== "DELIVERED" && (
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
    console.log(res);
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
      case "PENDING":
        return "#FF5959"; // yellow
      case "RECEIVED":
        return "orange"; // green
      case "IN PROGRESS":
        return "#BBB900"; // blue
      case "READY":
        return "green"; // orange
      case "DELIVERED":
        return "#8F00FF"; // dark green
      case "CANCELLED":
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
