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

import { classes as mockClasses } from "../../data/mockData";

const FloorList = ({ classes }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 750, overflowY: "auto" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#8F00FF" }}>Class</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classes.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item}</TableCell>
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
                  Set QR Reference
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ClassesList = () => {
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [newClass, setNewClass] = useState("");
  const [classes, setClasses] = useState(mockClasses);

  const handleAddFloorClick = () => {
    setIsAddingClass(true);
  };

  const handleAddFloor = () => {
    if (newClass.trim() !== "") {
      setClasses([...classes, newClass]);
      setNewClass("");
      setIsAddingClass(false);
    }
  };

  const handleCancelAddFloor = () => {
    setNewClass("");
    setIsAddingClass(false);
  };

  return (
    <Box ml={1} mr={1} height={500}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Engineering Faculty
      </Typography>
      <FloorList classes={classes} />
      {isAddingClass ? (
        <Box mt={2}>
          <TextField
            label="New Class"
            variant="outlined"
            value={newClass}
            onChange={(e) => setNewClass(e.target.value)}
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
            Add Class
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

export default ClassesList;
