import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import FloorsList from "./FloorsList";
import { dummyFaculties } from "../../data/mockData";

const FacultyList = () => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const navigate = useNavigate();

  const handleViewFloors = (faculty) => {
    setSelectedFaculty(faculty);
    navigate(`/admin/${faculty.facultyId}/floors`);
    console.log(faculty);
  };

  return (
    <Box sx={{ mr: 1, ml: 1 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#8F00FF" }}>Faculty Name</TableCell>
              <TableCell sx={{ color: "#8F00FF" }}>Faculty Number</TableCell>
              <TableCell sx={{ color: "#8F00FF" }}>Coordinates</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyFaculties.map((faculty, index) => (
              <TableRow key={index}>
                <TableCell>{faculty.facultyName}</TableCell>
                <TableCell>{faculty.facultyNumber}</TableCell>
                <TableCell>
                  {faculty.coordinates.map((coord, coordIndex) => (
                    <div key={coordIndex}>
                      Longitude: {coord.longitude}, Latitude: {coord.latitude}
                    </div>
                  ))}
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
                    Edit
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
                    Remove
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    onClick={() => handleViewFloors(faculty)}
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
                    View Floors
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedFaculty && <FloorsList faculty={selectedFaculty} />}
    </Box>
  );
};

export default FacultyList;
