import React, { useState } from "react";
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

import { floors as mockFloors } from "../../data/mockData";

const FloorList = ({ floors }) => {
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
            <TableRow key={index}>
              <TableCell>{floor}</TableCell>
              <TableCell>120</TableCell>
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
  const [floors, setFloors] = useState(mockFloors);

  const handleAddFloorClick = () => {
    setIsAddingFloor(true);
  };

  const handleAddFloor = () => {
    if (newFloor.trim() !== "") {
      setFloors([...floors, newFloor]);
      setNewFloor("");
      setIsAddingFloor(false);
    }
  };

  const handleCancelAddFloor = () => {
    setNewFloor("");
    setIsAddingFloor(false);
  };

  return (
    <Box ml={1} mr={1}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Engineering Faculty
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
