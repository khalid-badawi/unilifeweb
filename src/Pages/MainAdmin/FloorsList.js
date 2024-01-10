import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";

//import { floors as mockFloors } from "../../data/mockData";
import { useParams } from "react-router";
import { addFloor, deleteFloor, getFloors } from "../../APIS/adminAPI";
import { useDispatch, useSelector } from "react-redux";
import { setFloors, setFacultytName } from "../../slice/admin";
import { setError } from "../../slice/user";

const FloorList = () => {
  const floors = useSelector((state) => state.admin.floors);
  const { facultyId } = useParams();
  console.log("facultyId:", facultyId);
  const id = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  async function handleDelete(floorId) {
    console.log("removed clicked");
    const res = await deleteFloor(id, floorId, facultyId);
    console.log(res);
    let { status } = res;
    if (status === 204) {
      const newFloors = floors.filter((floor) => floor.id !== floorId);
      dispatch(setFloors(newFloors));
    } else {
      status = res.response.status;
      if (status === 401 || status === 403 || status === 404) {
        const {
          response: {
            data: { message },
          },
        } = res;
        dispatch(setError(message));
      }
    }
  }
  useEffect(() => {
    async function fetchData() {
      const res = await getFloors(id, facultyId);
      console.log("res:", res);
      let { status } = res;
      if (status === 200) {
        const { data } = res;

        const { floors, facultyName } = data;
        console.log("data:", data);
        console.log("facultytName:", facultyName);
        dispatch(setFloors(floors));
        dispatch(setFacultytName(facultyName));
      } else {
        status = res.response.status;
        const {
          response: {
            data: { message },
          },
        } = res;
        //if (status === 404) dispatch(setFloors([]));
        if (status === 401 || status === 403 || status === 404) {
          dispatch(setError(message));
        }
      }
    }
    fetchData();
  }, []);
  return (
    <TableContainer component={Paper} sx={{}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#8F00FF" }}>Floor</TableCell>
            <TableCell sx={{ color: "#8F00FF" }}>QR Reference Class</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {floors.map((floor, index) => (
            <TableRow key={index} id={floor.id}>
              <TableCell>{floor.name}</TableCell>
              <TableCell>{floor.reference}</TableCell>
              <TableCell>
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
                  onClick={() => handleDelete(floor.id)}
                >
                  Remove
                </Button>
              </TableCell>
              <TableCell>
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
                >
                  Classes
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const FloorsList = () => {
  const [isAddingFloor, setIsAddingFloor] = useState(false);
  const [newFloor, setNewFloor] = useState("");
  const [reference, setReference] = useState("");
  const floors = useSelector((state) => state.admin.floors);
  const facultytName = useSelector((state) => state.admin.facultytName);
  console.log(facultytName);
  const { facultyId } = useParams();
  const id = useSelector((state) => state.user.id);
  // const [floors, setFloors] = useState(ff);
  const dispatch = useDispatch();
  const handleAddFloorClick = () => {
    setIsAddingFloor(true);
  };

  const handleAddFloor = async () => {
    if (newFloor.trim() !== "") {
      //  setFloors([...floors, newFloor]);

      const data = { name: newFloor, reference };
      const res = await addFloor(data, id, facultyId);
      console.log(res);
      let { status } = res;
      if (status === 201) {
        dispatch(setFloors([...floors, { name: newFloor, reference }]));
        setNewFloor("");
        setReference("");
        setIsAddingFloor(false);
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
  };

  const handleCancelAddFloor = () => {
    setNewFloor("");
    setIsAddingFloor(false);
  };

  return (
    <Box ml={1} mr={1}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {facultytName}
      </Typography>
      <FloorList floors={floors} />
      {isAddingFloor ? (
        <Box mt={2}>
          <TextField
            label="New Floor"
            variant="outlined"
            value={newFloor}
            onChange={(e) => setNewFloor(e.target.value)}
          />
          <TextField
            ml={2}
            label="reference"
            variant="outlined"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddFloor}
            sx={{
              backgroundColor: "#8F00FF",
              paddingX: 5,
              mr: 2,
              ml: 2,
              paddingY: 1,
              height: 40,

              ":hover": {
                backgroundColor: "#6A00CC", // Change this color for hover effect
                cursor: "pointer", // Optional: Change cursor on hover
              },
            }}
          >
            Add Floor
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancelAddFloor}
            sx={{
              backgroundColor: "#8F00FF",
              color: "white",
              paddingX: 5,
              paddingY: 1,
              height: 40,

              ":hover": {
                backgroundColor: "#6A00CC", // Change this color for hover effect
                cursor: "pointer", // Optional: Change cursor on hover
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddFloorClick}
          sx={{
            backgroundColor: "#8F00FF",
            color: "white",
            mt: 2,
            paddingX: 5,
            paddingY: 1,
            height: 40,

            ":hover": {
              backgroundColor: "#6A00CC", // Change this color for hover effect
              cursor: "pointer", // Optional: Change cursor on hover
            },
          }}
        >
          Add
        </Button>
      )}
    </Box>
  );
};

export default FloorsList;
